using Final_Project.Dal.Api;
using Final_Project.Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Final_Project.Dal.Servises
{
    public class AddUserService : IAddUser
    {
        public User? GetUserByEmail(string email)
        {
            try
            {
                using (var context = new dbmanager())
                {
                    return context.Users.FirstOrDefault(u => u.Email == email);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }
        public int AddUser(User user)
        {
            try
            {
                using (var context = new dbmanager())
                {
                    context.Users.Add(user);
                    context.SaveChanges();
                    return user.UserId;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return -1;
            }
        }
    }
}
