using System.Threading.Tasks;

namespace Zin.Repository.Repository
{
    public interface IReferralCodeRepository
    {
        Task<string> GetNewReferralCodeAsync();
        Task<string> GetReferralCodeByUserNameAsync(string userName);
    }
}