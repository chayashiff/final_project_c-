namespace Final_Project.BL.Models
{
    public class TodayAppointmentModel
    {
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string ServiceName { get; set; }
        public DateTime AppointmentDate { get; set; }
        public DateTime EndTime { get; set; }
        public string? Status { get; set; }
    }
}