namespace FoodOrderAPI.DatabaseContext.Models.Users
{
    public class Admin 
    {
        public int Id { get; set; }
        public string Role { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ProfilePicUrl { get; set; }
    }
}