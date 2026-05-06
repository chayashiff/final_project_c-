using Final_Project.BL.Models;

namespace Final_Project.BL.Api
{
    public interface IActivityLogBL
    {
        void LogAction(int userId, string action, string? ipAddress);
        List<ActivityLogModel> GetAllLogs();
    }
}