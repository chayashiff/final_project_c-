using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Final_Project.BL.Models
{
    public class UpdateAppointmentRequest
    {
        public int UserId { get; set; }
        public DateTime OldAppointmentDate { get; set; }
        public DateTime NewAppointmentDate { get; set; }
        public int? NewServiceId { get; set; }
    }

    public class BookAppointmentRequest
    {
        public int UserId { get; set; }
        public int ServiceId { get; set; }
        public DateTime AppointmentDate { get; set; }
    }
}