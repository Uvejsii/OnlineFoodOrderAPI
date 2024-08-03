namespace FoodOrderAPI.DatabaseContext.Models.Orders;

public class RegisterDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string ConfirmPassword {get; set;}
    public string Role { get; set; } // "Admin" or "User"
}
