using System.ComponentModel.DataAnnotations;
using Zin.Repository.Models;

namespace Zin.Models.Account
{
    public class Bonus
    {
        [Required]
        public BonusType BonusType { get; set; }
        [Required]
        public bool IsActive { get; set; }
        [Required]
        public int BonusPercentage { get; set; }
    }
}
