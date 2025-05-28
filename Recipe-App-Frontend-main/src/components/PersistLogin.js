import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Represents the component responsible for persisting login information and managing authentication state.
 * @returns {JSX.Element} The PersistLogin component.
 */
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    /**
     * Verifies the refresh token to maintain user authentication.
     */
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    if (!auth?.accessToken && persist) {
      toast.promise(verifyRefreshToken(), {
        pending: {
          render() {
            return "Loading your data";
          },
          icon: false,
        },
        success: {
          render() {
            return `${auth.accessToken ? "Information updated" : "Welcome to the Website"}`;
          },
          icon: "🟢",
        }
      });
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <ToastContainer />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
