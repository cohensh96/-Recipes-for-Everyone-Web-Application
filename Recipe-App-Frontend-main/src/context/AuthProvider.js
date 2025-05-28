import { createContext, useState } from "react";

// Create an empty AuthContext object
const AuthContext = createContext({});

/**
 * Provides authentication context to the application.
 * Manages the authentication state and persistence.
 *
 * @param {Object} props - The properties of the component.
 * @param {ReactNode} props.children - The child components to be wrapped by the AuthProvider.
 * @returns {ReactNode} The AuthProvider component.
 */
export const AuthProvider = ({ children }) => {
  // Define state variables for authentication and persistence
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

  return (
    // Provide the authentication context value to child components
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;