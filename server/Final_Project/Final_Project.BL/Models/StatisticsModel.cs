namespace Final_Project.BL.Models
{
    public class StatisticsModel
    {
        public string MostPopularService { get; set; }
        public decimal TotalRevenue { get; set; }
        public int TotalUsers { get; set; }
        public int NewUsersThisMonth { get; set; }
        public int AppointmentsThisWeek { get; set; }
    }
}