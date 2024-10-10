import { Flight } from '../interfaces/Flight';
import { FlightSearchFilters } from '../interfaces/FlightSearchFilters';

const apiUrl = process.env.REACT_APP_API_URL as string;
//const apiKey = process.env.REACT_APP_API_KEY;
//const apiSecret = process.env.REACT_APP_API_SECRET;

export const FlightService = {
    async searchFlights(filters: FlightSearchFilters): Promise<Flight[]> {
        const response = await fetch(`${apiUrl}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filters),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch flights');
        }

        const data = await response.json();
        return data.flights as Flight[];
    }
};