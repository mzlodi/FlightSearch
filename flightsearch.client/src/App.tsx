import React from 'react';
import FlightSearchPage from './pages/FlightSearchPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
    return (
        <div>
            <FlightSearchPage />
            <ToastContainer />
        </div>
    );
};

export default App;