using System.Threading.Tasks;
using Zin.Repository.Models;

namespace Zin.Repository.Repository
{
    public interface IReferralCodeRepository
    {
        Task<string> GetNewReferralCodeAsync();
        Task<string> GetReferralCodeByUserNameAsync(string userName);
        Task<AppUser> GetUserByReferralCodeAsync(string referralCode);
    }
}