import React from 'react';
import { Flight } from '../interfaces/Flight';
import '../styles/FlightTable.css';

interface FlightTableProps {
    flights: Flight[];
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
                    <th>Date</th>
                    <th>Stopovers</th>
                    <th>Passengers</th>
                    <th>Currency</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {flights.map(flight => (
                    <tr key={flight.id}>
                        <td>{flight.originAirport}</td>
                        <td>{flight.destinationAirport}</td>
                        <td>{flight.date}</td>
                        <td>{flight.stopovers}</td>
                        <td>{flight.passengers}</td>
                        <td>{flight.currency}</td>
                        <td>{flight.totalPrice}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FlightTable;