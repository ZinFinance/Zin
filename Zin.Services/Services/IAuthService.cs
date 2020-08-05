using Zin.Services.Models;
using System.Threading.Tasks;

namespace Zin.Services.Services
{
    public interface IAuthService
    {
        Task<Result<AccessTokenResponse>> CreateSessionAsync(string userName);
    }
}
