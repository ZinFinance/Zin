using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Zin.Models.Account;
using Zin.Repository.Models;
using Zin.Services.Models;
using Zin.Services.Services;
using System;
using System.Threading.Tasks;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;
using Microsoft.AspNetCore.Http;

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

        
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(Result<AccessTokenResponse>))]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<AccessTokenResponse>))]
        [HttpPost("login")]
        public async Task<ActionResult> LoginAsync(Login login)
        {
            // validate credentials
            SignInResult signInResult = await signInManager.PasswordSignInAsync(login.UserName, login.Password, false, true);
            if (!signInResult.Succeeded)
            {
                return BadRequest(new Result<TempTokenResponse>(new TempTokenResponse(signInResult), false));
            }

            //// create access token
            //Result<TempTokenResponse> result = await authService.CreateTfaSessionAsync(login.UserName);
            //return Ok(result);

            Result<AccessTokenResponse> result = await authService.CreateSessionAsync(login.UserName);
            if (result.Status)
                return Ok(result);
            return BadRequest(result);
        }

        //[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(Result))]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        //[HttpPost("login/tfa")]
        //public async Task<ActionResult> LoginWithTfaAsync(LoginTfa loginTfa)
        //{
        //    Result<AccessTokenResponse> result = await authService.CreateSessionAsync(loginTfa.TempToken, loginTfa.TfaCode);
        //    if (result.Status)
        //        return Ok(result);
        //    return BadRequest(result);
        //}

        //[ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(Result))]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result))]
        //[HttpPost("login/tfa/resend")]
        //public async Task<ActionResult> ResendLoginTfaCodeAsync(ResendLoginTfaCode resendLoginTfaCode)
        //{
        //    Result result = await authService.ResendLoginTfaCodeAsync(resendLoginTfaCode.TempToken);
        //    if (result.Status)
        //        return Ok(result);
        //    return BadRequest(result);
        //}
    }
}
