using System.ComponentModel.DataAnnotations;
using Zin.Services.Models;

namespace Zin.Models.Account
{
    public class UpdateProfile
    {
        
        public string UserName { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EthAddress { get; set; }

        internal UserDetails ToDto()
        {
            return new UserDetails
            {
                Email = Email,
                FirstName = FirstName,
                LastName = LastName,
                UserName = UserName,
                EthAddress = EthAddress
            };
        }
    }
}
