export interface FlightSearchFilters {
    originAirport: string;
    destinationAirport: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    currency: 'USD' | 'EUR' | 'HRK';
}