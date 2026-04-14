CREATE TABLE Services (
    ServiceId INT PRIMARY KEY IDENTITY(1,1),
    ServiceName NVARCHAR(50) NOT NULL, -- 'חפיפה', 'צביעה', 'סירוק', 'קנייה'
    Timetoservice INT NOT NULL,      -- משך זמן בדקות (למשל: 30, 60, 120)
    Price DECIMAL(10, 2) NOT NULL
);  