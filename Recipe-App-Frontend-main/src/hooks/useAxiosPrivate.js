import { axoisPrivate } from '../api/axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

/**
 * Custom hook for making private API requests using Axios with authentication.
 * It adds authentication headers to the requests and handles token refreshing.
 * 
 * @returns {Object} An Axios instance with authentication and token refreshing capabilities.
 */
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axoisPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = axoisPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          try {
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axoisPrivate(prevRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      // Cleanup by ejecting the interceptors
      axoisPrivate.interceptors.request.eject(requestInterceptor);
      axoisPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axoisPrivate;
};

export default useAxiosPrivate;
