using Zin.Services.Models;
using System.Threading.Tasks;
using Zin.Repository.Models;

namespace Zin.Services.Services
{
    public interface IAccountService
    {
        Task<bool> ConfirmEmailAsync(string userId, string token);
        Task<Result> RegisterAsync(UserDetails userDetails, string password);
        Task<Result> ReSendEmailConfirmationAsync(string email);
        Task<Result> ChangePasswordAsync(string userId, string currentPassword, string newPassword);
        Task<Result> PasswordResetAsync(string userName);
        Task<Result> PasswordResetConfirmAsync(string userId, string token, string newPassword);
        Task SendEmailConfirmationAsync(AppUser appUser);
    }
}
