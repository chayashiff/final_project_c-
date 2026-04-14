using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Final_Project.Dal.Api;
using Final_Project.Dal.models;

namespace Final_Project.Dal.Servises
{
    public class LoginService : ILogin
    {
        public User? GetUserByEmail(string email)
        {
            try
            {
                using (var context = new dbmanager())
                {
                    return context.Users
                        .FirstOrDefault(u => u.Email == email);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }
    }
}