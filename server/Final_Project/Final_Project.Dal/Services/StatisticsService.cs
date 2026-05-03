using Final_Project.Dal.Api;
using Final_Project.Dal.models;

namespace Final_Project.Dal.Servises
{
    public class StatisticsService : IStatistics
    {
        public string GetMostPopularService()
        {
            try
            {
                using (var context = new dbmanager())
                {
                    var mostPopular = context.Appointments
                        .GroupBy(a => a.ServiceId)
                        .OrderByDescending(g => g.Count())
                        .Select(g => g.Key)
                        .FirstOrDefault();

                    if (mostPopular == 0) return "אין נתונים";

                    var service = context.Services
                        .FirstOrDefault(s => s.ServiceId == mostPopular);

                    return service?.ServiceName ?? "אין נתונים";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return "שגיאה";
            }
        }

        public decimal GetTotalRevenue()
        {
            try
            {
                using (var context = new dbmanager())
                {
                    return context.Appointments
                        .Where(a => a.Status == "Scheduled")
                        .Join(context.Services,
                            a => a.ServiceId,
                            s => s.ServiceId,
                            (a, s) => s.Price)
                        .Sum();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return 0;
            }
        }

        public int GetTotalUsers()
        {
            try
            {
                using (var context = new dbmanager())
                {
                    return context.Users.Count();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return 0;
            }
        }

        public int GetNewUsersThisMonth()
        {
            try
            {
                using (var context = new dbmanager())
                {
                    // מכיוון שאין CreatedAt בטבלה, נשתמש ב ActivityLog
                    var firstOfMonth = new DateTime(DateTime.Today.Year,
                                                    DateTime.Today.Month, 1);
                    return context.ActivityLogs
                        .Where(a => a.Action == "Register"
                                && a.ActionDate >= firstOfMonth)
                        .Count();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return 0;
            }
        }

        public int GetAppointmentsThisWeek()
        {
            try
            {
                using (var context = new dbmanager())
                {
                    var today = DateTime.Today;
                    var endOfWeek = today.AddDays(7);
                    return context.Appointments
                        .Where(a => a.AppointmentDate >= today
                                && a.AppointmentDate <= endOfWeek)
                        .Count();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return 0;
            }
        }
    }
}