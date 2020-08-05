using Microsoft.AspNetCore.Identity;
using System;

namespace Zin.Services.Models
{
    public class AccessTokenResponse
    {
        public AccessTokenResponse()
        {

        }

        public AccessTokenResponse(SignInResult signInResult)
        {
            IsLockedOut = signInResult.IsLockedOut;
            IsEmailUnVerified = signInResult.IsNotAllowed;
        }

        public bool IsLockedOut { get; set; }
        public bool IsEmailUnVerified { get; set; }
        public string AccessToken { get; set; }
        public DateTime? AccessTokenExpiry { get; set; }
    }
}
