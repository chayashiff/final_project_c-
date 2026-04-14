CREATE TABLE Products (
    ProductId INT PRIMARY KEY IDENTITY(1,1),
    ProductName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT DEFAULT 0,
    ImageUrl NVARCHAR(MAX) -- נתיב לתמונה
);