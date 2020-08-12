using System.Threading.Tasks;
using Zin.Repository.DbContext;
using Zin.Repository.Models;
using Zin.Repository.Repository;

namespace Zin.Repository.Implementation
{
    public class RegisteredTxRepository : IRegisteredTxRepository
    {
        private readonly AppDbContext appDbContext;

        public RegisteredTxRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task<RegisteredTx> GetRegisteredTxUsingIdAsync(string txId)
        {
            var data = await appDbContext.RegisteredTx.FindAsync(txId);
            return data;
        }

        public async Task SaveRegisteredTxAsync(RegisteredTx registeredTx)
        {
            appDbContext.RegisteredTx.Add(registeredTx);
            await appDbContext.SaveChangesAsync();
        }
    }
}
