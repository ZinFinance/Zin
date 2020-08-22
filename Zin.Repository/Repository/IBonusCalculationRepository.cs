using System.Collections.Generic;
using System.Threading.Tasks;
using Zin.Repository.Models;

namespace Zin.Repository.Repository
{
    public interface IBonusCalculationRepository
    {
        Task<List<BonusRate>> GetAllBonusRatesAsync();
        Task SaveNewBonusRate(BonusRate bonusRate);
        Task<BonusRate> GetActiveBonusRateWithType(BonusType bonusType);
    }
}
