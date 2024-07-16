using FoodOrderAPI.DatabaseContext.Models.Orders;
using Microsoft.AspNetCore.Identity;

namespace FoodOrderAPI.DatabaseContext.Models.Users
{
    public class ApplicationUser : IdentityUser
    {
        public List<Order> Orders { get; set; }
    }
}