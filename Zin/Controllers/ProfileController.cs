using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Zin.Services.Services;
using Zin.Services.Models;
using Microsoft.AspNetCore.Authorization;
using Zin.Models.Account;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Zin.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ProfileController : ControllerApi
    {
        private readonly IProfileService profileService;

        public ProfileController(IProfileService profileService)
        {
            this.profileService = profileService;
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<UserDetails>))]
        [HttpGet]
        public async Task<ActionResult> ProfileAsync()
        {
            Result<UserDetails> result = await profileService.GetAsync(User.Id());
            return Ok(result);
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(Result))]
        [HttpPut]
        public async Task<ActionResult> UpdateProfileAsync(UpdateProfile updateProfile)
        {
            Result result = await profileService.UpdateAsync(User.Id(), updateProfile.ToDto());
            if (result.Status)
                return Ok(result);
            return BadRequest(result);
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(Result))]
        [HttpPost("registertx")]
        public async Task<ActionResult> RegisterTxUsingReferalCodeAsync(RegisterEthTx registerEthTx)
        {
            Result result = await profileService.RegisterTxUsingReferalCodeAsync(registerEthTx.TxId, registerEthTx.ReferralCode, registerEthTx.EtherToUsdRateAtThatTime);
            if (result.Status)
                return Ok(result);
            return BadRequest(result);
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<List<GetPurchaseTx>>))]
        [HttpGet("getregisteredtxs")]
        public async Task<ActionResult> GetReferralTransactionAsync(bool onlyReferral)
        {
            var data = await profileService.GetRegisteredTxAsync(User.Id(), onlyReferral);

            if (data == null)
                return Ok(new Result<List<GetPurchaseTx>>(new List<GetPurchaseTx>(), true));

            List<GetPurchaseTx> list = new List<GetPurchaseTx>();
            foreach (var tx in data)
            {
                list.Add(new GetPurchaseTx
                {
                    TxId = tx.TxId,
                    ReferralCode = tx.ReferralCode,
                    AmountTransferredInEther = tx.AmountTransferredInEther,
                    AmountTransferredInToken = tx.AmountTransferredInToken,
                    EtherToUsdRateAtThatTime = tx.EtherToUsdRateAtThatTime,
                    UserId = tx.UserId,
                    BonusZinTokensGenerated = tx.BonusZinTokensGenerated,
                    CreateDateTimeOffset = tx.CreateDateTimeOffset,
                    PresaleZinTokensGenerated = tx.PresaleZinTokensGenerated,
                    ReferralZinTokensGenerated = tx.ReferralZinTokensGenerated
                });
            }

            return Ok(new Result<List<GetPurchaseTx>>(list, true));
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<List<GetBonusTxs>>))]
        [HttpGet("getbonustxs")]
        public async Task<ActionResult> GetBonusTransactionsAsync()
        {
            var data = await profileService.GetBonusTxAsync(User.Id());

            if (data == null)
                return Ok(new Result<List<GetBonusTxs>>(new List<GetBonusTxs>(), true));

            List<GetBonusTxs> list = new List<GetBonusTxs>();
            foreach (var tx in data)
            {
                list.Add(new GetBonusTxs
                {
                    TxId = tx.TxId,
                    ReferralCode = tx.ReferralCode,
                    AmountTransferredInEther = tx.AmountTransferredInEther,
                    AmountTransferredInToken = tx.AmountTransferredInToken,
                    EtherToUsdRateAtThatTime = tx.EtherToUsdRateAtThatTime,
                    UserId = tx.UserId,
                    BonusTokensGenerated = tx.BonusTokensGenerated,
                    BonusType = tx.BonusType,
                    CreateDateTimeOffset = tx.CreateDateTimeOffset,
                    InternalId = tx.InternalId
                });
            }

            return Ok(new Result<List<GetBonusTxs>>(list, true));
        }



        /// <summary>
        /// ADMIN ENDPOINTS
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>

        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<List<GetBonusTxs>>))]
        [HttpGet("admin/getbonustxs")]
        public async Task<ActionResult> GetBonusTransactionsForAdminAsync(string userId)
        {
            var data = await profileService.GetBonusTxAsync(userId);

            if (data == null)
                return Ok(new Result<List<GetBonusTxs>>(new List<GetBonusTxs>(), true));

            List<GetBonusTxs> list = new List<GetBonusTxs>();
            foreach (var tx in data)
            {
                list.Add(new GetBonusTxs
                {
                    TxId = tx.TxId,
                    ReferralCode = tx.ReferralCode,
                    AmountTransferredInEther = tx.AmountTransferredInEther,
                    AmountTransferredInToken = tx.AmountTransferredInToken,
                    EtherToUsdRateAtThatTime = tx.EtherToUsdRateAtThatTime,
                    UserId = tx.UserId,
                    BonusTokensGenerated = tx.BonusTokensGenerated,
                    BonusType = tx.BonusType,
                    CreateDateTimeOffset = tx.CreateDateTimeOffset,
                    InternalId = tx.InternalId
                });
            }

            return Ok(new Result<List<GetBonusTxs>>(list, true));
        }

        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<List<GetPurchaseTx>>))]
        [HttpGet("admin/getregisteredtxs")]
        public async Task<ActionResult> GetReferralTransactionForAdminAsync(string userId)
        {
            var data = await profileService.GetRegisteredTxAsync(userId, false);

            if (data == null)
                return Ok(new Result<List<GetPurchaseTx>>(new List<GetPurchaseTx>(), true));

            List<GetPurchaseTx> list = new List<GetPurchaseTx>();
            foreach (var tx in data)
            {
                list.Add(new GetPurchaseTx
                {
                    TxId = tx.TxId,
                    ReferralCode = tx.ReferralCode,
                    AmountTransferredInEther = tx.AmountTransferredInEther,
                    AmountTransferredInToken = tx.AmountTransferredInToken,
                    EtherToUsdRateAtThatTime = tx.EtherToUsdRateAtThatTime,
                    UserId = tx.UserId,
                    BonusZinTokensGenerated = tx.BonusZinTokensGenerated,
                    CreateDateTimeOffset = tx.CreateDateTimeOffset,
                    PresaleZinTokensGenerated = tx.PresaleZinTokensGenerated,
                    ReferralZinTokensGenerated = tx.ReferralZinTokensGenerated
                });
            }

            return Ok(new Result<List<GetPurchaseTx>>(list, true));
        }

        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<List<UserDetails>>))]
        [HttpGet("admin/allprofiles")]
        public async Task<ActionResult> AllProfileAsync()
        {
            Result<List<UserDetails>> result = await profileService.GetAllProfilesAsync();
            return Ok(result);
        }

        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(Result))]
        [HttpPost("admin/updatebonus")]
        public async Task<ActionResult> UpdateBonusAsync()
        {
            Result<List<UserDetails>> result = await profileService.GetAllProfilesAsync();
            return Ok(result);
        }

        [Authorize(Roles = "ADMIN")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Bonus>))]
        [HttpGet("admin/allbonus")]
        public async Task<ActionResult> AllBonusesAsync()
        {
            var result = await profileService.GetAllBonusRatesAsync();
            return Ok(result);
        }
    }
}
