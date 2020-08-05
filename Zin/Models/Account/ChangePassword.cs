using System.ComponentModel.DataAnnotations;

namespace Zin.Models.Account
{
    public class ChangePassword
    {
        [Required]
        public string CurrentPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
        [Required, Compare(nameof(NewPassword))]
        public string ConfirmNewPassword { get; set; }
    }
}
