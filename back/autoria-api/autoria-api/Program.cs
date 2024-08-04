using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Core.Interfaces;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Application.Services;
using Application.Model;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Core.Enums;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<Infrastructure.Data.AppDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(optins =>
{
	optins.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.Configure<AuthOption>(builder.Configuration.GetSection("AuthOption"));

builder.Services.AddSingleton<JWTtokenService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
     {
         var authOptions = builder.Configuration.GetSection("AuthOption").Get<AuthOption>();
         options.TokenValidationParameters = new TokenValidationParameters
         {
             ValidateIssuer = true,
             ValidateAudience = true,
             ValidateLifetime = true,
             ValidateIssuerSigningKey = true,
             ValidIssuer = authOptions.Issuer,
             ValidAudience = authOptions.Audience,
             IssuerSigningKey = authOptions.GetSymmetricSecurityKey(),
         };
     });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("User-Policy", policy => policy.RequireRole(UserRole.User.ToString()));
    options.AddPolicy("Admin-Policy", policy => policy.RequireRole(UserRole.Admin.ToString()));
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    // Додаємо підтримку JWT
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter into field the word 'Bearer' followed by a space and the JWT value.",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});


builder.Services.AddCors(p => p.AddPolicy("corspolicy", build =>
{
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddScoped<ICarRepository, CarRepository>();
builder.Services.AddScoped<ICarService, CarService>();
builder.Services.AddScoped<IuserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IEncryptionService, AesEncryptionService>();
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<INewsRepository, NewsRepository>();
builder.Services.AddScoped<IImageUploader, ImageUploader>();

var authOptionsConfiguration = builder.Configuration.GetSection("Auth");
builder.Services.Configure<AuthOption>(authOptionsConfiguration);
var SendGridOptionsConfiguration = builder.Configuration.GetSection("SendGridOptions");
builder.Services.Configure<SendGridOption>(SendGridOptionsConfiguration);
var AesEncryptionOptionsConfiguration = builder.Configuration.GetSection("AesEncryptionOptions");
builder.Services.Configure<AesEncryptionOption>(AesEncryptionOptionsConfiguration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Images")),
    RequestPath = "/Images"
});

app.UseCors("corspolicy");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
