using System;
using System.Collections.Generic;

namespace Final_Project.Dal.models;

public partial class Appointment
{
    public int AppointmentId { get; set; }
    public int UserId { get; set; }
    public int ServiceId { get; set; }
    public DateTime AppointmentDate { get; set; }
    public DateTime EndTime { get; set; }
    public string? Status { get; set; }
    public virtual Service Service { get; set; } = null!;
    public virtual User User { get; set; } = null!;
}