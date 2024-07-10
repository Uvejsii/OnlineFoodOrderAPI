using System.Net;
using FoodOrderAPI.DatabaseContext;
using FoodOrderAPI.DatabaseContext.Models.Products;
using FoodOrderAPI.DatabaseContext.Models.Users;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using FoodOrderAPI.DatabaseContext.Models.Orders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ModelsContext>();

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
    .AddEntityFrameworkStores<ModelsContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();
app.MapIdentityApi<ApplicationUser>();
app.UseCors("AllowFrontend");

app.MapGet("/", () => "Hello World!");

// ACCOUNT ENDPOINTS
app.MapPost("/logout", async (SignInManager<ApplicationUser> signInManager) => {
    await signInManager.SignOutAsync();
    return Results.Ok();
}).RequireAuthorization();

app.MapGet("/pingauth", (ClaimsPrincipal user) => {
    var email = user.FindFirstValue(ClaimTypes.Email);
    return Results.Json(new { Email = email });
}).RequireAuthorization();

// FOOD ENDPOINTS
app.MapGet("/getAllFoodProducts", async (ModelsContext context) => {
    return Results.Ok(await context.Foods.ToListAsync());
});

app.MapGet("/food/{id}", async (ModelsContext context, int id) => {
    return await context.Foods.FindAsync(id) is Food food ?
        Results.Ok(food) : 
        Results.NotFound("Sorry, Food not found");
});

app.MapPost("/postFood", async (ModelsContext context, Food food) => {
    context.Foods.Add(food);
    await context.SaveChangesAsync();
    return Results.Ok(await context.Foods.ToListAsync());
});

app.MapPut("/editFood/{id}", async (ModelsContext context, Food food, int id) => {
    var foundFood = await context.Foods.FindAsync(id);

    if (foundFood is null)
    {
        return Results.NotFound("Sorry, Food to EDIT not found");
    }

    foundFood.ImageUrl = food.ImageUrl;
    foundFood.Name = food.Name;
    foundFood.Description = food.Description;
    foundFood.Price = food.Price;
    foundFood.Rating = food.Rating;
    foundFood.Category = food.Category;
    foundFood.Quantity = food.Quantity;

    await context.SaveChangesAsync();

    return Results.Ok(await context.Foods.ToListAsync());
});

app.MapDelete("/deleteFood/{id}", async (ModelsContext context, int id) => {
    var foundFood = await context.Foods.FindAsync(id);

    if (foundFood is null)
    {
        return Results.NotFound("Sorry, Food to DELETE not found");
    }

    context.Foods.Remove(foundFood);
    await context.SaveChangesAsync();

    return Results.Ok(await context.Foods.ToListAsync());
});

// DRINK ENDPOINTS
app.MapGet("/getAllDrinkProducts", async (ModelsContext context) => {
    return Results.Ok(await context.Drinks.ToListAsync());
});

app.MapGet("/drink/{id}", async (ModelsContext context, int id) => {
    return await context.Drinks.FindAsync(id) is Drink drink ?
        Results.Ok(drink) :
        Results.NotFound("Sorry, Drink not found");
});

app.MapPost("/postDrink", async (ModelsContext context, Drink drink) => {
    context.Drinks.Add(drink);
    await context.SaveChangesAsync();
    return Results.Ok(await context.Drinks.ToListAsync());
});

app.MapPut("/editDrink/{id}", async (ModelsContext context, Drink drink, int id) => {
    var foundDrink = await context.Drinks.FindAsync(id);

    if (foundDrink is null)
    {
        return Results.NotFound("Sorry, Drink to EDIT not found");
    }

    foundDrink.ImageUrl = drink.ImageUrl;
    foundDrink.Name = drink.Name;
    foundDrink.Description = drink.Description;
    foundDrink.Price = drink.Price;
    foundDrink.Rating = drink.Rating;
    foundDrink.Category = drink.Category;
    foundDrink.Quantity = drink.Quantity;

    await context.SaveChangesAsync();

    return Results.Ok(await context.Drinks.ToListAsync());
});

app.MapDelete("/deleteDrink/{id}", async (ModelsContext context, int id) => {
    var foundDrink = await context.Drinks.FindAsync(id);

    if (foundDrink is null)
    {
        return Results.NotFound("Sorry, Drink to DELETE not found");
    }

    context.Drinks.Remove(foundDrink);
    await context.SaveChangesAsync();

    return Results.Ok(await context.Drinks.ToListAsync());
});

// ORDER ENDPOINTS
// app.MapPost("/cart/add", async (ModelsContext context, CartItem cartItem) =>
// {
//     context.CartItems.Add(cartItem);
//     await context.SaveChangesAsync();
//     return Results.Ok(cartItem);
// });

// app.MapPost("/addToCart", async (ClaimsPrincipal user, HttpContext httpContext, UserManager<ApplicationUser> userManager,ModelsContext context, CartItem cartItem) =>
// {
//     try
//     {
//         var userEmail = user.FindFirstValue(ClaimValueTypes.Email);
//         var user1 = await userManager.GetUserAsync(httpContext.User);
//         if (userEmail == null)
//         {
//             return Results.Unauthorized();
//         }

//         if (user1 == null)
//         {
//             return Results.Unauthorized();
//         }

