using Zin.Repository.Models;

namespace Zin.Services.Models
{
    public class UserDetails
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EthAddress { get; set; }

        public AppUser ToCore()
        {
            return new AppUser
            {
                UserName = UserName,
                Email = Email,
                FirstName = FirstName,
                LastName = LastName,
                EthAddress = EthAddress
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
                EthAddress = appUser.EthAddress
            };
        }

        public static AppUser Update(this AppUser appUser, UserDetails userDetails)
        {
            appUser.FirstName = userDetails.FirstName;
            appUser.LastName = userDetails.LastName;
            appUser.EthAddress = userDetails.EthAddress;
            appUser.UserName = userDetails.UserName;
            appUser.Email = userDetails.Email;
            return appUser;
        }
    }
}
