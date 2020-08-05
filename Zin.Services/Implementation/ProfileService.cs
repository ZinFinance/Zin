using Microsoft.AspNetCore.Identity;
using Zin.Services.Models;
using Zin.Services.Services;
using System.Threading.Tasks;
using Zin.Repository.Models;

namespace Zin.Services.Implementation
{
    class ProfileService : IProfileService
    {
        private readonly UserManager<AppUser> userManager;

        public ProfileService(UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
        }
        
        public async Task<Result<UserDetails>> GetAsync(string userId)
        {
            // find account
            AppUser appUser = await userManager.FindByIdAsync(userId);
            return new Result<UserDetails>(appUser.ToDto());
        }
    }
}
