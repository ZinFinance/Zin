using System.Numerics;
using System.Threading.Tasks;

namespace Zin.Repository.Repository
{
    public interface IUserBalanceRepository
    {
        Task AddUserTokenBalance(string userId, BigInteger amount);
    }
}
