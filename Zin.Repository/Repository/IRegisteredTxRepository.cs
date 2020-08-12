using System.Threading.Tasks;
using Zin.Repository.Models;

namespace Zin.Repository.Repository
{
    public interface IRegisteredTxRepository
    {
        Task<RegisteredTx> GetRegisteredTxUsingIdAsync(string txId);
        Task SaveRegisteredTxAsync(RegisteredTx registeredTx);
    }
}
