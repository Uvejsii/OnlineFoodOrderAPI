using FoodOrderAPI.DatabaseContext;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ModelsContext>();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/getAllFoodProducts", async (ModelsContext context) => {
    return Results.Ok(await context.Foods.ToListAsync());
});

app.MapGet("/getAllDrinkProducts", async (ModelsContext context) => {
    return Results.Ok(await context.Drinks.ToListAsync());
});

app.Run();
