namespace FoodOrderAPI.DatabaseContext.Models.Orders
{
    public class CartItemDto
    {
        public int ProductId { get; set; }
        public string ProductType { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
    }
}
