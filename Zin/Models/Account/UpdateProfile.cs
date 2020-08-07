using System.ComponentModel.DataAnnotations;
using Zin.Services.Models;

namespace Zin.Models.Account
{
    public class UpdateProfile
    {
        [Required]
        public string UserName { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
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
