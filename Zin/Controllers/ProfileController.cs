using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Zin.Services.Services;
using Zin.Services.Models;
using Microsoft.AspNetCore.Authorization;
using Zin.Models.Account;
using Microsoft.AspNetCore.Http;

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
            Result result = await profileService.RegisterTxUsingReferalCodeAsync(User.Id(), registerEthTx.TxId, registerEthTx.ReferralCode);
            if (result.Status)
                return Ok(result);
            return BadRequest(result);
        }
    }
}
