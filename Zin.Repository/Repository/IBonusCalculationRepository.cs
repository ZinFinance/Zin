using System.Threading.Tasks;
using Zin.Repository.Models;

namespace Zin.Repository.Repository
{
    public interface IBonusCalculationRepository
    {
        Task SaveNewBonusRate(BonusRate bonusRate);
        Task<BonusRate> GetActiveBonusRateWithType(BonusType bonusType);
    }
}
