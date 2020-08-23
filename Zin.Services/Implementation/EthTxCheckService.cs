using Microsoft.Extensions.Configuration;
using Nethereum.Web3;
using System.Numerics;
using System.Threading.Tasks;
using Zin.Repository.Models;
using Zin.Services.Services;

namespace Zin.Services.Implementation
{
    class EthTxCheckService : IEthTxCheckService
    {
        private readonly Web3 _web3;
        private readonly IConfiguration configuration;

        public EthTxCheckService(IConfiguration configuration)
        {
            this.configuration = configuration;
            _web3 = new Web3(configuration["ConnectionStrings:RpcAddress"]);
        }

        public async Task<(string, RegisteredTx)> GetEthTxFromBlockChainUsingTxId(string txId)
        {
            string crowdsaleTokenAddress = configuration["Settings:CrowdsaleTokenAddress"];

            var txData = await _web3.Eth.Transactions.GetTransactionByHash.SendRequestAsync(txId);
            if (txData == null || !txData.To.ToLower().Equals(crowdsaleTokenAddress.ToLower()))
                return (null, null);

            BigInteger rate = BigInteger.Parse(configuration["Settings:TokenRate"]);

            return (txData.From, new RegisteredTx()
            {
                TxId = txData.TransactionHash,
                AmountTransferredInEther = txData.Value.Value.ToString(),
                AmountTransferredInToken = BigInteger.Multiply(txData.Value.Value, rate).ToString()
            });
        }

    }
}
