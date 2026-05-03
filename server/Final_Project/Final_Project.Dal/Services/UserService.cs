using Final_Project.Dal.Api;
using Final_Project.Dal.models;
using Microsoft.EntityFrameworkCore;

namespace Final_Project.Dal.Servises
{
    public class UserService : IUserHistory
    {
        public List<Appointment> appointmentsHistory(int userId)
        {
            using (var context = new dbmanager())
            {
                return context.Appointments
                    .Where(a => a.UserId == userId)
                    .Include(a => a.Service)  // ← שולף גם את השירות
                    .Include(a => a.User)     // ← שולף גם את המשתמש
                    .OrderByDescending(a => a.AppointmentDate)
                    .ToList();
            }
        }

        public bool DeleteAppointment(int userId, DateTime appointmentDate)
        {
            using (var context = new dbmanager())
            {
                var appointment = context.Appointments
                    .FirstOrDefault(a => a.UserId == userId
                        && a.AppointmentDate.Date == appointmentDate.Date);

                if (appointment == null)
                    return false;

                context.Appointments.Remove(appointment);
                context.SaveChanges();
                return true;
            }
        }
        
        public bool UpdateAppointment(int userId, DateTime oldAppointmentDate,
                                      DateTime newAppointmentDate, int? newServiceId)//עדכון תור קיים למשתמש
        {
            using (var context = new dbmanager())//פתיחת קונטקסט חדש
            {
                var appointment = context.Appointments//שליפת התור הקיים לפי מזהה המשתמש ותאריך התור הישן
                    .FirstOrDefault(a => a.UserId == userId
                        && a.AppointmentDate.Date == oldAppointmentDate.Date);

                if (appointment == null)
                    return false;

                var duration = appointment.EndTime - appointment.AppointmentDate;//חישוב משך התור הקיים
                appointment.AppointmentDate = newAppointmentDate;//עדכון תאריך התור
                appointment.EndTime = newAppointmentDate + duration;//עדכון זמן סיום התור

                if (newServiceId.HasValue)//אם יש שירות חדש לעדכון
                    appointment.ServiceId = newServiceId.Value;//עדכון מזהה השירות

                context.SaveChanges();//שמירת השינויים במסד הנתונים
                return true;
            }
        }
    }
}