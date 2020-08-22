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
    public class BonusCalculationRepository : IBonusCalculationRepository
    {
        private readonly AppDbContext appDbContext;

        public BonusCalculationRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task SaveNewBonusRate(BonusRate bonusRate)
        {
            var data = await appDbContext.BonusRate.Where(x => x.BonusType.Equals(bonusRate.BonusType)).ToListAsync();
            
            if (data.Count > 0)
                appDbContext.BonusRate.Remove(data.First());
            
            appDbContext.BonusRate.Add(bonusRate);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<BonusRate>> GetAllBonusRatesAsync()
        {
            return await appDbContext.BonusRate.ToListAsync();
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
