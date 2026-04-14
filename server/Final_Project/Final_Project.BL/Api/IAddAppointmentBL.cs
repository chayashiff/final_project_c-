using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Final_Project.Dal.models;
namespace Final_Project.BL.Api
{
    public interface IAddAppointmentBL
    {
        List<Service> GetAllServices();
        bool AddAppointment(int userId, int serviceId, DateTime appointmentDate);
    }
}