namespace FoodOrderAPI.DatabaseContext.Models.Orders
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int ProductId { get; set; }
        public string ProductType { get; set; } // "Food" or "Drink"
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
    }
}
