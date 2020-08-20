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
            services.AddTransient<IRegisteredTxRepository, RegisteredTxRepository>();
            services.AddTransient<IBonusTxRepository, BonusTxRepository>();
            services.AddTransient<IUserBalanceRepository, UserBalanceRepository>();
            services.AddTransient<IBonusCalculationRepository, BonusCalculationRepository>();
        }
    }
}
