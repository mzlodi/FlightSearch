import React, { useState } from 'react';
import { FlightOffer } from '../interfaces/FlightOffer';
import '../styles/FlightTable.css';

interface FlightTableProps {
    flights: FlightOffer[];
}

const FlightTable: React.FC<FlightTableProps> = ({ flights }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    if (flights.length === 0) {
        return <p>No flights found. Try changing the filters.</p>;
    }

    const totalPages = Math.ceil(flights.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFlights = flights.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'N/A';
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleString('en-GB', options);
    };

    return (
        <div>
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
                    {currentFlights.map(flight => (
                        <tr key={flight.id}>
                            <td>{flight.origin}</td>
                            <td>{flight.destination}</td>
                            <td>{formatDate(flight.departureDate)}</td>
                            <td>{formatDate(flight.returnDate)}</td>
                            <td>{flight.numberOfStopovers}</td>
                            <td>{flight.numberOfPassengers}</td>
                            <td>{flight.currency}</td>
                            <td>{flight.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={handleFirstPage}
                    disabled={currentPage === 1}
                    className="arrow-button"
                >
                    First Page
                </button>
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="arrow-button"
                >
                    &lt; Previous
                </button>
                <span className="page-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="arrow-button"
                >
                    Next &gt;
                </button>
                <button
                    onClick={handleLastPage}
                    disabled={currentPage === totalPages}
                    className="arrow-button"
                >
                    Last Page
                </button>
            </div>
        </div>
    );
};

export default FlightTable;