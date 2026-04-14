CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(MAX) NOT NULL, -- כאן נשמור סיסמה מוצפנת
    PhoneNumber NVARCHAR(20),
    UserRole NVARCHAR(20) DEFAULT 'Customer' -- 'Admin' או 'Customer'
);