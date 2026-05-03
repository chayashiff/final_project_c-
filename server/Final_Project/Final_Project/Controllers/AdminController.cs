using Final_Project.BL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Final_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly UserServiceBL _userService = new UserServiceBL();
        private readonly ServiceManagerBL _serviceManager = new ServiceManagerBL();
        private readonly ProductManagerBL _productManager = new ProductManagerBL();
        private readonly StatisticsBL _statisticsBL = new StatisticsBL();

        // ── משתמשים ──
        [HttpGet("users")]
        public IActionResult GetAllUsers()
        {
            try { return Ok(_userService.GetAllUsers()); }
            catch (Exception ex) { return StatusCode(500, ex.Message); }
        }

        // ── תורים ──
        [HttpGet("appointments")]
        public IActionResult GetAllAppointments()
        {
            try { return Ok(_userService.GetAllAppointments()); }
            catch (Exception ex) { return StatusCode(500, ex.Message); }
        }

        // ── שירותים ──
        [HttpGet("services")]
        public IActionResult GetAllServices()
        {
            try { return Ok(_serviceManager.GetAllServices()); }
            catch (Exception ex) { return StatusCode(500, ex.Message); }
        }

        [HttpPost("services")]
        public IActionResult AddService(string serviceName, int timetoservice, decimal price)
        {
            try
            {
                int newId = _serviceManager.AddService(serviceName, timetoservice, price);
                if (newId == -1) return BadRequest("לא ניתן להוסיף את השירות");
                return Ok("השירות נוסף בהצלחה!");
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpPut("services/{id}")]
        public IActionResult UpdateService(int id, string serviceName,
                                           int timetoservice, decimal price)
        {
            try
            {
                bool result = _serviceManager.UpdateService(id, serviceName, timetoservice, price);
                if (!result) return NotFound("השירות לא נמצא");
                return Ok("השירות עודכן בהצלחה!");
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpDelete("services/{id}")]
        public IActionResult DeleteService(int id)
        {
            try
            {
                bool result = _serviceManager.DeleteService(id);
                if (!result) return NotFound("השירות לא נמצא");
                return Ok("השירות נמחק בהצלחה!");
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        // ── מוצרים ──
        [HttpGet("products")]
        public IActionResult GetAllProducts()
        {
            try { return Ok(_productManager.GetAllProducts()); }
            catch (Exception ex) { return StatusCode(500, ex.Message); }
        }

        [HttpPost("products")]
        public IActionResult AddProduct(string productName, string? description,
                                        decimal price, int? stockQuantity, string? imageUrl)
        {
            try
            {
                int newId = _productManager.AddProduct(productName, description,
                                                        price, stockQuantity, imageUrl);
                if (newId == -1) return BadRequest("לא ניתן להוסיף את המוצר");
                return Ok("המוצר נוסף בהצלחה!");
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpPut("products/{id}")]
        public IActionResult UpdateProduct(int id, string productName, string? description,
                                           decimal price, int? stockQuantity, string? imageUrl)
        {
            try
            {
                bool result = _productManager.UpdateProduct(id, productName, description,
                                                             price, stockQuantity, imageUrl);
                if (!result) return NotFound("המוצר לא נמצא");
                return Ok("המוצר עודכן בהצלחה!");
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpDelete("products/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                bool result = _productManager.DeleteProduct(id);
                if (!result) return NotFound("המוצר לא נמצא");
                return Ok("המוצר נמחק בהצלחה!");
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        // ── סטטיסטיקות ──
        [HttpGet("statistics")]
        public IActionResult GetStatistics()
        {
            try { return Ok(_statisticsBL.GetStatistics()); }
            catch (Exception ex) { return StatusCode(500, ex.Message); }
        }
    }
}