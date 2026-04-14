CREATE TABLE ActivityLog (
    LogId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    Action NVARCHAR(MAX) NOT NULL, -- למשל: "התחברות למערכת", "עדכון מחיר מוצר ID 5"
    ActionDate DATETIME DEFAULT GETDATE(),
    IPAddress NVARCHAR(50), -- לצרכי אבטחה
    
    CONSTRAINT FK_Log_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
);