using Zin.Repository.Models;

namespace Zin.Services.Models
{
    public class UserDetails
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EthAddress { get; set; }

        public string ReferralCode { get; set; }
        public string ZinTokens { get; set; }
        public string ReferralZinTokens { get; set; }
        public string BonusZinTokens { get; set; }
        public string PresaleZinTokens { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsEmailVerified { get; set; }

        public AppUser ToCore()
        {
            return new AppUser
            {
                UserName = UserName,
                Email = Email,
                FirstName = FirstName,
                LastName = LastName,
            };
        }
    }

    public static class UserDetailsMapper
    {
        public static UserDetails ToDto(this AppUser appUser)
        {
            return new UserDetails
            {
                UserName = appUser.UserName,
                Email = appUser.Email,
                FirstName = appUser.FirstName,
                LastName = appUser.LastName,
                IsAdmin = appUser.IsAdmin,
                EthAddress = appUser.EthAddress,
                ReferralCode = appUser.ReferralCode,
                ZinTokens = appUser.ZinTokens,
                ReferralZinTokens = appUser.ReferralZinTokens,
                PresaleZinTokens = appUser.PresaleZinTokens,
                BonusZinTokens = appUser.BonusZinTokens,
                IsEmailVerified = appUser.EmailConfirmed,
                UserId = appUser.Id
            };
        }

        public static AppUser Update(this AppUser appUser, UserDetails userDetails)
        {
            appUser.FirstName = userDetails.FirstName;
            appUser.LastName = userDetails.LastName;
            appUser.UserName = userDetails.UserName;
            appUser.Email = userDetails.Email;
            return appUser;
        }
    }
}
