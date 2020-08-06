using Microsoft.AspNetCore.Identity;

namespace Zin.Services.Models
{
    public class TempTokenResponse
    {
        public TempTokenResponse()
        {

        }

        public TempTokenResponse(SignInResult signInResult)
        {
            IsLockedOut = signInResult.IsLockedOut;
            IsEmailUnVerified = signInResult.IsNotAllowed;
        }

        public bool IsLockedOut { get; set; }
        public bool IsEmailUnVerified { get; set; }
        public string TempToken { get; set; }
    }
}
