using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Final_Project.Dal.models;
namespace Final_Project.Dal.Api
{
    public interface IUserHistory
    {
        List<Appointment> appointmentsHistory(int userId);
        bool DeleteAppointment(int userId, DateTime appointmentDate);
        bool UpdateAppointment(int userId, DateTime oldAppointmentDate,DateTime newAppointmentDate, int? newServiceId);
    }
}