namespace FoodOrderAPI.DatabaseContext.Models.Products
{
    public class Food 
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public double Rating { get; set; }
        public string Category { get; set; }
        public int Quantity { get; set; }
    }
}