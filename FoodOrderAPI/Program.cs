using System.Net;
using FoodOrderAPI.DatabaseContext;
using FoodOrderAPI.DatabaseContext.Models.Products;
using FoodOrderAPI.DatabaseContext.Models.Users;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ModelsContext>();

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
    .AddEntityFrameworkStores<ModelsContext>();

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAll", builder => 
//         builder.AllowAnyOrigin()
//                .AllowAnyMethod()
//                .AllowAnyHeader());
// });

// builder.Services.AddCors(options =>
//         {
//             options.AddPolicy("AllowSpecificOrigin",
//                 builder =>
//                 {
//                     builder.AllowAnyOrigin()
//                            .AllowAnyHeader()
//                            .AllowAnyMethod();
//                 });
//         });

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

app.Run();