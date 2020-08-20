using System.Numerics;
using System.Threading.Tasks;
using Zin.Repository.Models;

namespace Zin.Repository.Repository
{
    public interface IUserBalanceRepository
    {
        Task AddUserTokenBalance(string userId, BigInteger amount, BonusType bonusType);
    }
}
