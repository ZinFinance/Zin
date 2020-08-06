using Zin.EmailManager.Models;
using Zin.EmailManager.Services;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Zin.EmailManager.Implementation
{
    class EmailService : SendgridEmailService, IEmailService
    {
        public EmailService(EmailConfig sendGridConfig) : base(sendGridConfig)
        {
        }

        public async Task SendEmailAsync(string to, string title, string message)
        {
            await SendAsync(new Email
            {
                To = to,
                Subject = title,
                TemplateName = "Default.html",
                Tags = new Dictionary<string, string>
                {
                    { "title", title },
                    { "message", message }
                }
            });
        }

        public async Task SendRegisterEmailAsync(string to, string fullName, string emailConfirmationUrl)
        {
            await SendAsync(new Email
            {
                To = to,
                Subject = "Registered successfully",
                TemplateName = "RegisterEmail.html",
                Tags = new Dictionary<string, string>
                {
                    { "name", fullName },
                    { "url", emailConfirmationUrl }
                }
            });
        }

        public async Task SendEmailReConfirmationAsync(string to, string emailConfirmationUrl)
        {
            await SendAsync(new Email
            {
                To = to,
                Subject = "Email confirmation",
                TemplateName = "EmailReConfirmation.html",
                Tags = new Dictionary<string, string>
                {
                    { "url", emailConfirmationUrl }
                }
            });
        }

        public async Task SendResetPasswordEmailAsync(string to, string resetPasswordUrl)
        {
            await SendAsync(new Email
            {
                To = to,
                Subject = "Reset Password",
                TemplateName = "PasswordReset.html",
                Tags = new Dictionary<string, string>
                {
                    { "url", resetPasswordUrl }
                }
            });
        }
    }
}
