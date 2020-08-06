using System.ComponentModel.DataAnnotations;

namespace Zin.Models.Account
{
    public class LoginTfa
    {
        [Required]
        public string TempToken { get; set; }
        [Required, StringLength(6)]
        public string TfaCode { get; set; }
    }
}
