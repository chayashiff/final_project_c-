using Final_Project.Dal.Api;
using Final_Project.Dal.models;
using Microsoft.EntityFrameworkCore;

namespace Final_Project.Dal.Servises
{
    public class ReminderService : IReminder
    {
        public List<Appointment> GetTomorrowAppointments()
        {
            try
            {
                using (var context = new dbmanager())
                {
                    var tomorrow = DateTime.Today.AddDays(1);
                    return context.Appointments
                        .Where(a => a.AppointmentDate.Date == tomorrow.Date
                               && a.Status == "Scheduled")
                        .Include(a => a.User)
                        .Include(a => a.Service)
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