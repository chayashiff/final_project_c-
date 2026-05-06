using Final_Project.Dal.Api;
using Final_Project.Dal.models;
using Microsoft.EntityFrameworkCore;

namespace Final_Project.Dal.Servises
{
    public class TodayAppointmentsService : ITodayAppointments
    {
        public List<Appointment> GetTodayAppointments()
        {
            try
            {
                using (var context = new dbmanager())
                {
                    var today = DateTime.Today;
                    return context.Appointments
                        .Where(a => a.AppointmentDate.Date == today)
                        .Include(a => a.User)
                        .Include(a => a.Service)
                        .OrderBy(a => a.AppointmentDate)
                        .ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return new List<Appointment>();
            }
        }
    }
}