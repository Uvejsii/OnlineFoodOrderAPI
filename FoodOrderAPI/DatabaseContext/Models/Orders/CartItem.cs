namespace FoodOrderAPI.DatabaseContext.Models.Orders
{
    public class CartItem
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; }
        public int ProductId { get; set; }
        public string ProductType { get; set; } // "Food" or "Drink"
        public int Quantity { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
    }
}
