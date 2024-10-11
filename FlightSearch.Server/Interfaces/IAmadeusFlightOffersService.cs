using FlightSearch.Server.Models;
using FlightSearch.Server.Models.Enums;
using Newtonsoft.Json.Linq;

namespace FlightSearch.Server.Interfaces
{
    public interface IAmadeusFlightOffersService
    {
        Task<List<FlightOffer>> GetFlightOffersAsync(string origin, string destination, string departureDate, string? returnDate, int passengers, Currency currency);
    }
}
