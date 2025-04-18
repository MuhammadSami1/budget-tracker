import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});


api.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response) {

            return Promise.reject({
                status: error.response.status,
                message: error.response.data.error || 'An error occurred'
            });
        } else if (error.request) {

            return Promise.reject({ message: 'No response from server' });
        } else {

            return Promise.reject({ message: error.message });
        }
    }
);

export const fetchTransactions = async () => {
    try {
        const response = await api.get('/transactions');
        return response.data;

    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};

export const addTransaction = async (transaction) => {
    try {
        const response = await api.post('/transactions', transaction);
        return response.data;
    } catch (error) {
        console.error('Error adding transaction:', error);
        throw error;
    }
};

export const deleteTransaction = async (id) => {
    try {
        await api.delete(`/transactions/${id}`);
    } catch (error) {
        console.error('Error deleting transaction:', error);
        throw error;
    }
};