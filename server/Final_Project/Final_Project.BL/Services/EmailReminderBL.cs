using System.Net.Mail;
using Final_Project.BL.Api;
using Final_Project.Dal.Api;
using Final_Project.Dal.Servises;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Final_Project.BL.Services
{
    public class EmailReminderBL : IEmailReminderBL
    {
        private readonly IReminder _reminderService;
        private readonly string _apiKey;
        private readonly string _fromEmail;
        private readonly string _fromName;

        public EmailReminderBL()
        {
            _reminderService = new ReminderService();

            var config = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();

            _apiKey = config["SendGrid:ApiKey"]!;
            _fromEmail = config["SendGrid:FromEmail"]!;
            _fromName = config["SendGrid:FromName"]!;
        }

        public async Task<int> SendTomorrowReminders()
        {
            var appointments = _reminderService.GetTomorrowAppointments();
            int sent = 0;

            foreach (var appointment in appointments)
            {
                if (string.IsNullOrEmpty(appointment.User?.Email))
                    continue;

                bool success = await SendReminderEmail(
                    toEmail: appointment.User.Email,
                    fullName: appointment.User.FullName,
                    serviceName: appointment.Service?.ServiceName ?? "",
                    appointmentDate: appointment.AppointmentDate,
                    duration: appointment.Service?.Timetoservice ?? 0
                );

                if (success) sent++;
            }

            return sent;
        }

        public async Task<bool> SendReminderEmail(
            string toEmail,
            string fullName,
            string serviceName,
            DateTime appointmentDate,
            int duration)
        {
            try
            {
                var client = new SendGridClient(_apiKey);
                var from = new EmailAddress(_fromEmail, _fromName);
                var to = new EmailAddress(toEmail, fullName);
                var subject = "✨ תזכורת לתור מחר — תמי נחמד";

                var timeStr = appointmentDate.ToString("HH:mm");
                var dateStr = appointmentDate.ToString("dd/MM/yyyy");

                var htmlContent = $@"
                <!DOCTYPE html>
                <html dir='rtl' lang='he'>
                <head><meta charset='UTF-8'></head>
                <body style='font-family:Arial,sans-serif;
                             background:#f5f5f5;
                             margin:0; padding:20px;'>
                    <div style='max-width:600px; margin:0 auto;
                                background:white; border-radius:20px;
                                overflow:hidden;
                                box-shadow:0 4px 24px rgba(0,0,0,0.1);'>

                        <!-- Header -->
                        <div style='background:linear-gradient(135deg,#E8B4B8,#D4939A);
                                    padding:40px; text-align:center;'>
                            <div style='color:rgba(45,63,80,0.4);
                                        font-size:20px;
                                        letter-spacing:4px;
                                        margin-bottom:12px;'>
                                ((( )))
                            </div>
                            <h1 style='color:#2D3F50; margin:0;
                                       font-size:26px; letter-spacing:2px;'>
                                TAMI (N)ECHMAD
                            </h1>
                            <p style='color:white; margin:8px 0 0 0;
                                      font-size:14px;'>
                                פאה בקו אישי
                            </p>
                        </div>

                        <!-- Content -->
                        <div style='padding:40px;'>
                            <h2 style='color:#2D3F50; font-size:22px;'>
                                שלום {fullName}! 👋
                            </h2>
                            <p style='color:#555; font-size:16px;
                                      line-height:1.6;'>
                                רצינו להזכיר לך שיש לך תור מחר אצלנו.<br/>
                                מחכות לראותך! 💕
                            </p>

                            <!-- פרטי תור -->
                            <div style='background:#FDF6F7;
                                        border-right:4px solid #D4939A;
                                        border-radius:12px;
                                        padding:24px; margin:24px 0;'>
                                <p style='color:#D4939A; font-weight:bold;
                                          margin:0 0 16px 0;'>
                                    📅 פרטי התור שלך
                                </p>
                                <table style='width:100%;
                                              border-collapse:collapse;'>
                                    <tr style='border-bottom:1px solid #F2C9CC;'>
                                        <td style='padding:10px 0; color:#888;
                                                   width:40%;'>
                                            📅 תאריך
                                        </td>
                                        <td style='padding:10px 0;
                                                   color:#2D3F50;
                                                   font-weight:bold;'>
                                            {dateStr}
                                        </td>
                                    </tr>
                                    <tr style='border-bottom:1px solid #F2C9CC;'>
                                        <td style='padding:10px 0; color:#888;'>
                                            🕐 שעה
                                        </td>
                                        <td style='padding:10px 0;
                                                   color:#2D3F50;
                                                   font-weight:bold;'>
                                            {timeStr}
                                        </td>
                                    </tr>
                                    <tr style='border-bottom:1px solid #F2C9CC;'>
                                        <td style='padding:10px 0; color:#888;'>
                                            💇‍♀️ שירות
                                        </td>
                                        <td style='padding:10px 0;
                                                   color:#2D3F50;
                                                   font-weight:bold;'>
                                            {serviceName}
                                        </td>
                                    </tr>
                                    <tr style='border-bottom:1px solid #F2C9CC;'>
                                        <td style='padding:10px 0; color:#888;'>
                                            ⏱️ משך
                                        </td>
                                        <td style='padding:10px 0;
                                                   color:#2D3F50;
                                                   font-weight:bold;'>
                                            {duration} דקות
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style='padding:10px 0; color:#888;'>
                                            📍 כתובת
                                        </td>
                                        <td style='padding:10px 0;
                                                   color:#2D3F50;
                                                   font-weight:bold;'>
                                            עזרא 7/1, רחובות
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <p style='color:#555; font-size:14px;
                                      text-align:center;'>
                                צריכה לשנות או לבטל? צרי קשר:
                            </p>

                            <!-- כפתורים -->
                            <div style='text-align:center; margin:20px 0;'>
                                <a href='https://wa.me/972548421934'
                                   style='display:inline-block;
                                          padding:12px 24px;
                                          background:#25D366;
                                          color:white;
                                          text-decoration:none;
                                          border-radius:25px;
                                          font-weight:bold;
                                          font-size:14px;
                                          margin:4px;'>
                                    💬 וואטסאפ
                                </a>
                                <a href='tel:0548421934'
                                   style='display:inline-block;
                                          padding:12px 24px;
                                          background:#D4939A;
                                          color:white;
                                          text-decoration:none;
                                          border-radius:25px;
                                          font-weight:bold;
                                          font-size:14px;
                                          margin:4px;'>
                                    📞 התקשרי
                                </a>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div style='background:#2D3F50;
                                    padding:24px; text-align:center;'>
                            <p style='color:#E8B4B8;
                                      font-size:14px; margin:4px 0;'>
                                קו ישיר בשבילך
                            </p>
                            <p style='color:white; font-size:16px;
                                      font-weight:bold; margin:8px 0;'>
                                054.842.1934
                            </p>
                            <p style='color:#E8B4B8;
                                      font-size:13px; margin:4px 0;'>
                                עזרא 7/1, רחובות
                            </p>
                            <p style='color:rgba(232,180,184,0.5);
                                      font-size:12px; margin-top:12px;'>
                                תתחדיש בקו אייש 😊
                            </p>
                        </div>
                    </div>
                </body>
                </html>";

                var msg = MailHelper.CreateSingleEmail(
                    from, to, subject, "", htmlContent
                );

                var response = await client.SendEmailAsync(msg);
                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
        }
    }
}