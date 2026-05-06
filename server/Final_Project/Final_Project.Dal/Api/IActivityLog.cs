namespace Final_Project.Dal.Api
{
    public interface IActivityLog
    {
        void LogAction(int userId, string action, string? ipAddress);
        List<models.ActivityLog> GetAllLogs();
    }
}