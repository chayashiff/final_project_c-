using System;
using System.Collections.Generic;

namespace Final_Project.Dal.models;

public partial class Service
{
    public int ServiceId { get; set; }
    public string ServiceName { get; set; } = null!;
    public int Timetoservice { get; set; }
    public decimal Price { get; set; }
    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}