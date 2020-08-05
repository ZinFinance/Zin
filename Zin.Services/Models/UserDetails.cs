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
    }
}
