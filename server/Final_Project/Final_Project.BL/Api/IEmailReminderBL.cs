namespace Final_Project.BL.Api
{
    public interface IEmailReminderBL
    {
        Task<int> SendTomorrowReminders();
        Task<bool> SendReminderEmail(
            string toEmail,
            string fullName,
            string serviceName,
            DateTime appointmentDate,
            int duration);
    }
}