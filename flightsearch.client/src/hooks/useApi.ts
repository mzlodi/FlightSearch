import { Api } from '../api/api';
import { useEffect, useState } from 'react';
import { FlightOffer } from '../interfaces/FlightOffer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = new Api();

export const useFlightOffers = (params: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string | undefined;
    passengers: number;
    currency: string;
},
    triggerSearch: boolean,
    setFlightOffers: React.Dispatch<React.SetStateAction<FlightOffer[]>>
) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!triggerSearch) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.api.searchList(params);
                const responseBody = await response.json();

                const data: FlightOffer[] = responseBody as FlightOffer[];

                if (data) {
                    setFlightOffers(data);
                } else {
                    toast.warn("No flight offers found in the response.");
                    setFlightOffers([]);
                }
            } catch (err) {
                toast.error(`Error fetching flight offers: ${(err as Error).message}`);
                setError((err as Error).message);
            } finally {
                setLoading(false);
                triggerSearch = false;
            }
        };

        fetchData();
    }, [params, triggerSearch, setFlightOffers]);

    return { loading, error };
};