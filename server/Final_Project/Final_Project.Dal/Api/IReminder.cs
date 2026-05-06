using Final_Project.Dal.models;

namespace Final_Project.Dal.Api
{
    public interface IReminder
    {
        List<Appointment> GetTomorrowAppointments();
    }
}