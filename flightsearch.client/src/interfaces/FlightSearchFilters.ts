export interface FlightSearchFilters {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    currency: 'USD' | 'EUR' | 'HRK';
}