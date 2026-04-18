CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    PhoneNumber NVARCHAR(20),
    UserRole NVARCHAR(20) DEFAULT 'Customer'
);

CREATE TABLE Services (
    ServiceId INT PRIMARY KEY IDENTITY,
    ServiceName NVARCHAR(50) NOT NULL,
    Timetoservice INT NOT NULL,
    Price DECIMAL(10,2) NOT NULL
);

CREATE TABLE Appointments (
    AppointmentId INT PRIMARY KEY IDENTITY,
    UserId INT NOT NULL,
    ServiceId INT NOT NULL,
    AppointmentDate DATETIME NOT NULL,
    EndTime DATETIME NOT NULL,
    Status NVARCHAR(20) DEFAULT 'Scheduled',
    CONSTRAINT FK_Appointments_Users FOREIGN KEY (UserId) REFERENCES Users(UserId),
    CONSTRAINT FK_Appointments_Services FOREIGN KEY (ServiceId) REFERENCES Services(ServiceId)
);

CREATE TABLE Gallery (
    ImageId INT PRIMARY KEY IDENTITY,
    Title NVARCHAR(100),
    ImageUrl NVARCHAR(MAX) NOT NULL,
    Category NVARCHAR(50)
);

CREATE TABLE Products (
    ProductId INT PRIMARY KEY IDENTITY,
    ProductName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT DEFAULT 0,
    ImageUrl NVARCHAR(MAX)
);

CREATE TABLE ActivityLog (
    LogId INT PRIMARY KEY IDENTITY,
    UserId INT NOT NULL,
    Action NVARCHAR(MAX) NOT NULL,
    ActionDate DATETIME DEFAULT GETDATE(),
    IPAddress NVARCHAR(50),
    CONSTRAINT FK_Log_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
);