//         // Find or create a cart for the user
//         var cart = await context.Carts.FirstOrDefaultAsync(c => c.UserId == user1.Id);
//         if (cart == null)
//         {
//             // Create a new cart if one doesn't exist for the user
//             cart = new Cart { UserId = user1.Id};
//             context.Carts.Add(cart);
//             await context.SaveChangesAsync(); // Save changes to generate cart Id
//         }

//         // Assign the correct CartId to the cartItem
//         cartItem.CartId = cart.Id;

//         // Add the cartItem to context and save changes
//         context.CartItems.Add(cartItem);
//         await context.SaveChangesAsync();

//         return Results.Ok(cartItem);
//     }
//     catch (Exception ex)
//     {
//         Console.WriteLine($"Error adding to cart: {ex.Message}");
//         return Results.NotFound(ex.Message);
//     }
// }).RequireAuthorization();

// app.MapPost("/addToCart", async (HttpContext httpContext, ModelsContext dbContext, UserManager<ApplicationUser> userManager, int productId, string productType, int quantity) =>
// {
//     var user = await userManager.GetUserAsync(httpContext.User);
//     if (user == null)
//     {
//         return Results.Unauthorized();
//     }

//     var userId = user.Id;

//     var cart = await dbContext.Carts
//         .Include(c => c.CartItems)
//         .FirstOrDefaultAsync(c => c.UserId == userId);

//     if (cart == null)
//     {
//         cart = new Cart
//         {
//             UserId = userId,
//             EmailAddress = user.Email,
//             CartItems = new List<CartItem>()
//         };
//         dbContext.Carts.Add(cart);
//     }

//     var existingCartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId && ci.ProductType == productType);
//     if (existingCartItem != null)
//     {
//         existingCartItem.Quantity += quantity;
//     }
//     else
//     {
//         cart.CartItems.Add(new CartItem
//         {
//             ProductId = productId,
//             ProductType = productType,
//             Quantity = quantity
//         });
//     }

//     await dbContext.SaveChangesAsync();

//     return Results.Ok(cart);
// }).RequireAuthorization();

app.MapPost("/addToCart", async (HttpContext httpContext, UserManager<ApplicationUser> userManager, ModelsContext db) =>
{
    var cartItemDto = await httpContext.Request.ReadFromJsonAsync<CartItemDto>();
    if (cartItemDto == null)
    {
        return Results.BadRequest("Invalid request payload.");
    }

    var user = await userManager.GetUserAsync(httpContext.User); // Await the user retrieval
    if (user == null)
    {
        return Results.BadRequest("User not found.");
    }

    var foundUser = await db.Users.FirstOrDefaultAsync(u => u.Id == user.Id); // Use the user ID directly without conversion
    if (foundUser == null)
    {
        return Results.BadRequest("User not found in database.");
    }

    var cart = await db.Carts.Include(c => c.CartItems).FirstOrDefaultAsync(c => c.UserId == user.Id);
    if (cart == null)
    {
        cart = new Cart
        {
            EmailAddress = foundUser.Email,
            UserId = foundUser.Id,
            User = foundUser,
            CartItems = new List<CartItem>()
        };
        db.Carts.Add(cart);
    }

    var existingCartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == cartItemDto.ProductId && ci.ProductType == cartItemDto.ProductType);
    if (existingCartItem != null)
    {
        existingCartItem.Quantity += cartItemDto.Quantity;
    }
    else
    {
        var cartItem = new CartItem
        {
            CartId = cart.Id,
            ProductId = cartItemDto.ProductId,
            ProductType = cartItemDto.ProductType,
            Quantity = cartItemDto.Quantity,
            Name = cartItemDto.Name,
            ImageUrl = cartItemDto.ImageUrl,
            Price = cartItemDto.Price
        };
        cart.CartItems.Add(cartItem);
    }

    await db.SaveChangesAsync();

    return Results.Ok(new { Message = "Item added to cart successfully!" });
}).RequireAuthorization();

app.MapGet("/getAllAddedItems", async (ModelsContext context) => {
    return Results.Ok(await context.CartItems.ToListAsync());
});

app.MapPost("/order/create", async (ModelsContext context, Order order) =>
{
    // Assuming the user is authenticated and you have access to their UserId
    var user = await context.Users.FindAsync(order.UserId);
    if (user == null) return Results.BadRequest("Invalid user ID");

    context.Orders.Add(order);
    await context.SaveChangesAsync();
    return Results.Ok(order);
});

app.MapPut("/order/update/{id}", async (ModelsContext context, int id, OrderStatus status) =>
{
    var order = await context.Orders.FindAsync(id);
    if (order == null) return Results.NotFound();
    
    order.Status = status;
    await context.SaveChangesAsync();
    return Results.Ok(order);
});

app.MapGet("/order/user/{userId}", async (ModelsContext context, string userId) =>
{
    var orders = await context.Orders
        .Include(o => o.OrderItems)
        .Where(o => o.UserId == userId)
        .ToListAsync();
    
    return Results.Ok(orders);
});

app.MapGet("/admin/orders", async (ModelsContext context) =>
{
    var orders = await context.Orders
        .Include(o => o.User)
        .Include(o => o.OrderItems)
        .ToListAsync();
    
    return Results.Ok(orders);
});

app.Run();