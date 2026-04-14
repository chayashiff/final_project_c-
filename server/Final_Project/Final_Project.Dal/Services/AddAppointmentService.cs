using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Final_Project.Dal.Api;
using Final_Project.Dal.models;

namespace Final_Project.Dal.Servises
{
    public class AddAppointmentService : IAddAppointment
    {
        public List<Service> GetAllServices()
        {
            try
            {
                using (var context = new dbmanager())
                {
                    return context.Services.ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return new List<Service>();
            }
        }

        public int AddAppointment(Appointment appointment)
        {
            try
            {
                using (var context = new models.dbmanager())
                {
                    context.Appointments.Add(appointment);
                    context.SaveChanges();
                    return appointment.AppointmentId;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return -1;
            }
        }

        public bool IsSlotAvailable(DateTime date)
        {
            try
            {
                using (var context = new dbmanager())
                {
                    return !context.Appointments.Any(a => a.AppointmentDate.Date == date.Date&& a.AppointmentDate.Hour == date.Hour);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
        }
    }
}