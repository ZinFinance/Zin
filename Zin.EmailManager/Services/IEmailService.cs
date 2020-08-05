using System.Threading.Tasks;

namespace Zin.EmailManager.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string title, string message);
        Task SendEmailReConfirmationAsync(string to, string emailConfirmationUrl);
        Task SendRegisterEmailAsync(string to, string fullName, string emailConfirmationUrl);
    }
}
