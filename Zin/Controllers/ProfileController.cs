using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Zin.Services.Services;
using Zin.Services.Models;
using Microsoft.AspNetCore.Authorization;

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
    }
}
