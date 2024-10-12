using FlightSearch.Server.Configurations;
using FlightSearch.Server.Interfaces;
using FlightSearch.Server.Models;
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

        public async Task<List<FlightOffer>> GetFlightOffersAsync(string origin, string destination, string departureDate, string? returnDate, int passengers, string currency)
        {
            var accessToken = await _authService.GetAuthTokenAsync();
            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue(accessToken.TokenType, accessToken.AccessToken);

            var queryBuilder = new StringBuilder($"?originLocationCode={origin}&destinationLocationCode={destination}&departureDate={departureDate}");

            if (!string.IsNullOrEmpty(returnDate))
            {
                queryBuilder.Append($"&returnDate={returnDate}");
            }

            queryBuilder.Append($"&adults={passengers}&currencyCode={currency}&max=10");

            var requestUrl = _config.ApiUrl + queryBuilder.ToString();

            var response = await _httpClient.GetAsync(requestUrl);
            response.EnsureSuccessStatusCode();

            var contentString = await response.Content.ReadAsStringAsync();

            var flightOfferResponse = JsonSerializer.Deserialize<FlightOfferResponse>(contentString, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            var flights = flightOfferResponse?.Data?.Select(MapToFlightOffer).ToList() ?? new List<FlightOffer>();

            return flights;
        }

        private FlightOffer MapToFlightOffer(FlightOfferData flightData) {
            var firstItinerary = flightData.Itineraries.FirstOrDefault();
            var segments = firstItinerary?.Segments;

            return new FlightOffer
            {
                Origin = segments.First().Departure.IataCode,
                Destination = segments.Last().Arrival.IataCode,
                DepartureDate = segments.First().Departure.At,
                ReturnDate = flightData.Itineraries.Count > 1 ? flightData.Itineraries.Last().Segments.First().Departure.At : null,
                NumberOfStopovers = segments.Count - 1,
                NumberOfPassengers = flightData.TravelerPricings.Count,
                Currency = flightData.Price.Currency,
                TotalPrice = decimal.Parse(flightData.Price.Total)
            };
        }
    }
}