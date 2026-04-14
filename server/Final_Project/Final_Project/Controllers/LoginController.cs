using Final_Project.BL.Api;
using Final_Project.BL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Final_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginBL _loginBL;

        public LoginController()
        {
            _loginBL = new LoginBL();
        }

        [HttpPost]
        public IActionResult Login(string email, string password)
        {
            try
            {
                string? token = _loginBL.Login(email, password);

                if (token == null)
                    return Unauthorized("אימייל או סיסמה שגויים!");

                return Ok(new { token = token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}