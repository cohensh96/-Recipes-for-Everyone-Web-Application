import axios from '../api/axios';
import useAuth from './useAuth';

/**
 * Custom hook for refreshing the authentication token.
 * Makes a request to the refresh endpoint and updates the authentication state with the new token.
 * @returns {Function} The refresh function.
 */
const useRefreshToken = () => {
    const { setAuth } = useAuth();

    /**
     * Refreshes the authentication token by making a request to the refresh endpoint.
     * Updates the authentication state with the new token.
     * @throws {Error} If an error occurs during the token refresh process.
     * @returns {string} The new access token.
     */
    const refresh = async () => {
        try {
            const response = await axios.get('/refresh', {
                withCredentials: true
            });
            setAuth(prev => ({
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }));
            return response.data.accessToken;
        } catch (err) {
            throw new Error("Please login in order to continue.");
        }
    };

    return refresh;
};

export default useRefreshToken;
