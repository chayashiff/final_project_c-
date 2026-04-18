using Final_Project.BL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Final_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")] // ← רק Admin יכול לגשת!
    public class AdminController : ControllerBase
    {
        private readonly UserServiceBL _userService = new UserServiceBL();

        // GET api/admin/appointments — כל התורים
        [HttpGet("appointments")]
        public IActionResult GetAllAppointments()
        {
            try
            {
                var appointments = _userService.GetAllAppointments();
                return Ok(appointments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET api/admin/users — כל המשתמשים
        [HttpGet("users")]
        public IActionResult GetAllUsers()
        {
            try
            {
                var users = _userService.GetAllUsers();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}