using FoodOrderAPI.DatabaseContext;
using FoodOrderAPI.DatabaseContext.Models.Products;
using FoodOrderAPI.DatabaseContext.Models.Users;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using FoodOrderAPI.DatabaseContext.Models.Orders;
using Serilog;
using System.Collections.Immutable;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();
builder.Services.AddControllers();

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

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
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
app.MapPost("/addToCart", async (HttpContext httpContext, UserManager<ApplicationUser> userManager, ModelsContext db) =>
{
    var cartItemDto = await httpContext.Request.ReadFromJsonAsync<CartItemDto>();
    if (cartItemDto == null)
    {
        return Results.BadRequest("Invalid request payload.");
    }

    var user = await userManager.GetUserAsync(httpContext.User);
    if (user == null)
    {
        return Results.BadRequest("User not found.");
    }

    var foundUser = await db.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
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

app.MapGet("/getAllAddedItems", async (HttpContext httpContext, UserManager<ApplicationUser> userManager, ModelsContext context) =>
{
    var user = await userManager.GetUserAsync(httpContext.User);
    if (user == null)
    {
        return Results.Unauthorized();
    }

    var foundUserId = user.Id;
    var cartItems = await context.CartItems
        .Include(ci => ci.Cart)
        .Where(ci => ci.Cart.UserId == foundUserId)
        .Select(ci => new 
        {
            ci.ProductId,
            ci.ProductType,
            ci.Quantity,
            ci.Name,
            ci.Price,
            ci.ImageUrl
        })
        .ToListAsync();

    return Results.Ok(cartItems);
}).RequireAuthorization();

app.MapDelete("/removeCartItem/{id}/{productType}", async (HttpContext httpContext, UserManager<ApplicationUser> userManager, ModelsContext context, int id, string productType) => {
    var user = await userManager.GetUserAsync(httpContext.User);
    if (user is null)
    {
        return Results.Unauthorized();
    }

    var foundUserId = user.Id;

    var cart = await context.Carts.Include(c => c.CartItems).FirstOrDefaultAsync(c => c.UserId == foundUserId);

    if (cart is null)
    {
        return Results.Unauthorized();
    }

    var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == id && ci.ProductType.Equals(productType, StringComparison.OrdinalIgnoreCase));

    if (cartItem is null)
    { 
        return Results.NotFound("Cart item not found or you do not have permission to delete it.");  
    }

    context.CartItems.Remove(cartItem);
    await context.SaveChangesAsync();

    var updatedCartItems = await context.CartItems
        .Include(ci => ci.Cart)
        .Where(ci => ci.Cart.UserId == foundUserId)
        .Select(ci => new {
            ci.ProductId,
            ci.ProductType,
            ci.Quantity,
            ci.Name,
            ci.Price,
            ci.ImageUrl
        })
        .ToListAsync();

    return Results.Ok(updatedCartItems);
}).RequireAuthorization();

app.MapPut("/updateCartItemQuantity/{id}/{change}/{productType}", async (HttpContext httpContext, UserManager<ApplicationUser> userManager, ModelsContext context, int id, int change, string productType) => {
    var user = await userManager.GetUserAsync(httpContext.User);
    if (user is null)
    {
        return Results.Unauthorized();
    }

    var foundUserId = user.Id;

    var cart = await context.Carts.Include(c => c.CartItems).FirstOrDefaultAsync(c => c.UserId == foundUserId);
    if (cart is null)
    {
        return Results.Unauthorized();
    }

    var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == id && ci.ProductType.Equals(productType, StringComparison.OrdinalIgnoreCase));
    if (cartItem is null)
    {
        return Results.NotFound("Cart item not found or you do not have permission to update it.");
    }

    cartItem.Quantity += change;

    if (cartItem.Quantity < 1)
    {
        return Results.BadRequest("Quantity cannot be less than 1.");
    }

    await context.SaveChangesAsync();

    var updatedCartItems = await context.CartItems
        .Include(ci => ci.Cart)
        .Where(ci => ci.Cart.UserId == foundUserId)
        .Select(ci => new {
            ci.ProductId,
            ci.ProductType,
            ci.Quantity,
            ci.Name,
            ci.Price,
            ci.ImageUrl
        })
        .ToListAsync();

    return Results.Ok(updatedCartItems);
}).RequireAuthorization();

app.MapGet("/getOrderTotal", async (HttpContext httpContext, UserManager<ApplicationUser> userManager, ModelsContext context) => {
    var user = await userManager.GetUserAsync(httpContext.User);
    if (user is null)
    {
        return Results.Unauthorized();
    }

    var foundUserId = user.Id;

    var cart = await context.Carts.Include(c => c.CartItems).FirstOrDefaultAsync(c => c.UserId == foundUserId);
    if (cart is null)
    {
        return Results.Unauthorized();
    }

    var orderTotal = cart.CartItems.Sum(ci => ci.Price * ci.Quantity);

    return Results.Ok(new {OrderTotal = orderTotal});
}).RequireAuthorization();

