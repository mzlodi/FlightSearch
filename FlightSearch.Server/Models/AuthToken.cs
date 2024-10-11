namespace FlightSearch.Server.Models
{
    public class AuthToken
    {
        public string TokenType { get; set; }
        public string AccessToken { get; set; }

        public AuthToken(string tokenType, string accessToken)
        {
            TokenType = tokenType;
            AccessToken = accessToken;
        }
    }
}
