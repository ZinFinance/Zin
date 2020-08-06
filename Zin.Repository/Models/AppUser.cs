using Microsoft.AspNetCore.Identity;

namespace Zin.Repository.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EthAddress { get; set; }
        public string TfaCode { get; set; }
    }
}
