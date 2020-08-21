using Microsoft.AspNetCore.Identity;
using Zin.Services.Models;
using Zin.Services.Services;
using System.Threading.Tasks;
using Zin.Repository.Models;
using Zin.Repository.Repository;
using System.Numerics;
using System.Collections.Generic;
using System;

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
        private readonly IBonusTxRepository bonusTxRepository;
        private readonly IBonusCalculationRepository bonusCalculationRepository;

        public ProfileService(UserManager<AppUser> userManager,
            IAccountService accountService,
            IRegisteredTxRepository registeredTxRepository,
            IEthTxCheckService ethTxCheckService,
            IUserBalanceRepository userBalanceRepository,
            IReferralCodeRepository referralCodeRepository,
            IBonusTxRepository bonusTxRepository,
            IBonusCalculationRepository bonusCalculationRepository)
        {
            this.userManager = userManager;
            this.accountService = accountService;
            this.registeredTxRepository = registeredTxRepository;
            this.ethTxCheckService = ethTxCheckService;
            this.userBalanceRepository = userBalanceRepository;
            this.referralCodeRepository = referralCodeRepository;
            this.bonusTxRepository = bonusTxRepository;
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
            txFromBlockchain.ReferralCode = referralCode;

            //maintain all bonuses before saving it to db
            //calculate and add the referral bonusses.
            BigInteger presaleBonus = await SaveCalculateAndReturnPresaleBonus(txFromBlockchain);
            var (inviterBonus, inviteeBonus) = await SaveCalculateAndReturnReferralBonuses(txFromBlockchain);

            txFromBlockchain.ReferralZinTokensGenerated = inviterBonus.ToString();
            txFromBlockchain.BonusZinTokensGenerated = inviteeBonus.ToString();
            txFromBlockchain.PresaleZinTokensGenerated = presaleBonus.ToString();

            await registeredTxRepository.SaveRegisteredTxAsync(txFromBlockchain);
            //update the user the amount of tokens transferred
            await userBalanceRepository.AddUserTokenBalance(userId, BigInteger.Parse(txFromBlockchain.AmountTransferredInToken), BonusType.None);

            return new Result(true, "TRANSACTION_REGISTERED_SUCCESSFULLY");
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

        public async Task<List<RegisteredTx>> GetRegisteredTxAsync(string userId, bool onlyReferral)
        {
            var data = await registeredTxRepository.GetRegisteredTxOfUserAsync(userId, onlyReferral);
            if (data == null)
                return new List<RegisteredTx>();
            return data;
        }

        public async Task<List<BonusTx>> GetBonusTxAsync(string userId)
        {
            var data = await bonusTxRepository.GetBonusTxOfUserAsync(userId);
            if (data == null)
                return new List<BonusTx>();
            
            return data;
        }

        /// <summary>
        /// private methods.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="referralCode"></param>
        /// <param name="originalAmount"></param>
        /// <returns></returns>
        private async Task<(BigInteger, BigInteger)> SaveCalculateAndReturnReferralBonuses(Repository.Models.RegisteredTx registeredTx)
        {
            //now check if the referral code is present or not
            if (string.IsNullOrWhiteSpace(registeredTx.ReferralCode))
                return (0, 0);

            //if present then go and find out if it is correct and is assigned to a user (Case Sensitive)
            //get the user details
            var referredUser = await referralCodeRepository.GetUserByReferralCodeAsync(registeredTx.ReferralCode);
            if (referredUser == null || referredUser.UserName == registeredTx.UserId)
                return (0, 0);

            //calculate related amount of tokens that should be assigned to that user and assign the user that amount of tokens and update the user in db.
            BigInteger calculatedInviterBonus = await CalculateBonus(BonusType.Inviter, BigInteger.Parse(registeredTx.AmountTransferredInToken));
            if (calculatedInviterBonus > 0)
            {
                await userBalanceRepository.AddUserTokenBalance(referredUser.Id, calculatedInviterBonus, BonusType.Inviter);
                await bonusTxRepository.SaveBonusTxAsync(new BonusTx
                {
                    InternalId = (new Guid()).ToString(),
                    TxId = registeredTx.TxId,
                    UserId = referredUser.Id,
                    BonusType = BonusType.Inviter,
                    ReferralCode = registeredTx.ReferralCode,
                    EtherToUsdRateAtThatTime = registeredTx.EtherToUsdRateAtThatTime,
                    AmountTransferredInEther = registeredTx.AmountTransferredInEther,
                    AmountTransferredInToken = registeredTx.AmountTransferredInToken,
                    BonusTokensGenerated = calculatedInviterBonus.ToString()
                });
            }

            //calculate related amount of tokens that should be assigned to that user and assign the user that amount of tokens and update the user in db.
            BigInteger calculatedInviteeBonus = await CalculateBonus(BonusType.Invitee, BigInteger.Parse(registeredTx.AmountTransferredInToken));
            if (calculatedInviteeBonus > 0)
            {
                await userBalanceRepository.AddUserTokenBalance(registeredTx.UserId, calculatedInviteeBonus, BonusType.Invitee);
                await bonusTxRepository.SaveBonusTxAsync(new BonusTx
                {
                    InternalId = (new Guid()).ToString(),
                    TxId = registeredTx.TxId,
                    UserId = registeredTx.UserId,
                    BonusType = BonusType.Inviter,
                    ReferralCode = registeredTx.ReferralCode,
                    EtherToUsdRateAtThatTime = registeredTx.EtherToUsdRateAtThatTime,
                    AmountTransferredInEther = registeredTx.AmountTransferredInEther,
                    AmountTransferredInToken = registeredTx.AmountTransferredInToken,
                    BonusTokensGenerated = calculatedInviterBonus.ToString()
                });
            }

            return (calculatedInviterBonus, calculatedInviteeBonus);
        }

        private async Task<BigInteger> SaveCalculateAndReturnPresaleBonus(Repository.Models.RegisteredTx registeredTx)
        {
            //calculate related amount of tokens that should be assigned to that user
            //and assign the user that amount of tokens and update the user in db.
            BigInteger calculatedPresaleBonus = await CalculateBonus(BonusType.Presale, BigInteger.Parse(registeredTx.AmountTransferredInToken));
            if (calculatedPresaleBonus > 0)
            {
                await userBalanceRepository.AddUserTokenBalance(registeredTx.UserId, calculatedPresaleBonus, BonusType.Presale);
                await bonusTxRepository.SaveBonusTxAsync(new BonusTx
                {
                    InternalId = (new Guid()).ToString(),
                    TxId = registeredTx.TxId,
                    UserId = registeredTx.UserId,
                    BonusType = BonusType.Presale,
                    ReferralCode = registeredTx.ReferralCode,
                    EtherToUsdRateAtThatTime = registeredTx.EtherToUsdRateAtThatTime,
                    AmountTransferredInEther = registeredTx.AmountTransferredInEther,
                    AmountTransferredInToken = registeredTx.AmountTransferredInToken,
                    BonusTokensGenerated = calculatedPresaleBonus.ToString()
                });
            }
            return calculatedPresaleBonus;
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
