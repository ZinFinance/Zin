using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace Zin.Repository.Models
{
    public class RegisteredTx
    {
        [Key]
        public string TxId { get; set; }
        public string UserId { get; set; }
        public string ZinTokensTransferred { get; set; }
    }
}
