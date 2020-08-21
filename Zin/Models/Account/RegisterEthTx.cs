using System.ComponentModel.DataAnnotations;

namespace Zin.Models.Account
{
    public class RegisterEthTx
    {
        [Required]
        public string TxId { get; set; }
        
        public string ReferralCode { get; set; }

        [Required]
        public string EtherToUsdRateAtThatTime { get; set; }
    }
}
