using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Zin.Services.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Zin.Repository.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.DataProtection;
using Zin.EmailManager.Services;
using Zin.Services.Services;

namespace Zin.Services.Implementation
{
    class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IEmailService emailService;
        private readonly IConfiguration configuration;
        private readonly ITimeLimitedDataProtector dataProtector;

        public AuthService(UserManager<AppUser> userManager,
            IDataProtectionProvider dataProtectionProvider,
            IEmailService emailService,
            IConfiguration configuration)
        {
            this.userManager = userManager;
            this.emailService = emailService;
            this.configuration = configuration;
            dataProtector = dataProtectionProvider.CreateProtector("LoginTfaTokenProtector").ToTimeLimitedDataProtector();
        }

        public async Task<Result<TempTokenResponse>> CreateTfaSessionAsync(string userName)
        {
            // find account
            AppUser appUser = await userManager.FindByNameAsync(userName);

            // generate tfa code and send email
            await GenerateTfaCodeAndSendEmailAsync(appUser);

            // generate temp token and return
            return new Result<TempTokenResponse>(new TempTokenResponse
            {
                TempToken = dataProtector.Protect(appUser.Id, TimeSpan.FromMinutes(configuration.GetValue<int>("UserManager:LoginTfaTokenExpiryInMins")))
            });
        }

        public async Task<Result> ResendLoginTfaCodeAsync(string tempToken)
        {
            // unprotect temp token and get user
            AppUser appUser = await GetUserFromTempTokenAsync(tempToken);
            if (appUser == null)
                return new Result(false, "INVALID_OR_EXPIRED_TOKEN");

            // generate tfa code and send email
            await GenerateTfaCodeAndSendEmailAsync(appUser);

            // return
            return new Result(true, "TFA_CODE_RESEND");
        }

        public async Task<Result<AccessTokenResponse>> CreateSessionAsync(string tempToken, string tfaCode)
        {
            // unprotect temp token and get user
            AppUser appUser = await GetUserFromTempTokenAsync(tempToken);
            if (appUser == null)
                return new Result<AccessTokenResponse>(false, "INVALID_OR_EXPIRED_TOKEN");

            // validate tfa code
            if (appUser.TfaCode != tfaCode)
            {
                return new Result<AccessTokenResponse>(false, "INVALID_TFA_CODE");
            }

            // create session
            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            SigningCredentials credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            DateTime accessTokenExpiry = DateTime.UtcNow.AddMinutes(configuration.GetValue<int>("Jwt:ExpiryInMins"));

            JwtSecurityToken token = new JwtSecurityToken(
              issuer: configuration["Jwt:Issuer"],
              audience: configuration["Jwt:Issuer"],
              claims: new List<Claim>
              {
                  new Claim(JwtRegisteredClaimNames.Sub, appUser.Id)
              },
              notBefore: DateTime.UtcNow,
              expires: accessTokenExpiry,
              signingCredentials: credentials);

            string accessToken = new JwtSecurityTokenHandler().WriteToken(token);
            return new Result<AccessTokenResponse>(new AccessTokenResponse
            {
                AccessToken = accessToken,
                AccessTokenExpiry = accessTokenExpiry
            });
        }

        private async Task GenerateTfaCodeAndSendEmailAsync(AppUser appUser)
        {
            // generate tfa code and save
            appUser.TfaCode = new Random().Next(0, 999999).ToString("D6");
            await userManager.UpdateAsync(appUser);

            // send email
            await emailService.SendLoginTfaCodeAsync(appUser.Email, appUser.TfaCode);
        }

        private async Task<AppUser> GetUserFromTempTokenAsync(string tempToken)
        {
            string userId;
            try
            {
                userId = dataProtector.Unprotect(tempToken);
            }
            catch
            {
                return null;
            }

            return await userManager.FindByIdAsync(userId);
        }
    }
}
