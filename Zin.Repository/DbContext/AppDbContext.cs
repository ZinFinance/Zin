using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Zin.Repository.Models;

namespace Zin.Repository.DbContext
{
    public sealed class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
            Database.Migrate();
        }
    }
}
