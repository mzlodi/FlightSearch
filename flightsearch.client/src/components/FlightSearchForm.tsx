import React, { useState } from 'react';
import { FlightSearchFilters } from '../interfaces/FlightSearchFilters';
import '../styles/FlightSearchPage.css';

interface FlightSearchFormProps {
    onSearch: (filters: FlightSearchFilters) => void;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({ onSearch }) => {
    const [formData, setFormData] = useState<FlightSearchFilters>({
        origin: '',
        destination: '',
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
                <input type="text" name="origin" value={formData.origin} onChange={handleInputChange} required minLength={3} maxLength={3} />
            </label>

            <label>Destination Airport (IATA):
                <input type="text" name="destination" value={formData.destination} onChange={handleInputChange} required minLength={3} maxLength={3} />
            </label>

            <label>Departure Date:
                <input type="date" name="departureDate" value={formData.departureDate} onChange={handleInputChange} required />
            </label>

            <label>Return Date:
                <input type="date" name="returnDate" value={formData.returnDate} onChange={handleInputChange} />
            </label>

            <label>Passengers:
                <input type="number" name="passengers" min="1" max="9" value={formData.passengers} onChange={handleInputChange} required />
            </label>

            <label>Currency:
                <select name="currency" value={formData.currency} onChange={handleInputChange} required >
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