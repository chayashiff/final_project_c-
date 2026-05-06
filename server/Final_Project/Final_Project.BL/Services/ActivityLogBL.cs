using Final_Project.BL.Api;
using Final_Project.BL.Models;
using Final_Project.Dal.Servises;

namespace Final_Project.BL.Services
{
    public class ActivityLogBL : IActivityLogBL
    {
        private readonly ActivityLogService _activityLogService = new ActivityLogService();

        public void LogAction(int userId, string action, string? ipAddress)
        {
            _activityLogService.LogAction(userId, action, ipAddress);
        }

        public List<ActivityLogModel> GetAllLogs()
        {
            var logs = _activityLogService.GetAllLogs();
            return logs.Select(l => new ActivityLogModel
            {
                LogId = l.LogId,
                UserId = l.UserId,
                FullName = l.User?.FullName ?? "לא ידוע",
                Action = l.Action,
                ActionDate = l.ActionDate,
                IpAddress = l.Ipaddress
            }).ToList();
        }
    }
}