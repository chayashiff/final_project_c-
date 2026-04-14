CREATE TABLE Appointments (
    AppointmentId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    ServiceId INT NOT NULL,
    AppointmentDate DATETIME NOT NULL, -- תאריך ושעת התחלה
    EndTime DATETIME NOT NULL,         -- יחושב ע"י C# (התחלה + משך השירות)
    Status NVARCHAR(20) DEFAULT 'Scheduled', -- 'Scheduled', 'Completed', 'Cancelled'
    
    CONSTRAINT FK_Appointments_Users FOREIGN KEY (UserId) REFERENCES Users(UserId),
    CONSTRAINT FK_Appointments_Services FOREIGN KEY (ServiceId) REFERENCES Services(ServiceId)
);