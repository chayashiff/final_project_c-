namespace Final_Project.Dal.Api
{
    public interface IStatistics
    {
        string GetMostPopularService();
        decimal GetTotalRevenue();
        int GetTotalUsers();
        int GetNewUsersThisMonth();
        int GetAppointmentsThisWeek();
    }
}