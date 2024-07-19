using FoodOrderAPI.DatabaseContext.Models.Users;

namespace FoodOrderAPI.DatabaseContext.Models.Orders
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserEmail {get; set;}
        public ApplicationUser User { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderStatus Status { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public string Location { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
