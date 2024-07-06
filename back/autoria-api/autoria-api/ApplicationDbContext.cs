using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace autoria_api.data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public DbSet<Models.Car> Cars { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    }
}
