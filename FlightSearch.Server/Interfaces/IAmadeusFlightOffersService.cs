using FlightSearch.Server.Models;

namespace FlightSearch.Server.Interfaces
{
    public interface IAmadeusFlightOffersService
    {
        Task<List<FlightOffer>> GetFlightOffersAsync(string origin, string destination, string departureDate, string? returnDate, int passengers, string currency);
    }
}
