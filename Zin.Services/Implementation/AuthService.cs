using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Zin.Services.Models;
using Zin.Services.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Zin.Repository.Models;
using Microsoft.AspNetCore.Identity;

namespace Zin.Services.Implementation
{
    class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IConfiguration configuration;

        public AuthService(UserManager<AppUser> userManager,
            IConfiguration configuration)
        {
            this.userManager = userManager;
            this.configuration = configuration;
        }

        public async Task<Result<AccessTokenResponse>> CreateSessionAsync(string userName)
        {
            // find account
            AppUser appUser = await userManager.FindByNameAsync(userName);

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
    }
}
