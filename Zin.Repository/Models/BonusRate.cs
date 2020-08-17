using System;
using System.ComponentModel.DataAnnotations;

namespace Zin.Repository.Models
{
    public class BonusRate
    {
        [Key]
        public string BonusRateId { get; set; }

        public BonusType BonusType { get; set; }

        public DateTimeOffset CreationDate { get; set; }

        public bool IsActive { get; set; }

        public int BonusPercentage { get; set; }
    }
}
