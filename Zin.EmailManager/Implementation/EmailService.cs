using Zin.EmailManager.Models;
using Zin.EmailManager.Services;
using System.Threading.Tasks;
using System.Collections.Generic;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.IO;
using System.Text;
using Stubble.Core;
using Stubble.Core.Builders;
using Microsoft.AspNetCore.Hosting;

namespace Zin.EmailManager.Implementation
{
    class EmailService : IEmailService
    {
        private readonly EmailConfig sendGridConfig;
        private readonly IHostingEnvironment hostingEnvironment;

        public EmailService(EmailConfig sendGridConfig, IHostingEnvironment hostingEnvironment)
        {
            this.sendGridConfig = sendGridConfig;
            this.hostingEnvironment = hostingEnvironment;
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

        public async Task SendLoginTfaCodeAsync(string to, string code)
        {
            await SendAsync(new Email
            {
                To = to,
                Subject = "Login Code",
                TemplateName = "LoginTfa.html",
                Tags = new Dictionary<string, string>
                {
                    { "code", code }
                }
            });
        }

        private async Task SendAsync(Email email)
        {
            SendGridClient sendGridClient = new SendGridClient(sendGridConfig.Apikey);
            EmailAddress from = new EmailAddress(sendGridConfig.From, sendGridConfig.DisplayName);
            EmailAddress to = new EmailAddress(email.To);
            string subject = await RenderTemplateAsync(email.Subject, email.Tags);
            string body = await RenderTemplateAsync(GetTemplateBody(email.TemplateName), email.Tags);
            SendGridMessage msg = MailHelper.CreateSingleEmail(from, to, subject, body, body);
            await sendGridClient.SendEmailAsync(msg);
        }

        private string GetTemplateBody(string templateName)
        {
            string executionPath = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase).Substring(6);
            string absoluteTemplatePath = Path.Combine(hostingEnvironment.ContentRootPath, "Templates", templateName);
            return File.ReadAllText(absoluteTemplatePath, Encoding.UTF8);
        }

        private async Task<string> RenderTemplateAsync(string template, object tags)
        {
            StubbleVisitorRenderer stubble = new StubbleBuilder().Configure(x =>
            {
                x.SetIgnoreCaseOnKeyLookup(true);
                x.SetMaxRecursionDepth(512);
            }).Build();
            return await stubble.RenderAsync(template, tags);
        }
    }
}
