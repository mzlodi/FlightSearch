using FlightSearch.Server.Models;

namespace FlightSearch.Server.Interfaces
{
    public interface IAmadeusAuthService
    {
        Task<AuthToken> GetAuthTokenAsync();
    }
}
