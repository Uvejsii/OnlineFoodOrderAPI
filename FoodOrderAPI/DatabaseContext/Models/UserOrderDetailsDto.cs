namespace FoodOrderAPI.DatabaseContext.Models.Orders
{
    public class UserOrderDetailsDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string Location { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public decimal TotalAmount { get; set; }
        public OrderStatus Status { get; set; }
        public string UserEmail { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
    }
}
