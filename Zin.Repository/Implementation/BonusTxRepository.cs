using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<List<BonusTx>> GetBonusTxOfUserAsync(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
                return await appDbContext.BonusTx.OrderBy(x => x.CreateDateTimeOffset).ToListAsync();

            return await appDbContext.BonusTx.Where(x => x.UserId.Equals(userId)).ToListAsync();
        }

        public async Task SaveBonusTxAsync(BonusTx bonusTx)
        {
            bonusTx.CreateDateTimeOffset = DateTimeOffset.UtcNow;
            appDbContext.BonusTx.Add(bonusTx);
            await appDbContext.SaveChangesAsync();
        }
    }
}
