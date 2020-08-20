﻿using System.ComponentModel.DataAnnotations;

namespace Zin.Repository.Models
{
    public class RegisteredTx
    {
        [Key]
        public string TxId { get; set; }
        public string UserId { get; set; }
        public string ReferralCode { get; set; }
        public string AmountTransferredInEther { get; set; }
        public string AmountTransferredInToken { get; set; }
        public string EtherToUsdRateAtThatTime { get; set; }

        public string ReferralZinTokensGenerated { get; set; }
        public string BonusZinTokensGenerated { get; set; }
        public string PresaleZinTokensGenerated { get; set; }
    }
}
