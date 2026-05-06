var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:3002",
            "http://localhost:5173"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReact");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// תזכורות אוטומטיות כל יום בשעה 18:00
var reminderTimer = new System.Timers.Timer();
reminderTimer.Interval = TimeSpan.FromMinutes(30).TotalMilliseconds;
reminderTimer.AutoReset = true;
reminderTimer.Elapsed += async (sender, e) =>
{
    if (DateTime.Now.Hour == 18 && DateTime.Now.Minute < 30)
    {
        var reminder = new Final_Project.BL.Services.EmailReminderBL();
        int sent = await reminder.SendTomorrowReminders();
        Console.WriteLine($"✅ נשלחו {sent} תזכורות בשעה {DateTime.Now}");
    }
};
reminderTimer.Start();

app.Run();