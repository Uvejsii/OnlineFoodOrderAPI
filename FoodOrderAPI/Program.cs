using FoodOrderAPI.DatabaseContext;
using FoodOrderAPI.DatabaseContext.Models.Products;
using FoodOrderAPI.DatabaseContext.Models.Users;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using FoodOrderAPI.DatabaseContext.Models.Orders;
using Microsoft.AspNetCore.Identity.UI.Services;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();
builder.Services.AddControllers();

builder.Services.AddDbContext<ModelsContext>();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdministratorRole",
        policy => policy.RequireRole("Admin"));
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("UserOrAdminPolicy", policy =>
        policy.RequireRole("Admin", "User"));
});

builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
    .AddRoles<IdentityRole>()
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

builder.Services.AddSingleton<IEmailSender, NoOpEmailSender>();

var app = builder.Build();

app.UseCors("AllowFrontend");


if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapIdentityApi<ApplicationUser>();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    await SeedData.Initialize(services, userManager, roleManager);
}

app.MapGet("/", () => "Hello World!");

// ACCOUNT ENDPOINTS

app.MapPost("/customRegister", async (UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, RegisterDto registerDto) =>
{
    if (string.IsNullOrEmpty(registerDto.Email) || string.IsNullOrEmpty(registerDto.Password) || string.IsNullOrEmpty(registerDto.ConfirmPassword))
    {
        return Results.BadRequest("Email, Password, and ConfirmPassword are required.");
    }

    if (registerDto.Password != registerDto.ConfirmPassword)
    {
        return Results.BadRequest("Password and ConfirmPassword do not match.");
    }

    var user = new ApplicationUser
    {
        UserName = registerDto.Email,
        Email = registerDto.Email
    };

    var result = await userManager.CreateAsync(user, registerDto.Password);
    if (!result.Succeeded)
    {
        return Results.BadRequest(result.Errors);
    }

    if (!string.IsNullOrEmpty(registerDto.Role) && await roleManager.RoleExistsAsync(registerDto.Role))
    {
        await userManager.AddToRoleAsync(user, registerDto.Role);
    }
    else
    {
        await userManager.AddToRoleAsync(user, "User");
    }

    return Results.Content("User registered successfully.", "text/plain");
});

app.MapPost("/registerAdmin", async (HttpContext httpContext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, RegisterDto registerDto) =>
{
    if (string.IsNullOrEmpty(registerDto.Email) || string.IsNullOrEmpty(registerDto.Password) || string.IsNullOrEmpty(registerDto.ConfirmPassword))
    {
        return Results.BadRequest("Email, Password, and ConfirmPassword are required.");
    }

    if (registerDto.Password != registerDto.ConfirmPassword)
    {
        return Results.BadRequest("Password and ConfirmPassword do not match.");
    }

    var currentUser = await userManager.GetUserAsync(httpContext.User);
    if (currentUser == null || !await userManager.IsInRoleAsync(currentUser, "Admin"))
    {
        return Results.Forbid();
    }

    var user = new ApplicationUser
    {
        UserName = registerDto.Email,
        Email = registerDto.Email
    };

    var result = await userManager.CreateAsync(user, registerDto.Password);
    if (!result.Succeeded)
    {
        return Results.BadRequest(result.Errors);
    }

    if (!await roleManager.RoleExistsAsync("Admin"))
    {
        await roleManager.CreateAsync(new IdentityRole("Admin"));
    }

    await userManager.AddToRoleAsync(user, "Admin");

    return Results.Content("Admin registered successfully.", "text/plain");
});


app.MapPost("/customLogin", async (UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, LoginDto loginDto, ILogger<Program> logger) =>
{
    var user = await userManager.FindByEmailAsync(loginDto.Email);
    if (user == null)
    {
        return Results.BadRequest("Invalid login attempt.");
    }

    var result = await signInManager.PasswordSignInAsync(user, loginDto.Password, loginDto.RememberMe, lockoutOnFailure: false);
    if (!result.Succeeded)
    {
        return Results.BadRequest("Invalid login attempt.");
    }

    var roles = await userManager.GetRolesAsync(user);

    return Results.Ok(new { Message = "Login successful", Roles = roles });
});

app.MapPost("/logout", async (SignInManager<ApplicationUser> signInManager) => {
    await signInManager.SignOutAsync();
    return Results.Ok();
}).RequireAuthorization();

app.MapGet("/pingauth", (ClaimsPrincipal user) => {
    var email = user.FindFirstValue(ClaimTypes.Email);
    var roles = user.FindAll(ClaimTypes.Role).Select(role => role.Value);
    return Results.Json(new { Email = email, Roles = roles });
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
}).RequireAuthorization("RequireAdministratorRole");

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
}).RequireAuthorization("RequireAdministratorRole");

app.MapDelete("/deleteFood/{id}", async (ModelsContext context, int id) => {
    var foundFood = await context.Foods.FindAsync(id);

    if (foundFood is null)
    {
        return Results.NotFound("Sorry, Food to DELETE not found");
    }

    context.Foods.Remove(foundFood);
    await context.SaveChangesAsync();

    return Results.Ok(await context.Foods.ToListAsync());
}).RequireAuthorization("RequireAdministratorRole");

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
}).RequireAuthorization("RequireAdministratorRole");

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
}).RequireAuthorization("RequireAdministratorRole");

app.MapDelete("/deleteDrink/{id}", async (ModelsContext context, int id) => {
    var foundDrink = await context.Drinks.FindAsync(id);

    if (foundDrink is null)
    {
        return Results.NotFound("Sorry, Drink to DELETE not found");
    }

    context.Drinks.Remove(foundDrink);
    await context.SaveChangesAsync();

    return Results.Ok(await context.Drinks.ToListAsync());
}).RequireAuthorization("RequireAdministratorRole");

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
}).RequireAuthorization("UserOrAdminPolicy");

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
}).RequireAuthorization("UserOrAdminPolicy");

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
}).RequireAuthorization("UserOrAdminPolicy");

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
}).RequireAuthorization("UserOrAdminPolicy");

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

    var orderTotal = cart.CartItems.Sum(ci => ci.Price * ci.Quantity) + 1;

    return Results.Ok(new {OrderTotal = orderTotal});
}).RequireAuthorization("UserOrAdminPolicy");

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
}).RequireAuthorization("UserOrAdminPolicy");

app.MapGet("/getOrdersForAdmin", async (ModelsContext context, ILogger<Program> logger) =>
{
    try
    {
        var orders = await context.Orders
            .Include(o => o.OrderItems)
            .OrderByDescending(o => o.Id)
            .ToListAsync();

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
}).RequireAuthorization("RequireAdministratorRole");

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
}).RequireAuthorization("UserOrAdminPolicy");

app.MapPut("/editOrderStatus/{orderId}/{newStatus}", async (ModelsContext context, int orderId, int newStatus) => {
    var order = await context.Orders
        .Include(o => o.OrderItems)
        .FirstOrDefaultAsync(o => o.Id == orderId);
    if (order is null)
    {
        return Results.NotFound("Order not found");
    }

    if (!Enum.IsDefined(typeof(OrderStatus), newStatus))
    {
        return Results.BadRequest("Invalid status value");
    }

    order.Status = (OrderStatus)newStatus;
    await context.SaveChangesAsync();

    var orders = await context.Orders
        .Include(o => o.OrderItems)
        .OrderByDescending(o => o.Id)
        .ToListAsync();

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
}).RequireAuthorization("UserOrAdminPolicy");

app.Run();