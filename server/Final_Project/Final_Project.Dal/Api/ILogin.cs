using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Final_Project.Dal.models;

namespace Final_Project.Dal.Api
{
    public interface ILogin
    {
        User? GetUserByEmail(string email);
    }
}