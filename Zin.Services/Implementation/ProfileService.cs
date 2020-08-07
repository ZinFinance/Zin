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
        private readonly IAccountService accountService;

        public ProfileService(UserManager<AppUser> userManager,
            IAccountService accountService)
        {
            this.userManager = userManager;
            this.accountService = accountService;
        }
        
        public async Task<Result<UserDetails>> GetAsync(string userId)
        {
            // find account
            AppUser appUser = await userManager.FindByIdAsync(userId);
            return new Result<UserDetails>(appUser.ToDto());
        }

        public async Task<Result> UpdateAsync(string userId, UserDetails userDetails)
        {
            // find account
            AppUser appUser = await userManager.FindByIdAsync(userId);

            // update details
            appUser.EmailConfirmed = userDetails.Email == appUser.Email;
            IdentityResult identityResult = await userManager.UpdateAsync(appUser.Update(userDetails));
            if (!identityResult.Succeeded)
                return new Result(identityResult);

            // send confirmation email
            if (!appUser.EmailConfirmed)
                await accountService.SendEmailConfirmationAsync(appUser);

            return new Result(true, "PROFILE_UPDATED");
        }
    }
}
