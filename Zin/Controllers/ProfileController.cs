using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Zin.Services.Services;
using Zin.Services.Models;
using Microsoft.AspNetCore.Authorization;
using Zin.Models.Account;

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

        [HttpGet]
        public async Task<ActionResult> ProfileAsync()
        {
            Result<UserDetails> result = await profileService.GetAsync(User.Id());
            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProfileAsync(UpdateProfile updateProfile)
        {
            Result result = await profileService.UpdateAsync(User.Id(), updateProfile.ToDto());
            if (result.Status)
                return Ok(result);
            return BadRequest(result);
        }
    }
}
