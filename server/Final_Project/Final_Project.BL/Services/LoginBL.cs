using Final_Project.BL.Api;
using Final_Project.Dal.Servises;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Final_Project.BL.Services
{
    public class LoginBL : ILoginBL
    {
        private readonly LoginService _loginService;
        private readonly string SecretKey;
        private readonly ActivityLogBL _activityLog = new ActivityLogBL();

        public LoginBL()
        {
            _loginService = new LoginService();

            var config = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();

            SecretKey = config["Jwt:SecretKey"]!;
        }

       

        public string? Login(string email, string password)
        {
            try
            {
                var user = _loginService.GetUserByEmail(email);
                if (user == null)
                    return null;

                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
                if (!isPasswordValid)
                    return null;

                // ← תיעוד התחברות
                _activityLog.LogAction(user.UserId, "Login", null);

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(SecretKey);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                new Claim("userId", user.UserId.ToString()),
                new Claim("email", user.Email),
                new Claim("role", user.UserRole ?? "Customer"),
                new Claim("fullName", user.FullName)
            }),
                    Expires = DateTime.UtcNow.AddHours(24),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Login error: {ex.Message}");
                throw;
            }
        }
    }
}