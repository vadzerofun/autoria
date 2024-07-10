namespace autoria_api.DbContext
{
    public class DbInitailiser
    {
        public static void Initialise(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();
        }
    }
}
