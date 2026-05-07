using Final_Project.Dal.models;

namespace Final_Project.Dal.Api
{
    public interface ITodayAppointments
    {
        List<Appointment> GetTodayAppointments();
    }
}