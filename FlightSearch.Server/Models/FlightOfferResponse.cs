namespace FlightSearch.Server.Models
{
    public class FlightOfferResponse
    {
        public List<FlightOfferData> Data { get; set; }
    }

    public class FlightOfferData
    {
        public List<Itinerary> Itineraries { get; set; }
        public Price Price { get; set; }
        public List<TravelerPricing> TravelerPricings { get; set; }
    }

    public class Itinerary
    {
        public List<Segment> Segments { get; set; }
    }

    public class Segment
    {
        public Departure Departure { get; set; }
        public Arrival Arrival { get; set; }
        public int NumberOfStops { get; set; }
    }

    public class Departure
    {
        public string IataCode { get; set; }
        public DateTime At { get; set; }
    }

    public class Arrival
    {
        public string IataCode { get; set; }
        public DateTime At { get; set; }
    }

    public class Price
    {
        public string Currency { get; set; }
        public string Total { get; set; }
    }

    public class TravelerPricing
    {
        public string TravelerId { get; set; }
        public string FareOption { get; set; }
        public string TravelerType { get; set; }
        public Price Price { get; set; }
    }
}
