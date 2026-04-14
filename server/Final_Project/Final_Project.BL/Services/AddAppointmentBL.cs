using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Final_Project.BL.Api;
using Final_Project.Dal.models;
using Final_Project.Dal.Servises;

namespace Final_Project.BL.Services
{
    public class AddAppointmentBL : IAddAppointmentBL
    {
        private readonly AddAppointmentService _appointmentService;

        public AddAppointmentBL()
        {
            _appointmentService = new AddAppointmentService();
        }

        public List<Service> GetAllServices()
        {
            return _appointmentService.GetAllServices();
        }

        public bool AddAppointment(int userId, int serviceId, DateTime appointmentDate)
        {
            if (appointmentDate < DateTime.Now)
                throw new Exception("לא ניתן לקבוע תור בתאריך שעבר");

            if (!_appointmentService.IsSlotAvailable(appointmentDate))
                throw new Exception("השעה הזו כבר תפוסה");

            var services = _appointmentService.GetAllServices();
            var service = services.FirstOrDefault(s => s.ServiceId == serviceId);
            if (service == null)
                throw new Exception("סוג הטיפול לא נמצא");

            var appointment = new Appointment
            {
                UserId = userId,
                ServiceId = serviceId,
                AppointmentDate = appointmentDate,
                EndTime = appointmentDate.AddMinutes(service.Timetoservice),
                Status = "Scheduled"
            };

            int newId = _appointmentService.AddAppointment(appointment);
            return newId != -1;
        }
    }
}