namespace FlightSearch.Server.Models
{
    public class FlightOffer
    {
        public string Origin { get; set; }
        public string Destination { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int NumberOfStopovers { get; set; }
        public int NumberOfPassengers { get; set; }
        public string Currency { get; set; }
        public decimal TotalPrice { get; set; }
    }
}