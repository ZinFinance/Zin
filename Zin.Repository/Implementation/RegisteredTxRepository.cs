using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Zin.Repository.DbContext;
using Zin.Repository.Models;
using Zin.Repository.Repository;

namespace Zin.Repository.Implementation
{
    public class RegisteredTxRepository : IRegisteredTxRepository
    {
        private readonly AppDbContext appDbContext;

        public RegisteredTxRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task<List<RegisteredTx>> GetRegisteredTxOfUserAsync(string userId, bool referralOnly)
        {
            if (string.IsNullOrWhiteSpace(userId))
                return await appDbContext.RegisteredTx.OrderBy(x => x.CreateDateTimeOffset).ToListAsync();

            if (referralOnly)
            {
                return await appDbContext.RegisteredTx.Where(x => x.UserId.Equals(userId) && !string.IsNullOrWhiteSpace(x.ReferralCode)).ToListAsync();
            }
            else
            {
                return await appDbContext.RegisteredTx.Where(x => x.UserId.Equals(userId)).ToListAsync();
            }
        }

        public async Task<RegisteredTx> GetRegisteredTxUsingIdAsync(string txId)
        {
            var data = await appDbContext.RegisteredTx.FindAsync(txId);
            return data;
        }

        public async Task SaveRegisteredTxAsync(RegisteredTx registeredTx)
        {
            registeredTx.CreateDateTimeOffset = DateTimeOffset.UtcNow;
            appDbContext.RegisteredTx.Add(registeredTx);
            await appDbContext.SaveChangesAsync();
        }
    }
}
