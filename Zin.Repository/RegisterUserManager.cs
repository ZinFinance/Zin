using Microsoft.Extensions.DependencyInjection;
using Zin.Repository.Implementation;
using Zin.Repository.Repository;

namespace Zin.Repository
{
    public static class RegisterRepository
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IReferralCodeRepository, ReferralCodeRepository>();
        }
    }
}
