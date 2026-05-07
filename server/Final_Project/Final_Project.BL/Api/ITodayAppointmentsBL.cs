using Final_Project.BL.Models;

namespace Final_Project.BL.Api
{
    public interface ITodayAppointmentsBL
    {
        List<TodayAppointmentModel> GetTodayAppointments();
    }
}