using Final_Project.BL.Models;
using Final_Project.BL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Final_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddAppointmentController : ControllerBase
    {
        private readonly AddAppointmentBL _appointmentBL = new AddAppointmentBL();

        // GET api/addappointment/services
        [HttpGet("services")]
        public IActionResult GetServices()
        {
            try
            {
                var services = _appointmentBL.GetAllServices();
                return Ok(services);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST api/addappointment/book
        [HttpPost("book")]
        public IActionResult BookAppointment(
            [FromBody] BookAppointmentRequest request)
        {
            try
            {
                if (request == null)
                    return BadRequest("Invalid request");

                bool result = _appointmentBL.AddAppointment(
                    request.UserId,
                    request.ServiceId,
                    request.AppointmentDate);

                if (result)
                    return Ok("התור נקבע בהצלחה!");
                else
                    return BadRequest("לא ניתן לקבוע את התור");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}