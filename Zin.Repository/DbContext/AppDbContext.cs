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

        public DbSet<RegisteredTx> RegisteredTx { get; set; }
        public DbSet<BonusRate> BonusRate { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
