using Zin.Services.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using Zin.Repository.Models;

namespace Zin.Services.Services
{
    public interface IProfileService
    {
        Task<Result<UserDetails>> GetAsync(string userId);
        Task<Result<List<UserDetails>>> GetAllProfilesAsync();
        Task<Result> UpdateAsync(string userId, UserDetails userDetails);
        Task<Result> RegisterTxUsingReferalCodeAsync(string txId, string referralCode, string EtherToUsdRateAtThatTime);
        Task<List<RegisteredTx>> GetRegisteredTxAsync(string userId, bool onlyReferral);
        Task<List<BonusTx>> GetBonusTxAsync(string userId);
        Task<Result> UpdateBonusAsync(BonusType bonusType, bool isActive, int bonusPercentage);
        Task<List<BonusRate>> GetAllBonusRatesAsync();

    }
}
