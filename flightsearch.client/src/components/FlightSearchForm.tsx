import React, { useState } from 'react';
import { FlightSearchFilters } from '../interfaces/FlightSearchFilters';

interface FlightSearchFormProps {
    onSearch: (filters: FlightSearchFilters) => void;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({ onSearch }) => {
    const [formData, setFormData] = useState<FlightSearchFilters>({
        originAirport: '',
        destinationAirport: '',
        departureDate: '',
        returnDate: '',
        passengers: 1,
        currency: 'USD',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === 'passengers' ? Number(value) : value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Origin Airport (IATA):
                <input type="text" name="originAirport" value={formData.originAirport} onChange={handleInputChange} />
            </label>

            <label>Destination Airport (IATA):
                <input type="text" name="destinationAirport" value={formData.destinationAirport} onChange={handleInputChange} />
            </label>

            <label>Departure Date:
                <input type="date" name="departureDate" value={formData.departureDate} onChange={handleInputChange} />
            </label>

            <label>Return Date:
                <input type="date" name="returnDate" value={formData.returnDate} onChange={handleInputChange} />
            </label>

            <label>Passengers:
                <input type="number" name="passengers" min="1" value={formData.passengers} onChange={handleInputChange} />
            </label>

            <label>Currency:
                <select name="currency" value={formData.currency} onChange={handleInputChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="HRK">HRK</option>
                </select>
            </label>

            <button type="submit">Search Flights</button>
        </form>
    );
};

export default FlightSearchForm;