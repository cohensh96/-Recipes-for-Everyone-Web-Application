import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

/**
 * Custom hook for accessing the authentication context.
 * Provides access to the authentication state and debug value.
 *
 * @returns {Object} The authentication context.
 */
const useAuth = () => {
  // Get the authentication context from the AuthContext
  const { auth } = useContext(AuthContext);

  // Set the debug value for the authentication state
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));

  return useContext(AuthContext);
};

export default useAuth;