using Final_Project.BL.Models;
using Final_Project.BL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Final_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly UserServiceBL _userService = new UserServiceBL();

        // GET api/appointment/history/{userId}
        [HttpGet("history/{userId}")]
        public IActionResult GetHistory(int userId)
        {
            try
            {
                var history = _userService.GetUserHistory(userId);
                if (history == null)
                    return NotFound("לא נמצאה היסטוריה למשתמש זה");
                return Ok(history);
            }
            catch (Exception ex)
            {
                return BadRequest("שגיאה: " + ex.Message);
            }
        }

        // DELETE api/appointment/delete
        [HttpDelete("delete")]
        public IActionResult DeleteAppointment(int userId, DateTime appointmentDate)
        {
            try
            {
                var result = _userService.DeleteAppointment(userId, appointmentDate);
                if (!result)
                    return NotFound("לא נמצא תור למחיקה");
                return Ok("התור נמחק בהצלחה");
            }
            catch (Exception ex)
            {
                return BadRequest("שגיאה: " + ex.Message);
            }
        }

        // PUT api/appointment/update
        [HttpPut("update")]
        public IActionResult UpdateAppointment(
            [FromBody] UpdateAppointmentRequest request)
        {
            try
            {
                if (request == null)
                    return BadRequest("Invalid request");

                var success = _userService.UpdateAppointment(
                    request.UserId,
                    request.OldAppointmentDate,
                    request.NewAppointmentDate,
                    request.NewServiceId);

                if (!success)
                    return NotFound("לא נמצא תור לעדכון");

                return Ok("התור עודכן בהצלחה");
            }
            catch (Exception ex)
            {
                return BadRequest("שגיאה: " + ex.Message);
            }
        }
    }
}