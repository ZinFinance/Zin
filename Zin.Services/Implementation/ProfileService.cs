using Microsoft.AspNetCore.Identity;
using Zin.Services.Models;
using Zin.Services.Services;
using System.Threading.Tasks;
using Zin.Repository.Models;
using Zin.Repository.Repository;
using System.Numerics;

namespace Zin.Services.Implementation
{
    class ProfileService : IProfileService
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IAccountService accountService;
        private readonly IRegisteredTxRepository registeredTxRepository;
        private readonly IEthTxCheckService ethTxCheckService;
        private readonly IUserBalanceRepository userBalanceRepository;
        private readonly IReferralCodeRepository referralCodeRepository;

        public ProfileService(UserManager<AppUser> userManager,
            IAccountService accountService,
            IRegisteredTxRepository registeredTxRepository,
            IEthTxCheckService ethTxCheckService,
            IUserBalanceRepository userBalanceRepository,
            IReferralCodeRepository referralCodeRepository)
        {
            this.userManager = userManager;
            this.accountService = accountService;
            this.registeredTxRepository = registeredTxRepository;
            this.ethTxCheckService = ethTxCheckService;
            this.userBalanceRepository = userBalanceRepository;
            this.referralCodeRepository = referralCodeRepository;
        }

        public async Task<Result<UserDetails>> GetAsync(string userId)
        {
            // find account
            AppUser appUser = await userManager.FindByIdAsync(userId);
            return new Result<UserDetails>(appUser.ToDto());
        }

        public async Task<Result> RegisterTxUsingReferalCodeAsync(string userId, string txId, string referralCode)
        {
            //check if tx id is not null or empty
            if (string.IsNullOrWhiteSpace(txId))
                return new Result(false, "TRANSACTION_ID_NULL");

            //check if it is already not registered
            var regTx = await registeredTxRepository.GetRegisteredTxUsingIdAsync(txId);
            if (regTx != null)
                return new Result(false, "TRANSACTION_ALREADY_REGISTERED");

            //check using infura if valid transaction, success transaction
            //also return the values of the transaction
            var txFromBlockchain = await ethTxCheckService.GetEthTxFromBlockChainUsingTxId(txId);
            if (txFromBlockchain == null)
                return new Result(false, "TRANSACTION_NOT_FOUND");

            //register transaction wrt user and include all the extra properties as well
            txFromBlockchain.UserId = userId;
            await registeredTxRepository.SaveRegisteredTxAsync(txFromBlockchain);

            //update the user the amount of tokens transferred
            await userBalanceRepository.AddUserTokenBalance(userId, BigInteger.Parse(txFromBlockchain.ZinTokensTransferred));

            //now check if the referral code is present or not
            if (string.IsNullOrWhiteSpace(referralCode))
                return new Result(true, "TRANSACTION_REGISTERED_SUCCESSFULLY");

            var referredUser = await referralCodeRepository.GetUserByReferralCodeAsync(referralCode);
            if(referredUser == null)
                return new Result(true, "TRANSACTION_REGISTERED_SUCCESSFULLY");
            //if present then go and find out if it is correct and is assigned to a user (Case Sensitive)
            //get the user details
            //calculate related amount of tokens that should be assigned to that user
            //assign the user that amount of tokens and update the user in db

            return new Result(true, "TRANSACTION_REGISTERED_SUCCESSFULLY_WITH_REFERRAL_CODE");
        }

        public async Task<Result> UpdateAsync(string userId, UserDetails userDetails)
        {
            // find account
            AppUser appUser = await userManager.FindByIdAsync(userId);

            // update details
            appUser.EmailConfirmed = userDetails.Email == appUser.Email;
            IdentityResult identityResult = await userManager.UpdateAsync(appUser.Update(userDetails));
            if (!identityResult.Succeeded)
                return new Result(identityResult);

            // send confirmation email
            if (!appUser.EmailConfirmed)
                await accountService.SendEmailConfirmationAsync(appUser);

            return new Result(true, "PROFILE_UPDATED");
        }
    }
}
