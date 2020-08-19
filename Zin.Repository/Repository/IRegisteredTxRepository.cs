using System.Collections.Generic;
using System.Threading.Tasks;
using Zin.Repository.Models;

namespace Zin.Repository.Repository
{
    public interface IRegisteredTxRepository
    {
        Task<RegisteredTx> GetRegisteredTxUsingIdAsync(string txId);
        Task<List<RegisteredTx>> GetRegisteredTxOfUserAsync(string userId, bool referralOnly);
        Task SaveRegisteredTxAsync(RegisteredTx registeredTx);
    }
}
