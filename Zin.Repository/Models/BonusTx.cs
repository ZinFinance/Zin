using System.ComponentModel.DataAnnotations;

namespace Zin.Repository.Models
{
    public class BonusTx
    {
        [Key]
        public string InternalId { get; set; }
        public string TxId { get; set; }
        public string UserId { get; set; }
        public string ReferralCode { get; set; }
        public string AmountTransferredInEther { get; set; }
        public string AmountTransferredInToken { get; set; }
        public string EtherToUsdRateAtThatTime { get; set; }
        public string BonusTokensGenerated { get; set; }
        public BonusType BonusType { get; set; }
    }
}
