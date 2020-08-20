using System.Numerics;
using System.Threading.Tasks;
using Zin.Repository.DbContext;
using Zin.Repository.Models;
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

        public async Task AddUserTokenBalance(string userId, BigInteger amount, BonusType bonusType)
        {
            var user = await appDbContext.Users.FindAsync(userId);

            switch (bonusType) {
                case BonusType.None:
                    user.ZinTokens = BigInteger.Add(BigInteger.Parse(user.ZinTokens), amount).ToString();
                    break;
                case BonusType.Presale:
                    user.PresaleZinTokens = BigInteger.Add(BigInteger.Parse(user.PresaleZinTokens), amount).ToString();
                    break;
                case BonusType.Inviter:
                    user.ReferralZinTokens = BigInteger.Add(BigInteger.Parse(user.ReferralZinTokens), amount).ToString();
                    break;
                case BonusType.Invitee:
                    user.BonusZinTokens = BigInteger.Add(BigInteger.Parse(user.BonusZinTokens), amount).ToString();
                    break;
            }

            appDbContext.Users.Update(user);
            await appDbContext.SaveChangesAsync();
        }
    }
}
