CREATE TABLE Gallery (
    ImageId INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(100),
    ImageUrl NVARCHAR(MAX) NOT NULL,
    Category NVARCHAR(50) -- למשל: 'פאות כלה', 'פאות יומיום'
);