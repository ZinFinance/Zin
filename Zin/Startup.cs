using System;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Zin.EmailManager;
using Zin.Repository;
using Zin.Repository.DbContext;
using Zin.Repository.Models;
using Zin.Services;

namespace Zin
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // add controllers
            services.AddControllers()
                .AddJsonOptions(x =>
                {
                    x.JsonSerializerOptions.IgnoreNullValues = true;
                });

            // add email manager
            services.AddEmailManager(x =>
            {
                x.Apikey = Configuration["EmailManager:Apikey"];
                x.From = Configuration["EmailManager:From"];
                x.DisplayName = Configuration["EmailManager:DisplayName"];
            });

            // add db context 
            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(Configuration["ConnectionStrings:SqlServer"],
                    x => x.MigrationsAssembly(nameof(Zin)));
                options.UseLazyLoadingProxies();
            });

            // add identity
            services.AddIdentity<AppUser, IdentityRole>(x =>
            {
                x.User.RequireUniqueEmail = true;
                x.SignIn.RequireConfirmedEmail = false;

                x.Password.RequiredLength = 5;
                x.Password.RequireNonAlphanumeric = false;
                x.Password.RequireUppercase = false;
                x.Password.RequireDigit = false;

                x.Lockout.MaxFailedAccessAttempts = 5;
                x.Lockout.AllowedForNewUsers = true;
                x.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
            })
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

            // add authentication
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Issuer"],
                    ClockSkew = TimeSpan.Zero,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            });

            //Add swagger
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1.0", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "Zin APIs",
                    Version = "v1.0",
                    Description = "Zin APIs",
                });
            });

            // add data protection
            services.AddDataProtection();

            // add services and repositories
            services.AddServices();
            services.AddRepositories();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // add default admin
            using (IServiceScope service = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var dbContext = service.ServiceProvider.GetRequiredService<AppDbContext>();
                if (!dbContext.Users.Where(x => x.IsAdmin).Any())
                {
                    var userManager = service.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                    userManager.CreateAsync(new AppUser
                    {
                        UserName = "admin",
                        Email = "adminzin@mailinator.com",
                        FirstName = "Admin",
                        LastName = "User",
                        IsAdmin = true,
                        EmailConfirmed = true
                    }, "ABcde@11").Wait();
                }
            }
            // end default admin

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(options => options.SwaggerEndpoint("/swagger/v1.0/swagger.json", "Zin APIs"));
        }
    }
}
