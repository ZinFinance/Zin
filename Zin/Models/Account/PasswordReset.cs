using System.ComponentModel.DataAnnotations;

namespace Zin.Models.Account
{
    public class PasswordReset
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public string TempToken { get; set; }
        [Required]
        public string NewPassword { get; set; }
        [Required, Compare(nameof(NewPassword))]
        public string ConfirmNewPassword { get; set; }
    }
}
