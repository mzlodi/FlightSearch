﻿using FlightSearch.Server.Interfaces;
using FlightSearch.Server.Models;
using FlightSearch.Server.Models.Enums;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public async Task<IActionResult> GetFlightOffers(string origin, string destination, string departureDate, string? returnDate, int passengers, Currency currency)
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
