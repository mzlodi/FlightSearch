export interface FlightOffer {
    id: string;
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string | null;
    numberOfStopovers: number;
    numberOfPassengers: number;
    currency: string;
    totalPrice: number;
}