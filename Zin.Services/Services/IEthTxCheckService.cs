using System.Threading.Tasks;
using Zin.Repository.Models;

namespace Zin.Services.Services
{
    public interface IEthTxCheckService
    {
        Task<RegisteredTx> GetEthTxFromBlockChainUsingTxId(string txId);
    }
}
