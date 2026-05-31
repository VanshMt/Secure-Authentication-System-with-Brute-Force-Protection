import { useEffect } from "react";
import API from "../services/api";

/**
 * Hook for automatic revoked-session detection via polling.
 * Polls the authenticated /auth/sessions endpoint every 15 seconds.
 * If the token is revoked/blacklisted, the API interceptor will handle the 401 response.
 * 
 * @param {number} intervalSeconds - Polling interval in seconds (default: 15)
 */
const useSessionPolling = (intervalSeconds = 15) => {
  useEffect(() => {
    // Only poll if user has a token
    const token = localStorage.getItem("token");
    if (!token) return;

    const checkSession = async () => {
      try {
        await API.get("/auth/sessions");
      } catch (error) {
        // 401 errors are handled by API interceptor (clears token & redirects to /login)
        // Other errors are logged but won't break the app
        console.debug("Session validation check failed:", error.response?.status);
      }
    };

    // Set up polling interval
    const interval = setInterval(checkSession, intervalSeconds * 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [intervalSeconds]);
};

export default useSessionPolling;
