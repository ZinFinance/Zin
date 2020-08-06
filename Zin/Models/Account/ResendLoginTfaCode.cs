using System.ComponentModel.DataAnnotations;

namespace Zin.Models.Account
{
    public class ResendLoginTfaCode
    {
        [Required]
        public string TempToken { get; set; }
    }
}
