using FlightSearch.Server.Interfaces;
using FlightSearch.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace FlightSearch.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class FlightOfferController : ControllerBase
    {
        private readonly IAmadeusAuthService _authService;
        private readonly IAmadeusFlightOffersService _flightOffersService;

        public FlightOfferController(IAmadeusAuthService authService, IAmadeusFlightOffersService flightOffersService)
        {
            _authService = authService;
            _flightOffersService = flightOffersService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetFlightOffers(
            [FromQuery, Required] string origin,
            [FromQuery, Required] string destination,
            [FromQuery, Required] string departureDate,
            [FromQuery] string? returnDate,
            [FromQuery, Required, Range(1, 9)] int passengers,
            [FromQuery, Required] string currency
            )
        {
            try
            {
                AuthToken token = await _authService.GetAuthTokenAsync();

                var flightOffers = await _flightOffersService.GetFlightOffersAsync(origin, destination, departureDate, returnDate, passengers, currency);

                return Ok(flightOffers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
