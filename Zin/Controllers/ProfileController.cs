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
            Result result = await profileService.RegisterTxUsingReferalCodeAsync(
                User.Id(),
                registerEthTx.TxId,
                registerEthTx.ReferralCode,
                registerEthTx.AmountTransferredInEther,
                registerEthTx.AmountTransferredInToken,
                registerEthTx.EtherToUsdRateAtThatTime
            );
            if (result.Status)
                return Ok(result);
            return BadRequest(result);
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<List<RegisterEthTx>>))]
        [HttpGet("getregisteredtxs")]
        public async Task<ActionResult> GetReferralTransactionAsync(bool onlyReferral)
        {
            var data = await profileService.GetRegisteredTxAsync(User.Id(), onlyReferral);

            if (data == null)
                return Ok(new Result<List<RegisterEthTx>>(new List<RegisterEthTx>(), true));

            List<RegisterEthTx> list = new List<RegisterEthTx>();
            foreach (var tx in data) {
                list.Add(new RegisterEthTx { 
                    TxId = tx.TxId,
                    ReferralCode = tx.ReferralCode,
                    AmountTransferredInEther = tx.AmountTransferredInEther,
                    AmountTransferredInToken = tx.AmountTransferredInToken,
                    EtherToUsdRateAtThatTime = tx.EtherToUsdRateAtThatTime
                });
            }

            return Ok(new Result<List<RegisterEthTx>>(list, true));
        }
    }
}
