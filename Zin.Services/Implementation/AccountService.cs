using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Zin.EmailManager.Services;
using Zin.Services.Models;
using Zin.Services.Services;
using System.Net;
using System.Threading.Tasks;
using Zin.Repository.Models;

namespace Zin.Services.Implementation
{
    class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IConfiguration configuration;
        private readonly IEmailService emailService;

        public AccountService(UserManager<AppUser> userManager,
            IConfiguration configuration,
            IEmailService emailService)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.emailService = emailService;
        }

        public async Task<Result> RegisterAsync(UserDetails userDetails, string password)
        {
            // register user
            AppUser appUser = userDetails.ToCore();
            IdentityResult result = await userManager.CreateAsync(appUser, password);
            if (!result.Succeeded)
            {
                return new Result(result);
            }

            // send email confirmation
            string emailConfirmationUrl = await CreateEmailConfirmationUrlAsync(appUser);
            await emailService.SendRegisterEmailAsync(appUser.Email, $"{appUser.FirstName} {appUser.LastName}", emailConfirmationUrl);

            return new Result(true, "ACCOUNT_CREATED");
        }

        public async Task<bool> ConfirmEmailAsync(string userId, string token)
        {
            // find account
            AppUser appUser = await userManager.FindByIdAsync(userId);
            if (appUser == null)
                return false;

            IdentityResult result = await userManager.ConfirmEmailAsync(appUser, token);
            if (!result.Succeeded)
            {
                return false;
            }

            // send email confirmation success
            await emailService.SendEmailAsync(appUser.Email, "Email confirmed", "You have successfully confirmed your account.");

            return true;
        }

        public async Task<Result> ReSendEmailConfirmationAsync(string email)
        {
            // find account
            AppUser appUser = await userManager.FindByEmailAsync(email);
            if (appUser == null)
                return new Result(false, "ACCOUNT_NOT_EXISTS");

            // check if already confirmed
            if (appUser.EmailConfirmed)
                return new Result(false, "EMAIL_ALREADY_CONFIRMED");

            // send re confirmation email
            string emailConfirmationUrl = await CreateEmailConfirmationUrlAsync(appUser);
            await emailService.SendEmailReConfirmationAsync(appUser.Email, emailConfirmationUrl);

            return new Result(true, "EMAIL_RESEND");
        }

        public async Task<Result> ChangePasswordAsync(string userId,string currentPassword,string newPassword)
        {
            AppUser appUser = await userManager.FindByIdAsync(userId);
            IdentityResult result = await userManager.ChangePasswordAsync(appUser, currentPassword, newPassword);
            if (!result.Succeeded)
            {
                return new Result(result);
            }

            // send email change password successfully
            await emailService.SendEmailAsync(appUser.Email, "Password Changed", "Your password successfully changed.");

            return new Result(true, "PASSWORD_CHANGED");
        }

        private async Task<string> CreateEmailConfirmationUrlAsync(AppUser appUser)
        {
            string emailToken = await userManager.GenerateEmailConfirmationTokenAsync(appUser);
            return $"{configuration["UserManager:EmailConfirmationBaseUrl"]}?userId={WebUtility.UrlEncode(appUser.Id)}&token={WebUtility.UrlEncode(emailToken)}";
        }
    }
}
