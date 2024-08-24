using Microsoft.EntityFrameworkCore;
using Core.Models; // Додайте необхідний using для моделей
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Cars> Cars { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<RefreshToken> refreshTokens { get; set; }
        public DbSet<Subscribe> Subscribe { get; set; }
        public DbSet<UserSubscribe> UserSubscribes { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }


    }
}
