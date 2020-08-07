using Zin.Services.Models;
using System.Threading.Tasks;

namespace Zin.Services.Services
{
    public interface IProfileService
    {
        Task<Result<UserDetails>> GetAsync(string userId);
        Task<Result> UpdateAsync(string userId, UserDetails userDetails);
    }
}
