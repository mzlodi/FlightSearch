using FlightSearch.Server.Interfaces;
using FlightSearch.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlightSearch.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : ControllerBase
    {
        private readonly IAmadeusAuthService _authService;

        public AuthController(IAmadeusAuthService authService)
        {
            _authService = authService;
        }

        [HttpGet("auth")]
        public async Task<IActionResult> GetAccessToken()
        {
            try
            {
                AuthToken token = await _authService.GetAuthTokenAsync();

                return Ok(token);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
