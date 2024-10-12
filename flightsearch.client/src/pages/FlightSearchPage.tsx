import React, { useState } from 'react';
import FlightSearchForm from '../components/FlightSearchForm';
import FlightTable from '../components/FlightTable';
import { FlightSearchFilters } from '../interfaces/FlightSearchFilters';
import { useFlightOffers } from '../hooks/useApi';
import '../styles/FlightSearchPage.css';

const FlightSearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useState<FlightSearchFilters>({
        origin: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        passengers: 1,
        currency: 'EUR',
    });

    const [triggerSearch, setTriggerSearch] = useState(false);

    const { flightOffers, loading, error } = useFlightOffers(searchParams, triggerSearch);

    const handleSearch = (filters: FlightSearchFilters) => {
        setSearchParams(filters);
        setTriggerSearch(true);
    };

    return (
        <div className="container">
            <h1>Low-Cost Flight Search</h1>
            <FlightSearchForm onSearch={handleSearch} />
            {loading && <p className="loading">Loading flights...</p>}
            {error && <p className="error-message">{error}</p>}
            {flightOffers.length > 0 && <FlightTable flights={flightOffers} />}
        </div>
    );
};

export default FlightSearchPage;