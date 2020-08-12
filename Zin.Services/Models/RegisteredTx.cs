using System.Numerics;

namespace Zin.Services.Models
{
    public class RegisteredTx
    {
        public string TxId { get; set; }
        public string UserId { get; set; }
        public BigInteger ZinTokensTransferred { get; set; }
    }
}
