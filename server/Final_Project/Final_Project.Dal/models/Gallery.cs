using System;
using System.Collections.Generic;

namespace Final_Project.Dal.models;

public partial class Gallery
{
    public int ImageId { get; set; }
    public string? Title { get; set; }
    public string ImageUrl { get; set; } = null!;
    public string? Category { get; set; }
}