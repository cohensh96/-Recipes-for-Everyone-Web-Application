import axios from "../api/axios";
import useAuth from "./useAuth";

/**
 * Custom hook for logging out the user.
 * Clears the authentication state and sends a request to the logout endpoint.
 * @returns {Function} The logout function.
 */
const useLogout = () => {
    const { setAuth } = useAuth();

    /**
     * Logs out the user by clearing the authentication state and making a request to the logout endpoint.
     * @throws {Error} If an error occurs during the logout process.
     */
    const logout = async () => {
        setAuth({}); // Clear the authentication state
        try {
            const response = await axios('/logout', {
                withCredentials: true
            });
            console.log("Logout successful:", response.data);
        } catch (err) {
            console.error("Logout error:", err.message);
            throw new Error("Failed to logout. Please try again.");
        }
    };

    return logout;
};

export default useLogout;
