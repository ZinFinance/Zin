using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Zin.EmailManager.Services;
using Zin.Services.Models;
using Zin.Services.Services;
using System.Net;
using System.Threading.Tasks;
using Zin.Repository.Models;
using Zin.Repository.Repository;

namespace Zin.Services.Implementation
{
    class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IConfiguration configuration;
        private readonly IEmailService emailService;
        private readonly IReferralCodeRepository referralCodeRepository;

        public AccountService(UserManager<AppUser> userManager,
            IConfiguration configuration,
            IEmailService emailService,
            IReferralCodeRepository referralCodeRepository)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.emailService = emailService;
            this.referralCodeRepository = referralCodeRepository;
        }

        public async Task<Result> RegisterAsync(UserDetails userDetails, string password)
        {
            // register user
            AppUser appUser = userDetails.ToCore();

            //save and update eth address only when it is already not registered with some user.
            if (!string.IsNullOrWhiteSpace(userDetails.EthAddress))
            {
                var alreadySavedData = await referralCodeRepository.GetUserByEthAddressAsync(userDetails.EthAddress);
                if (alreadySavedData == null)
                    appUser.EthAddress = userDetails.EthAddress;
            }

            appUser.ReferralCode = await referralCodeRepository.GetNewReferralCodeAsync();
            appUser.BonusZinTokens = "0";
            appUser.PresaleZinTokens = "0";
            appUser.ReferralZinTokens = "0";
            appUser.ZinTokens = "0";

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
            await SendEmailConfirmationAsync(appUser);

            return new Result(true, "EMAIL_RESEND");
        }

        public async Task<Result> ChangePasswordAsync(string userId, string currentPassword, string newPassword)
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

        public async Task<Result> PasswordResetAsync(string userName)
        {
            // find account
            AppUser appUser = await userManager.FindByNameAsync(userName);
            if (appUser == null)
                return new Result(false, "ACCOUNT_NOT_EXISTS");

            // send email
            string tempToken = await userManager.GeneratePasswordResetTokenAsync(appUser);
            var resetPasswordUrl = $"{configuration["UserManager:ResetPasswordBaseUrl"]}?userId={WebUtility.UrlEncode(appUser.Id)}&token={WebUtility.UrlEncode(tempToken)}";
            await emailService.SendResetPasswordEmailAsync(appUser.Email, resetPasswordUrl);

            // return
            return new Result(true, "RESET_PASSWORD_EMAIL_SEND");
        }

        public async Task<Result> PasswordResetConfirmAsync(string userId, string token, string newPassword)
        {
            // find account
            AppUser appUser = await userManager.FindByIdAsync(userId);
            if (appUser == null)
                return new Result(false, "INVALID_OR_EXPIRED_TOKEN");

            // reset password
            IdentityResult result = await userManager.ResetPasswordAsync(appUser, token, newPassword);
            if (!result.Succeeded)
            {
                return new Result(result);
            }

            // send email password reset success
            await emailService.SendEmailAsync(appUser.Email, "Password Reset Successfully", "You have successfully reset your password.");

            // return
            return new Result(true, "RESET_PASSWORD_SUCCESS");
        }

        public async Task SendEmailConfirmationAsync(AppUser appUser)
        {
            string emailConfirmationUrl = await CreateEmailConfirmationUrlAsync(appUser);
            await emailService.SendEmailReConfirmationAsync(appUser.Email, emailConfirmationUrl);
        }

        private async Task<string> CreateEmailConfirmationUrlAsync(AppUser appUser)
        {
            string emailToken = await userManager.GenerateEmailConfirmationTokenAsync(appUser);
            return $"{configuration["UserManager:EmailConfirmationBaseUrl"]}?userId={WebUtility.UrlEncode(appUser.Id)}&token={WebUtility.UrlEncode(emailToken)}";
        }
    }
}
