using System;
using System.Collections.Generic;

namespace Final_Project.Dal.models;

public partial class ActivityLog
{
    public int LogId { get; set; }
    public int UserId { get; set; }
    public string Action { get; set; } = null!;
    public DateTime? ActionDate { get; set; }
    public string? Ipaddress { get; set; }
    public virtual User User { get; set; } = null!;
}