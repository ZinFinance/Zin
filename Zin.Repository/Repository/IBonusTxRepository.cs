using System.Collections.Generic;
using System.Threading.Tasks;
using Zin.Repository.Models;

namespace Zin.Repository.Repository
{
    public interface IBonusTxRepository
    {
        Task SaveBonusTxAsync(BonusTx bonusTx);
        Task<List<BonusTx>> GetBonusTxOfUserAsync(string userId);
    }
}
