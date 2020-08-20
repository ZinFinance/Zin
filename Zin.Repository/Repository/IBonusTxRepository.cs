using System.Threading.Tasks;
using Zin.Repository.Models;

namespace Zin.Repository.Repository
{
    public interface IBonusTxRepository
    {
        Task SaveBonusTxAsync(BonusTx bonusTx);
    }
}
