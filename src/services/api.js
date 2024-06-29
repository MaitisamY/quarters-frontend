import axios from 'axios'

// Axios instance with base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
});

// Error handling wrapper
const handleRequest = async (request) => {
    try {
        const response = await request;
        return response;
    } catch (error) {
        console.error('API request error:', error);
        throw error; 
    }
}

/* Centralized API calls for better reusability, maintainability and testability */

/* Get all users */
export const getAllUsers = async () => handleRequest(api.get('/users/all'));

/* Register new user */
export const registerUser = async (data) => handleRequest(api.post('/users/register', data));

/* Login user */
export const loginUser = async (data) => handleRequest(api.post('/users/login', data));

/* Send welcome email */
export const sendWelcomeEmail = async (data) => handleRequest(api.post('/users/welcome', data));

/* Send referral email */
export const sendReferralEmail = async (data) => handleRequest(api.post('/referrals/new', data));

/* Get referrals */
export const getReferrals = async () => handleRequest(api.get('/referrals/getReferrals'));



