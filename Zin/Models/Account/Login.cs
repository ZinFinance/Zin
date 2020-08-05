using System.ComponentModel.DataAnnotations;

namespace Zin.Models.Account
{
    public class Login
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
