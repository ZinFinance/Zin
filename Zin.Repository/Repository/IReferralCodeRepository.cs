using System.Collections.Generic;
using System.Threading.Tasks;
using Zin.Repository.Models;

namespace Zin.Repository.Repository
{
    public interface IReferralCodeRepository
    {
        Task<string> GetNewReferralCodeAsync();
        Task<List<AppUser>> GetAllUsersAsync();
        Task<AppUser> GetUserByReferralCodeAsync(string referralCode);
        Task<AppUser> GetUserByEthAddressAsync(string ethAddress);
    }
}