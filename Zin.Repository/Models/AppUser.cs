using Microsoft.AspNetCore.Identity;

namespace Zin.Repository.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EthAddress { get; set; }
        public string TfaCode { get; set; }
        public string ReferralCode { get; set; }
        public bool IsAdmin { get; set; }

        //Those tokens that this user has actually bought
        public string ZinTokens { get; set; }

        //Those tokens that are given to this user when the other user has used this user referral code
        public string ReferralZinTokens { get; set; }

        //Those tokens that are given to this user when he is purchasing some tokens
        public string BonusZinTokens { get; set; }

        //Those tokens that are given to this user as bonus in presale time
        public string PresaleZinTokens { get; set; }
    }
}
