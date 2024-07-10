using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace autoria_api.DbContext
{
    public class AppUserConfiguration: IEntityTypeConfiguration<UserDbContext>
    {
        public void Configure(EntityTypeBuilder<UserDbContext> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}
