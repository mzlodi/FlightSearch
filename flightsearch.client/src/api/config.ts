import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
    baseURL: 'https://localhost:7025',
    timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            toast.error(`Error: ${error.response.data.message || "Something went wrong!"}`);
        } else if (error.request) {
            toast.error('Error: No response received from the server.');
        } else {
            toast.error(`Error: ${error.message}`);
        }
        return Promise.reject(error);
    }
);

export default apiClient;