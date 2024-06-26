global using Microsoft.EntityFrameworkCore;
using FoodOrderAPI.DatabaseContext.Models.Products;
using FoodOrderAPI.DatabaseContext.Models.Users;

namespace FoodOrderAPI.DatabaseContext
{
    public class ModelsContext : DbContext
    {
        public ModelsContext(DbContextOptions<ModelsContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=FoodOrderApiDb;Trusted_Connection=true;TrustServerCertificate=true");
        }

        public DbSet<Admin> Admins => Set<Admin>();
        public DbSet<Client> Clients => Set<Client>();
        public DbSet<Food> Foods => Set<Food>();
        public DbSet<Drink> Drinks => Set<Drink>();
    }
}