app.MapPost("/createOrder", async (HttpContext httpContext, UserManager<ApplicationUser> userManager, ModelsContext context) =>
{
    var user = await userManager.GetUserAsync(httpContext.User);
    if (user is null)
    {
        return Results.Unauthorized();
    }

    var foundUserId = user.Id;
    var foundUserEmail = user.Email;

    var location = httpContext.Request.Query["location"].ToString();
    var city = httpContext.Request.Query["city"].ToString();
    var phoneNumber = httpContext.Request.Query["phoneNumber"].ToString();
    
    if (string.IsNullOrEmpty(location) || string.IsNullOrEmpty(city) || string.IsNullOrEmpty(phoneNumber))
    {
        return Results.BadRequest("Missing order details.");
    }

    var cart = await context.Carts.Include(c => c.CartItems).FirstOrDefaultAsync(c => c.UserId == foundUserId);
    if (cart is null || !cart.CartItems.Any())
    {
        return Results.BadRequest("Cart is empty or not found.");
    }

    var order = new Order
    {
        UserId = foundUserId,
        UserEmail = foundUserEmail,
        OrderDate = DateTime.UtcNow,
        Location = location,
        City = city,
        PhoneNumber = phoneNumber,
        TotalAmount = cart.CartItems.Sum(ci => ci.Quantity * ci.Price),
        Status = OrderStatus.Pending,
        OrderItems = new List<OrderItem>()
    };

    foreach (var cartItem in cart.CartItems)
    {
        order.OrderItems.Add(new OrderItem
        {
            ProductId = cartItem.ProductId,
            ProductType = cartItem.ProductType,
            Quantity = cartItem.Quantity,
            Price = cartItem.Price,
            Name = cartItem.Name,
            ImageUrl = cartItem.ImageUrl
        });
    }

    context.Orders.Add(order);
    context.CartItems.RemoveRange(cart.CartItems);
    await context.SaveChangesAsync();

    // Map to DTO
    var orderDto = new OrderDto
    {
        Id = order.Id,
        OrderDate = order.OrderDate,
        Location = order.Location,
        City = order.City,
        PhoneNumber = order.PhoneNumber,
        TotalAmount = order.TotalAmount,
        Status = order.Status,
        UserEmail = order.UserEmail,
        OrderItems = order.OrderItems.Select(oi => new OrderItemDto
        {
            ProductId = oi.ProductId,
            ProductType = oi.ProductType,
            Quantity = oi.Quantity,
            Price = oi.Price,
            Name = oi.Name,
            ImageUrl = oi.ImageUrl
        }).ToList()
    };

    return Results.Ok(orderDto);
}).RequireAuthorization();




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

app.MapGet("/getOrdersForAdmin", async (ModelsContext context, ILogger<Program> logger) =>
{
    try
    {
        var orders = await context.Orders
            .Include(o => o.OrderItems)
            .ToListAsync();

        // Map to DTOs
        var orderDtos = orders.Select(o => new OrderDto
        {
            Id = o.Id,
            OrderDate = o.OrderDate,
            Location = o.Location,
            City = o.City,
            PhoneNumber = o.PhoneNumber,
            TotalAmount = o.TotalAmount,
            Status = o.Status,
            UserEmail = o.UserEmail,
            OrderItems = o.OrderItems.Select(oi => new OrderItemDto
            {
                ProductId = oi.ProductId,
                ProductType = oi.ProductType,
                Quantity = oi.Quantity,
                Price = oi.Price,
                Name = oi.Name,
                ImageUrl = oi.ImageUrl
            }).ToList()
        }).ToList();

        return Results.Ok(orderDtos);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while fetching orders.");
        return Results.Problem("An internal server error occurred.", statusCode: 500);
    }
});

app.MapGet("/getLastOrder", async (HttpContext httpContext, UserManager<ApplicationUser> userManager, ModelsContext context) => 
{
    var user = await userManager.GetUserAsync(httpContext.User);
    if (user is null)
    {
        return Results.Unauthorized();
    }

    var foundUserId = user.Id;

    var lastOrder = await context.Orders
        .Where(o => o.UserId == foundUserId)
        .Include(o => o.OrderItems)
        .OrderByDescending(o => o.OrderDate)
        .FirstOrDefaultAsync();

    if (lastOrder is null)
    {
        return Results.NotFound("No orders found for this user");
    }

    var userOrderDetailsDto = new UserOrderDetailsDto
    {
        Id = lastOrder.Id,
        OrderDate = lastOrder.OrderDate,
        Location = lastOrder.Location,
        City = lastOrder.City,
        PhoneNumber = lastOrder.PhoneNumber,
        TotalAmount = lastOrder.TotalAmount,
        Status = lastOrder.Status,
        UserEmail = lastOrder.UserEmail,
        OrderItems = lastOrder.OrderItems.Select(oi => new OrderItemDto
        {
            ProductId = oi.ProductId,
            ProductType = oi.ProductType,
            Quantity = oi.Quantity,
            Price = oi.Price,
            Name = oi.Name,
            ImageUrl = oi.ImageUrl
        }).ToList()
    };

    return Results.Ok(userOrderDetailsDto);
}).RequireAuthorization();

app.Run();