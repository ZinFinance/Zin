using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Zin.Repository.DbContext;
using Zin.Repository.Models;
using Zin.Repository.Repository;

namespace Zin.Repository.Implementation
{
    public class BonusCalculationRepository : IBonusCalculationRepository
    {
        private readonly AppDbContext appDbContext;

        public BonusCalculationRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task SaveNewBonusRate(BonusRate bonusRate)
        {
            var existing = await GetActiveBonusRateWithType(bonusRate.BonusType);
            if (existing != null)
            {
                existing.IsActive = false;
                appDbContext.BonusRate.Update(existing);
            }

            bonusRate.IsActive = true;
            bonusRate.CreationDate = DateTimeOffset.UtcNow;
            appDbContext.BonusRate.Add(bonusRate);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<BonusRate> GetActiveBonusRateWithType(BonusType bonusType)
        {
            var data = await appDbContext.BonusRate.Where(x => x.BonusType.Equals(bonusType) && x.IsActive).ToListAsync();
            if (data.Count <= 0)
                return null;
            return data.First();
        }
    }
}
