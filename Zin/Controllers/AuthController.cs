using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Zin.Models.Account;
using Zin.Repository.Models;
using Zin.Services.Models;
using Zin.Services.Services;
using System;
using System.Threading.Tasks;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace Zin.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerApi
    {
        private readonly SignInManager<AppUser> signInManager;
        private readonly IAuthService authService;

        public AuthController(SignInManager<AppUser> signInManager,
            IAuthService authService)
        {
            this.signInManager = signInManager;
            this.authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginAsync(Login login)
        {
            // validate credentials
            SignInResult signInResult = await signInManager.PasswordSignInAsync(login.UserName, login.Password, false, true);
            if (!signInResult.Succeeded)
            {
                return BadRequest(new Result<AccessTokenResponse>(new AccessTokenResponse(signInResult), false));
            }

            // create access token
            Result<AccessTokenResponse> result = await authService.CreateSessionAsync(login.UserName);
            return Ok(result);
        }

        [HttpPost("login/tfa")]
        public Task<ActionResult> LoginWithTfaAsync(string token)
        {
            throw new NotImplementedException();
        }
    }
}
