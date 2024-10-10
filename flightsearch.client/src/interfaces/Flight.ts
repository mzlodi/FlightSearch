export interface Flight {
    id: string;
    originAirport: string;
    destinationAirport: string;
    date: string;
    stopovers: number;
    passengers: number;
    currency: string;
    totalPrice: number;
}