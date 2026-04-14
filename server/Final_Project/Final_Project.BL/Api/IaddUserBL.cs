using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Final_Project.BL.Api
{
    public interface IaddUserBL
    {
        bool AddUser(string fullName, string email,string password, string? phoneNumber);
    }
}