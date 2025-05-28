import axios from 'axios';

// The base URL for the API
const BASE_URL = "https://recipes-for-everyone-backend.onrender.com";
// You can also use a local URL for development purposes
 //const BASE_URL = 'http://localhost:3500';

/**
 * Creates an instance of axios with the base URL.
 * This instance can be used for making API requests.
 */
export default axios.create({
    baseURL: BASE_URL
});

/**
 * Creates a separate instance of axios with the base URL and additional configuration.
 * This instance is intended for making private API requests that require authentication.
 */
export const axoisPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});
