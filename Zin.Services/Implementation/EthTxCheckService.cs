using System.Threading.Tasks;
using Zin.Repository.Models;
using Zin.Services.Services;

namespace Zin.Services.Implementation
{
    class EthTxCheckService : IEthTxCheckService
    {
        public EthTxCheckService()
        {

        }

        public async Task<RegisteredTx> GetEthTxFromBlockChainUsingTxId(string txId)
        {
            //TODO: get the data from blockchain
            return new RegisteredTx() { };
        }
    }
}
