using Final_Project.BL.Api;
using Final_Project.BL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Final_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReminderController : ControllerBase
    {
        private readonly IEmailReminderBL _reminderBL;

        public ReminderController()
        {
            _reminderBL = new EmailReminderBL();
        }

        // POST api/reminder/send
        [HttpPost("send")]
        public async Task<IActionResult> SendReminders()
        {
            try
            {
                int sent = await _reminderBL.SendTomorrowReminders();
                return Ok(new
                {
                    message = $"נשלחו {sent} תזכורות בהצלחה! 📧",
                    count = sent
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST api/reminder/test
        [HttpPost("test")]
        public async Task<IActionResult> SendTest(string email)
        {
            try
            {
                bool result = await _reminderBL.SendReminderEmail(
                    email,
                    "לקוחה לדוגמה",
                    "סירוק",
                    DateTime.Now.AddDays(1),
                    30
                );

                if (result)
                    return Ok("מייל בדיקה נשלח! 📧");
                else
                    return BadRequest("שגיאה בשליחת המייל");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}