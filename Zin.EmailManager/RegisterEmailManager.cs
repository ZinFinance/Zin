using Microsoft.Extensions.DependencyInjection;
using Zin.EmailManager.Implementation;
using Zin.EmailManager.Models;
using Zin.EmailManager.Services;
using System;

namespace Zin.EmailManager
{
    public static class RegisterEmailManager
    {
        public static IServiceCollection AddEmailManager(this IServiceCollection services, Action<EmailConfig> emailConfigs)
        {
            services.AddTransient<IEmailService, EmailService>();

            // register configuration
            var configs = new EmailConfig();
            emailConfigs(configs);
            return services.AddSingleton(configs);
        }
    }
}
