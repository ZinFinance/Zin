using System.Numerics;
using System.Threading.Tasks;
using Zin.Repository.DbContext;
using Zin.Repository.Repository;

namespace Zin.Repository.Implementation
{
    public class UserBalanceRepository: IUserBalanceRepository
    {
        private readonly AppDbContext appDbContext;

        public UserBalanceRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task AddUserTokenBalance(string userId, BigInteger amount)
        {
            var user = await appDbContext.Users.FindAsync(userId);

            BigInteger addedBalance = BigInteger.Add(BigInteger.Parse(user.ZinTokens), amount);
            user.ZinTokens = addedBalance.ToString();

            appDbContext.Users.Update(user);
            await appDbContext.SaveChangesAsync();
        }
    }
}
