using System.Numerics;

namespace Zin.Services.Models
{
    public class RegisteredTx
    {
        public string TxId { get; set; }
        public string UserId { get; set; }
        public string ReferralCode { get; set; }
        public string AmountTransferredInEther { get; set; }
        public string AmountTransferredInToken { get; set; }
        public string EtherToUsdRateAtThatTime { get; set; }
    }
}
