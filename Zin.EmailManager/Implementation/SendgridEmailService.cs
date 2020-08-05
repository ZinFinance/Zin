using Zin.EmailManager.Models;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;
using System.IO;
using System.Text;
using Stubble.Core;
using Stubble.Core.Builders;

namespace Zin.EmailManager.Implementation
{
    class SendgridEmailService
    {
        private readonly EmailConfig sendGridConfig;

        public SendgridEmailService(EmailConfig sendGridConfig)
        {
            this.sendGridConfig = sendGridConfig;
        }

        public async Task SendAsync(Email email)
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
            string absoluteTemplatePath = Path.Combine(executionPath, "Templates", templateName);
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
