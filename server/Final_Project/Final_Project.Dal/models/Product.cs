using System;
using System.Collections.Generic;

namespace Final_Project.Dal.models;

public partial class Product
{
    public int ProductId { get; set; }
    public string ProductName { get; set; } = null!;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int? StockQuantity { get; set; }
    public string? ImageUrl { get; set; }
}