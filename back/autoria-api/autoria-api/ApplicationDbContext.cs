using Microsoft.EntityFrameworkCore;

namespace autoria_api
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Models.Car> Cars { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    }
}
