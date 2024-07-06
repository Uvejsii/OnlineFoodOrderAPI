using FoodOrderAPI.DatabaseContext.Models.Products;
using FoodOrderAPI.DatabaseContext.Models.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FoodOrderAPI.DatabaseContext
{
    public class ModelsContext : IdentityDbContext<ApplicationUser>  // Combined context name
    {
        public ModelsContext(DbContextOptions<ModelsContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Add your customizations to the model builder here
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=FoodOrderApiDb;Trusted_Connection=true;TrustServerCertificate=true");
        }

        // User-related DbSet
        public DbSet<ApplicationUser> ApplicationUsers => Set<ApplicationUser>();

        // Product-related DbSets
        public DbSet<Food> Foods => Set<Food>();
        public DbSet<Drink> Drinks => Set<Drink>();
    }
}
