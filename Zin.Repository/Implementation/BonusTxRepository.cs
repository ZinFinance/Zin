using System.Threading.Tasks;
using Zin.Repository.DbContext;
using Zin.Repository.Models;
using Zin.Repository.Repository;

namespace Zin.Repository.Implementation
{
    public class BonusTxRepository : IBonusTxRepository
    {
        private readonly AppDbContext appDbContext;

        public BonusTxRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task SaveBonusTxAsync(BonusTx bonusTx)
        {
            appDbContext.BonusTx.Add(bonusTx);
            await appDbContext.SaveChangesAsync();
        }
    }
}
