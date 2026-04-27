using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

namespace Final_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BotController : ControllerBase
    {
        private readonly IConfiguration _config;

        public BotController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("ask")]
        public async Task<IActionResult> Ask([FromBody] BotRequest request)
        {
            try
            {
                var apiKey = _config["ApiSettings:ApiKey"];

                using var client = new HttpClient();

                var body = new
                {
                    contents = new[]
                    {
                        new
                        {
                            parts = new[]
                            {
                                new { text = "את עוזרת וירטואלית של מספרת פאות תמי נחמד. ענה רק על שאלות הקשורות לפאות, טיפול בשיער, המלצות ומחירים. ענה בעברית בלבד. אם שואלים שאלה שלא קשורה לפאות, הסבירי בנימוס שאת יכולה לעזור רק בנושאי פאות.\n\nשאלת המשתמש: " + request.Message }
                            }
                        }
                    }
                };

                var json = JsonSerializer.Serialize(body);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync(
                    $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={apiKey}",
                    content);

                var responseStr = await response.Content.ReadAsStringAsync();
                var parsed = JsonDocument.Parse(responseStr);

                if (parsed.RootElement.TryGetProperty("candidates", out var candidates))
                {
                    var text = candidates[0]
                        .GetProperty("content")
                        .GetProperty("parts")[0]
                        .GetProperty("text")
                        .GetString();
                    return Ok(new { reply = text });
                }
                else
                {
                    return StatusCode(500, responseStr);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }
    }

    public class BotRequest
    {
        public string Message { get; set; } = "";
    }
}