using FlightSearch.Server.Configurations;
using FlightSearch.Server.Interfaces;
using FlightSearch.Server.Models;
using FlightSearch.Server.Models.Enums;
using Microsoft.Extensions.Options;
using System.Text;
using System.Text.Json;

namespace FlightSearch.Server.Services
{
    public class AmadeusFlightOffersService : IAmadeusFlightOffersService
    {
        private readonly IAmadeusAuthService _authService;
        private readonly HttpClient _httpClient;
        private readonly ApiConfig _config;

        public AmadeusFlightOffersService(IAmadeusAuthService authService, HttpClient httpClient, IOptions<ApiConfig> config)
        {
            _authService = authService;
            _httpClient = httpClient;
            _config = config.Value;
        }

        public async Task<List<FlightOffer>> GetFlightOffersAsync(string origin, string destination, string departureDate, string? returnDate, int passengers, Currency currency)
        {
            var accessToken = await _authService.GetAuthTokenAsync();
            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue(accessToken.TokenType, accessToken.AccessToken);

            var queryBuilder = new StringBuilder($"?originLocationCode={origin}&destinationLocationCode={destination}&departureDate={departureDate}");

            if (!string.IsNullOrEmpty(returnDate))
            {
                queryBuilder.Append($"&returnDate={returnDate}");
            }

            queryBuilder.Append($"&adults={passengers}&currencyCode={currency}&max=1");

            var requestUrl = _config.ApiUrl + queryBuilder.ToString();

            var response = await _httpClient.GetAsync(requestUrl);
            response.EnsureSuccessStatusCode();

            var contentString = await response.Content.ReadAsStringAsync();

            Console.WriteLine(contentString);

            var flightOfferResponse = JsonSerializer.Deserialize<FlightOfferResponse>(contentString, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return flightOfferResponse?.Data?.Select(MapToFlightOffer).ToList() ?? new List<FlightOffer>();
        }

        private FlightOffer MapToFlightOffer(dynamic flightData) {
            var firstItinerary = flightData.Itineraries[0];
            var firstSegment = firstItinerary?.Segments[0];

            return new FlightOffer
            {
                Origin = firstSegment?.Departure.IataCode,
                Destination = firstSegment?.Arrival.IataCode,
                DepartureDate = firstSegment?.Departure.At,
                ReturnDate = firstSegment?.Arrival.At,
                NumberOfStopovers = firstSegment?.NumberOfStops ?? 0,
                NumberOfPassengers = flightData.TravelerPricings.Count,
                Currency = (Currency)Enum.Parse(typeof(Currency), flightData.Price.Currency),
                TotalPrice = decimal.Parse(flightData.Price.Total)
            };
        }
    }
}