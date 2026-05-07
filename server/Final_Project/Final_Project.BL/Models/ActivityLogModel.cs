namespace Final_Project.BL.Models
{
    public class ActivityLogModel
    {
        public int LogId { get; set; }
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public string? IpAddress { get; set; }
    }
}