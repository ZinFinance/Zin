using Zin.Services.Models;
using System.Threading.Tasks;

namespace Zin.Services.Services
{
    public interface IAuthService
    {
        Task<Result<AccessTokenResponse>> CreateSessionAsync(string tempToken, string tfaCode);
        Task<Result<TempTokenResponse>> CreateTfaSessionAsync(string userName);
        Task<Result> ResendLoginTfaCodeAsync(string tempToken);
    }
}
