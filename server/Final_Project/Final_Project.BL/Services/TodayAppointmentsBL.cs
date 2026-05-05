using Final_Project.BL.Api;
using Final_Project.BL.Models;
using Final_Project.Dal.Servises;

namespace Final_Project.BL.Services
{
    public class TodayAppointmentsBL : ITodayAppointmentsBL
    {
        private readonly TodayAppointmentsService _todayService = new TodayAppointmentsService();

        public List<TodayAppointmentModel> GetTodayAppointments()
        {
            var appointments = _todayService.GetTodayAppointments();
            return appointments.Select(a => new TodayAppointmentModel
            {
                FullName = a.User?.FullName ?? "לא ידוע",
                PhoneNumber = a.User?.PhoneNumber ?? "",
                ServiceName = a.Service?.ServiceName ?? "",
                AppointmentDate = a.AppointmentDate,
                EndTime = a.EndTime,
                Status = a.Status
            }).ToList();
        }
    }
}