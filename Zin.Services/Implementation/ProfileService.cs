using Microsoft.AspNetCore.Identity;
using Zin.Services.Models;
using Zin.Services.Services;
using System.Threading.Tasks;
using Zin.Repository.Models;
using Zin.Repository.Repository;
using System.Numerics;
using System.Collections.Generic;

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
        private readonly IBonusCalculationRepository bonusCalculationRepository;

        public ProfileService(UserManager<AppUser> userManager,
            IAccountService accountService,
            IRegisteredTxRepository registeredTxRepository,
            IEthTxCheckService ethTxCheckService,
            IUserBalanceRepository userBalanceRepository,
            IReferralCodeRepository referralCodeRepository,
            IBonusCalculationRepository bonusCalculationRepository)
        {
            this.userManager = userManager;
            this.accountService = accountService;
            this.registeredTxRepository = registeredTxRepository;
            this.ethTxCheckService = ethTxCheckService;
            this.userBalanceRepository = userBalanceRepository;
            this.referralCodeRepository = referralCodeRepository;
            this.bonusCalculationRepository = bonusCalculationRepository;
        }

        public async Task<Result<UserDetails>> GetAsync(string userId)
        {
            // find account
            AppUser appUser = await userManager.FindByIdAsync(userId);
            return new Result<UserDetails>(appUser.ToDto());
        }

        public async Task<Result> RegisterTxUsingReferalCodeAsync(string userId, string txId, string referralCode, string AmountTransferredInEther, string AmountTransferredInToken, string EtherToUsdRateAtThatTime)
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
            //TODO: THIS WILL BE REMOVED WHEN BLOCKCHAIN IS INTEGRATED!!!
            txFromBlockchain.AmountTransferredInEther = AmountTransferredInEther;
            txFromBlockchain.AmountTransferredInToken = AmountTransferredInToken;
            txFromBlockchain.TxId = txId;

            if (txFromBlockchain == null)
                return new Result(false, "TRANSACTION_NOT_FOUND");

            //register transaction wrt user and include all the extra properties as well
            txFromBlockchain.UserId = userId;
            txFromBlockchain.EtherToUsdRateAtThatTime = EtherToUsdRateAtThatTime;
            await registeredTxRepository.SaveRegisteredTxAsync(txFromBlockchain);

            //update the user the amount of tokens transferred
            await userBalanceRepository.AddUserTokenBalance(userId, BigInteger.Parse(txFromBlockchain.AmountTransferredInToken));

            //calculate and add the referral bonusses.
            var presaleResponse = await CalculateAndAddPresaleBonuses(userId, BigInteger.Parse(txFromBlockchain.AmountTransferredInToken));
            var referralResponse = await CalculateAndAddReferralBonuses(userId, referralCode, BigInteger.Parse(txFromBlockchain.AmountTransferredInToken));

            return referralResponse;
        }

        public async Task<Result> UpdateAsync(string userId, UserDetails userDetails)
        {
            // find account
            AppUser appUser = await userManager.FindByIdAsync(userId);

            if (string.IsNullOrWhiteSpace(appUser.EthAddress))
                appUser.EthAddress = userDetails.EthAddress;

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

        public async Task<List<Models.RegisteredTx>> GetRegisteredTxAsync(string userId, bool onlyReferral)
        {
            var data = await registeredTxRepository.GetRegisteredTxOfUserAsync(userId, onlyReferral);
            if (data == null)
                return new List<Models.RegisteredTx>();

            List<Models.RegisteredTx> list = new List<Models.RegisteredTx>();
            foreach (var tx in data)
            {
                list.Add(new Models.RegisteredTx
                {
                    TxId = tx.TxId,
                    ReferralCode = tx.ReferralCode,
                    AmountTransferredInEther = tx.AmountTransferredInEther,
                    AmountTransferredInToken = tx.AmountTransferredInToken,
                    EtherToUsdRateAtThatTime = tx.EtherToUsdRateAtThatTime
                });
            }
            return list;
        }

        /// <summary>
        /// private methods.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="referralCode"></param>
        /// <param name="originalAmount"></param>
        /// <returns></returns>
        private async Task<Result> CalculateAndAddReferralBonuses(string userId, string referralCode, BigInteger originalAmount)
        {
            //now check if the referral code is present or not
            if (string.IsNullOrWhiteSpace(referralCode))
                return new Result(true, "TRANSACTION_REGISTERED_SUCCESSFULLY");

            //if present then go and find out if it is correct and is assigned to a user (Case Sensitive)
            //get the user details
            var referredUser = await referralCodeRepository.GetUserByReferralCodeAsync(referralCode);
            if (referredUser == null)
                return new Result(true, "TRANSACTION_REGISTERED_SUCCESSFULLY");

            //calculate related amount of tokens that should be assigned to that user and assign the user that amount of tokens and update the user in db.
            BigInteger calculatedInviterBonus = await CalculateBonus(BonusType.Inviter, originalAmount);
            await userBalanceRepository.AddUserTokenBalance(referredUser.Id, calculatedInviterBonus);

            //calculate related amount of tokens that should be assigned to that user and assign the user that amount of tokens and update the user in db.
            BigInteger calculatedInviteeBonus = await CalculateBonus(BonusType.Invitee, originalAmount);
            await userBalanceRepository.AddUserTokenBalance(userId, calculatedInviteeBonus);

            return new Result(true, "TRANSACTION_REGISTERED_SUCCESSFULLY_WITH_REFERRAL_CODE");
        }

        private async Task<Result> CalculateAndAddPresaleBonuses(string userId, BigInteger originalAmount)
        {
            //calculate related amount of tokens that should be assigned to that user and assign the user that amount of tokens and update the user in db.
            BigInteger calculatedInviterBonus = await CalculateBonus(BonusType.Presale, originalAmount);
            await userBalanceRepository.AddUserTokenBalance(userId, calculatedInviterBonus);

            return new Result(true, "TRANSACTION_REGISTERED_SUCCESSFULLY_WITH_PRESALE_BONUS");
        }

        private async Task<BigInteger> CalculateBonus(BonusType bonusType, BigInteger originalAmount)
        {
            var bonusRate = await bonusCalculationRepository.GetActiveBonusRateWithType(bonusType);
            if (bonusRate == null)
                return 0;
            BigInteger bonus = BigInteger.Multiply(originalAmount, bonusRate.BonusPercentage / 100);
            return bonus;
        }
    }
}
