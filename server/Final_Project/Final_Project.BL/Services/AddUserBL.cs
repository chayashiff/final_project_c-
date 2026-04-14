using Final_Project.BL.Api;
using Final_Project.Dal.models;
using Final_Project.Dal.Servises;

namespace Final_Project.BL.Services
{
    public class AddUserBL : IaddUserBL
    {
        private readonly AddUserService _addUserService;

        public AddUserBL()
        {
            _addUserService = new AddUserService();
        }

        public bool AddUser(string fullName, string email,
                            string password, string? phoneNumber)
        {
            var existingUser = _addUserService.GetUserByEmail(email);
            if (existingUser != null)
                return false;

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

            var newUser = new User
            {
                FullName = fullName,
                Email = email,
                PasswordHash = hashedPassword,
                PhoneNumber = phoneNumber,
                UserRole = "Customer"
            };

            int newId = _addUserService.AddUser(newUser);
            return newId != -1;
        }
    }
}