import React, { useState } from 'react';
import FlightSearchForm from '../components/FlightSearchForm';
import FlightTable from '../components/FlightTable';
import { Flight } from '../interfaces/Flight';
import { FlightSearchFilters } from '../interfaces/FlightSearchFilters';
import { FlightService } from '../services/FlightService';
import '../styles/FlightSearchPage.css';

const FlightSearchPage: React.FC = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (searchFilters: FlightSearchFilters) => {
        setLoading(true);
        setError(null);

        try {
            const fetchedFlights = await FlightService.searchFlights(searchFilters);
            setFlights(fetchedFlights);
        } catch (error) {
            setError('Error fetching flights: ' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Low-Cost Flight Search</h1>
            <FlightSearchForm onSearch={handleSearch} />
            {loading && <p className="loading">Loading flights...</p>}
            {error && <p className="error-message">{error}</p>}
            {flights.length > 0 && <FlightTable flights={flights} />}
        </div>
    );
};

export default FlightSearchPage;