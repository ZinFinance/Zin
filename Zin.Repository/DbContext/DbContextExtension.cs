using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Zin.Repository.DbContext
{
    public static class AppDbContextExtension
    {
        public static async Task<bool> AddEntityAsync<Context, Entity>(this AppDbContext dbContext, Entity entity) where Entity : class
        {
            return await dbContext.EntityAsync(entity, EntityState.Added);
        }

        public static async Task<bool> AddEntityAsync<Entity>(this AppDbContext dbContext, IEnumerable<Entity> entities) where Entity : class
        {
            dbContext.AddRange(entities);
            return await dbContext.SaveAsync();
        }

        public static async Task<bool> UpdateEntityAsync<Entity>(this AppDbContext dbContext, Entity entity) where Entity : class
        {
            return await dbContext.EntityAsync(entity, EntityState.Modified);
        }

        public static async Task<bool> UpdateEntityAsync<Entity>(this AppDbContext dbContext, IEnumerable<Entity> entities) where Entity : class
        {
            dbContext.UpdateRange(entities);
            return await dbContext.SaveAsync();
        }

        public static async Task<bool> RemoveEntityAsync<Entity>(this AppDbContext dbContext, Entity entity) where Entity : class
        {
            return await dbContext.EntityAsync(entity, EntityState.Deleted);
        }

        public static async Task<bool> RemoveEntityAsync<Entity>(this AppDbContext dbContext, IEnumerable<Entity> entities) where Entity : class
        {
            dbContext.RemoveRange(entities);
            return await dbContext.SaveAsync();
        }

        private static async Task<bool> EntityAsync<Entity>(this AppDbContext dbContext, Entity entity, EntityState state) where Entity : class
        {
            dbContext.Entry(entity).State = state;
            return await SaveAsync(dbContext);
        }

        private static async Task<bool> SaveAsync(this AppDbContext dbContext)
        {
            return (await dbContext.SaveChangesAsync()) > 0;
        }
    }
}
