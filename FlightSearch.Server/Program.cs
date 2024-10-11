using FlightSearch.Server.Configurations;
using FlightSearch.Server.Interfaces;
using FlightSearch.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<ApiConfig>(builder.Configuration.GetSection("AmadeusAPI"));

builder.Services.AddHttpClient();

builder.Services.AddScoped<IAmadeusAuthService, AmadeusAuthService>();
builder.Services.AddScoped<IAmadeusFlightOffersService, AmadeusFlightOffersService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
