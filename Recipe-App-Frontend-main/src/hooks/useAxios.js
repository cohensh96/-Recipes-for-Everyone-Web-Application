import { useState, useEffect } from "react";

/**
 * Custom hook for making HTTP requests using Axios.
 * It takes a configuration object and returns the response, error, loading state,
 * and a function to refetch the data.
 *
 * @param {Object} configObj - Configuration object for the Axios request.
 * @param {Object} configObj.axiosInstance - Axios instance to use for the request.
 * @param {string} configObj.method - HTTP method for the request (e.g., 'GET', 'POST').
 * @param {string} configObj.url - URL for the request.
 * @param {Object} [configObj.requestConfig] - Additional configuration for the request.
 * @returns {Array} An array containing the response, error, loading state, and refetch function.
 */
const useAxios = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  /**
   * Function to refetch the data by incrementing the reload state.
   */
  const refetch = () => setReload((prev) => prev + 1);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });

        setResponse(res.data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();

    // Clean up the effect by aborting the request if the component unmounts
    return () => controller.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return [response, error, loading, refetch];
};

export default useAxios;
