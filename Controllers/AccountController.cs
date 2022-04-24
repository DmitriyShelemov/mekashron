using logintestserver.Models;
using logintestserver.WebServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace logintestserver.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;

        public AccountController(ILogger<AccountController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.UserName))
                return BadRequest("Username is not defined");

            try
            {
                var soapClient = new RestApiClient("https://isapi.icu-tech.com/icutech-test.dll/soap/IICUTech");
                var loggedIn = await soapClient.LoginAsync(model.UserName, model.Password);
                return Ok(loggedIn);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogError(ex.ToString());
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return BadRequest("Unexpected message");
            }
        }
    }
}
