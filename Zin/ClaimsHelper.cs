using System.Linq;
using System.Security.Claims;

namespace Zin
{
    public static class ClaimsHelper
    {
        public static string Id(this ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal.Claims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.NameIdentifier))?.Value;
        }
    }
}
