using Final_Project.Dal.Api;
using Final_Project.Dal.models;
using Microsoft.Extensions.Logging;

namespace Final_Project.Dal.Servises
{
    public class ActivityLogService : IActivityLog
    {
        private readonly ILogger<ActivityLogService> _logger;

        public ActivityLogService()
        {
            _logger = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            }).CreateLogger<ActivityLogService>();
        }

        public void LogAction(int userId, string action, string? ipAddress)
        {
            try
            {
                using (var context = new dbmanager())
                {
                    var log = new ActivityLog
                    {
                        UserId = userId,
                        Action = action,
                        ActionDate = DateTime.Now,
                        Ipaddress = ipAddress
                    };
                    context.ActivityLogs.Add(log);
                    context.SaveChanges();
                    _logger.LogInformation("פעולה תועדה: {Action} למשתמש {UserId}", action, userId);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בשמירת לוג למשתמש {UserId}", userId);
            }
        }

        public List<ActivityLog> GetAllLogs()
        {
            try
            {
                using (var context = new dbmanager())
                {
                    return context.ActivityLogs
                        .OrderByDescending(l => l.ActionDate)
                        .ToList();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "שגיאה בשליפת לוגים");
                return new List<ActivityLog>();
            }
        }
    }
}