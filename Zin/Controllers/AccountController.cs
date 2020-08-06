using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Zin.Models.Account;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Zin.Services.Services;
using Zin.Services.Models;
using Microsoft.AspNetCore.Authorization;

namespace Zin.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerApi
    {
        private readonly IAccountService accountService;
        private readonly IConfiguration configuration;

        public AccountController(IAccountService accountService,
            IConfiguration configuration)
        {
            this.accountService = accountService;
            this.configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterAsync(Register register)
        {
            Result result = await accountService.RegisterAsync(register.ToDto(), register.Password);
            if (result.Status)
                return Created();
            return BadRequest(result);
        }

        [HttpGet("email/confirm")]
        public async Task<ActionResult> ConfirmEmailAsync(string userId, string token)
        {
            bool result = await accountService.ConfirmEmailAsync(userId, token);
            return result ?
                Redirect(configuration["UserManager:EmailConfirmSuccess"]) :
                Redirect(configuration["UserManager:EmailConfirmFailed"]);
        }

        [HttpPost("email/resend")]
        public async Task<ActionResult> ReSendEmailConfirmationAsync([Required, EmailAddress] string email)
        {
            Result result = await accountService.ReSendEmailConfirmationAsync(email);
            if (result.Status)
                return Ok(result);
            return BadRequest(result);
        }

        [HttpGet("reset")]
        public async Task<ActionResult> PasswordResetAsync(string userName)
        {
            Result result = await accountService.PasswordResetAsync(userName);
            if (result.Status)
                return Ok(result);
            return BadRequest(result);
        }

        [HttpPost("reset/confirm")]
        public async Task<ActionResult> PasswordResetConfirmAsync(PasswordReset passwordReset)
        {
            Result result = await accountService.PasswordResetConfirmAsync(passwordReset.UserId, passwordReset.TempToken, passwordReset.NewPassword);
            if (result.Status)
                return Ok(result);
            return BadRequest(result);
        }

        [Authorize]
        [HttpPost("changePassword")]
        public async Task<ActionResult> ChangePasswordAsync(ChangePassword changePassword)
        {
            Result result = await accountService.ChangePasswordAsync(User.Id(), changePassword.CurrentPassword, changePassword.NewPassword);
            if (result.Status)
                return Ok(result);
            return BadRequest(result);
        }
    }
}
