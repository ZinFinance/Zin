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
    public class ReferralCodeRepository : IReferralCodeRepository
    {
        private readonly AppDbContext appDbContext;

        public ReferralCodeRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task<string> GetNewReferralCodeAsync()
        {
            string code = null;
            List<AppUser> existedUsers = new List<AppUser>();
            while (existedUsers.Count > 0 || string.IsNullOrWhiteSpace(code))
            {
                code = GenerateNewReferralCodeUsingLength(5);
                existedUsers = await appDbContext.Users.Where(x => x.ReferralCode.Equals(code)).ToListAsync();
            }
            return code;
        }

        public async Task<string> GetReferralCodeByUserNameAsync(string userName)
        {
            var existedUser = await appDbContext.Users.FindAsync(userName);
            return existedUser.ReferralCode;
        }

        public async Task<AppUser> GetUserByReferralCodeAsync(string referralCode)
        {
            if(string.IsNullOrWhiteSpace(referralCode))
                return null;
            var existedUsers = await appDbContext.Users.Where(x => x.ReferralCode.Equals(referralCode)).ToListAsync();
            if (existedUsers.Count <= 0)
                return null;
            return existedUsers.First();
        }

        public async Task<AppUser> GetUserByEthAddressAsync(string ethAddress)
        {
            if (string.IsNullOrWhiteSpace(ethAddress))
                return null;
            var existedUsers = await appDbContext.Users.Where(x => x.EthAddress.Equals(ethAddress)).ToListAsync();
            if (existedUsers.Count <= 0)
                return null;
            return existedUsers.First();
        }

        /// <summary>
        /// private helper method
        /// </summary>
        /// <param name="length"></param>
        /// <returns></returns>
        private string GenerateNewReferralCodeUsingLength(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
