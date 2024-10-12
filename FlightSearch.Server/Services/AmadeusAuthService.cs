using FlightSearch.Server.Configurations;
using FlightSearch.Server.Interfaces;
using FlightSearch.Server.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;

namespace FlightSearch.Server.Services
{
    public class AmadeusAuthService : IAmadeusAuthService
    {
        private readonly ApiConfig _config;
        private readonly HttpClient _httpClient;

        public AmadeusAuthService(IOptions<ApiConfig> config, HttpClient httpClient)
        {
            _config = config.Value;
            _httpClient = httpClient;
        }

        public async Task<AuthToken> GetAuthTokenAsync()
        {
            var content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "client_credentials"),
                new KeyValuePair<string, string>("client_id", _config.ClientId),
                new KeyValuePair<string, string>("client_secret", _config.ClientSecret)
            });

            var response = await _httpClient.PostAsync(_config.AuthUrl, content);
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();
            var jsonResponse = JObject.Parse(responseBody);

            var token_type = jsonResponse["token_type"]!.ToString();
            var access_token = jsonResponse["access_token"]!.ToString();

            return new AuthToken(token_type, access_token);
        }
    }
}
