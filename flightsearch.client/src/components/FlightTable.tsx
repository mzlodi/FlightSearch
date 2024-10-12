import React from 'react';
import { FlightOffer } from '../interfaces/FlightOffer';
import '../styles/FlightTable.css';

interface FlightTableProps {
    flights: FlightOffer[];
}

const FlightTable: React.FC<FlightTableProps> = ({ flights }) => {
    if (flights.length === 0) {
        return <p>No flights found. Try changing the filters.</p>;
    }

    return (
        <table className="flights-table">
            <thead>
                <tr>
                    <th>Origin Airport</th>
                    <th>Destination Airport</th>
                    <th>Departure Date</th>
                    <th>Return Date</th>
                    <th>Stopovers</th>
                    <th>Passengers</th>
                    <th>Currency</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {flights.map(flight => (
                    <tr key={flight.id}>
                        <td>{flight.origin}</td>
                        <td>{flight.destination}</td>
                        <td>{flight.departureDate}</td>
                        <td>{flight.returnDate}</td>
                        <td>{flight.numberOfStopovers}</td>
                        <td>{flight.numberOfPassengers}</td>
                        <td>{flight.currency}</td>
                        <td>{flight.totalPrice}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FlightTable;