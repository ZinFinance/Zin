using System.Threading.Tasks;
using Zin.Repository.Models;

namespace Zin.Services.Services
{
    public interface IEthTxCheckService
    {
        Task<(string, RegisteredTx)> GetEthTxFromBlockChainUsingTxId(string txId);
    }
}
