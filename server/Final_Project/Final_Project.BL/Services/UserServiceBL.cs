using System;
using System.Collections.Generic;
using Final_Project.BL.Api;
using Final_Project.BL.Models;
using Final_Project.Dal.models;
using Final_Project.Dal.Servises;
using Microsoft.EntityFrameworkCore;

namespace Final_Project.BL.Services
{
    public class UserServiceBL : IHistoryUser
    {
        private readonly UserService _userServiceDal = new UserService();

        public List<HistoryAppointments> GetUserHistory(int userId)
        {
            var rawData = _userServiceDal.appointmentsHistory(userId);
            return ((IHistoryUser)this).appointmentsHistoryBL(rawData);
        }

        List<HistoryAppointments> IHistoryUser.appointmentsHistoryBL(
            List<Appointment> appointments)
        {
            var historyAppointments = new List<HistoryAppointments>();
            if (appointments == null) return historyAppointments;

            foreach (var appointment in appointments)
            {
                if (appointment == null) continue;

                var history = new HistoryAppointments
                {
                    userId = appointment.UserId,
                    fullName = appointment.User?.FullName ?? string.Empty,
                    phoneNumber = appointment.User?.PhoneNumber,
                    ServiceName = appointment.Service?.ServiceName ?? string.Empty,
                    Price = appointment.Service?.Price ?? 0m,
                    passedTime = (DateTime.Today - appointment.AppointmentDate.Date).Days,
                    AppointmentDate = appointment.AppointmentDate,
                    Status = appointment.Status
                };

                historyAppointments.Add(history);
            }

            return historyAppointments;
        }

        public bool DeleteAppointment(int userId, DateTime appointmentDate)
        {
            if (appointmentDate.Date < DateTime.Today)
                throw new Exception("לא ניתן למחוק תור שכבר עבר");

            return _userServiceDal.DeleteAppointment(userId, appointmentDate);
        }

        public bool UpdateAppointment(int userId, DateTime oldAppointmentDate,
                                      DateTime newAppointmentDate, int? newServiceId)
        {
            if (newAppointmentDate.Date < DateTime.Today)
                throw new Exception("לא ניתן לעדכן תור לתאריך שעבר");

            if (oldAppointmentDate.Date < DateTime.Today)
                throw new Exception("לא ניתן לעדכן תור שכבר עבר");

            return _userServiceDal.UpdateAppointment(userId, oldAppointmentDate,
                                                      newAppointmentDate, newServiceId);
        }

        public List<HistoryAppointments> GetAllAppointments()
        {
            using (var context = new dbmanager())
            {
                var appointments = context.Appointments
                    .Include(a => a.Service)
                    .Include(a => a.User)
                    .OrderByDescending(a => a.AppointmentDate)
                    .ToList();
                return ((IHistoryUser)this).appointmentsHistoryBL(appointments);
            }
        }

        public List<User> GetAllUsers()
        {
            using (var context = new dbmanager())
            {
                return context.Users.ToList();
            }
        }
    }
}