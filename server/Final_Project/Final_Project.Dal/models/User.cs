using System;
using System.Collections.Generic;

namespace Final_Project.Dal.models;

public partial class User
{
    public int UserId { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string? PhoneNumber { get; set; }
    public string? UserRole { get; set; }
    public virtual ICollection<ActivityLog> ActivityLogs { get; set; } = new List<ActivityLog>();
    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}