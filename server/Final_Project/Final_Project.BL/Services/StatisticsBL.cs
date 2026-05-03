using Final_Project.BL.Api;
using Final_Project.BL.Models;
using Final_Project.Dal.Servises;

namespace Final_Project.BL.Services
{
    public class StatisticsBL : IStatisticsBL
    {
        private readonly StatisticsService _statisticsService = new StatisticsService();

        public StatisticsModel GetStatistics()
        {
            return new StatisticsModel
            {
                MostPopularService = _statisticsService.GetMostPopularService(),
                TotalRevenue = _statisticsService.GetTotalRevenue(),
                TotalUsers = _statisticsService.GetTotalUsers(),
                NewUsersThisMonth = _statisticsService.GetNewUsersThisMonth(),
                AppointmentsThisWeek = _statisticsService.GetAppointmentsThisWeek()
            };
        }
    }
}