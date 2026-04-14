using Final_Project.BL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Final_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddUserController : ControllerBase
    {
        private readonly AddUserBL _addUserBL;

        public AddUserController()
        {
            _addUserBL = new AddUserBL();
        }

    [HttpPost("register")]
    public IActionResult Register(string fullName, string email,
                                      string password, string? phoneNumber)
    {
         try
         {
                bool result = _addUserBL.AddUser(fullName, email,
                                                  password, phoneNumber);
                if (result)
                    return Ok("המשתמש נוסף בהצלחה!");
                else
                    return BadRequest("המשתמש כבר קיים במערכת!");
         }
         catch (Exception ex)
         {
                return StatusCode(500, ex.Message);
         }
    }
    }
}