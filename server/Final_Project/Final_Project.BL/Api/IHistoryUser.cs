using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Final_Project.BL.Models;
using Final_Project.Dal.Api;
using Final_Project.Dal.models;

namespace Final_Project.BL.Api
{
    public interface IHistoryUser
    {
        List<HistoryAppointments> GetUserHistory(int userId);
        List<HistoryAppointments> appointmentsHistoryBL(List<Appointment> appointments);
        bool DeleteAppointment(int userId, DateTime appointmentDate);
        bool UpdateAppointment(int userId, DateTime oldAppointmentDate,DateTime newAppointmentDate, int? newServiceId);
        List<HistoryAppointments> GetAllAppointments();
        List<User> GetAllUsers();
    }
}