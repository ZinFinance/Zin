using Microsoft.Extensions.DependencyInjection;
using Zin.Services.Implementation;
using Zin.Services.Services;

namespace Zin.Services
{
    public static class RegisterServices
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IProfileService, ProfileService>();
            services.AddTransient<IEthTxCheckService, EthTxCheckService>();
        }
    }
}
