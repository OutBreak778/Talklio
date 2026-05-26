import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 30000,
  withCredentials: true,
});

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// Request interceptor
client.interceptors.request.use(
  async (config) => {
    try {
      let token = await AsyncStorage.getItem("token");

      // Check if token is expired before making request
      const tokenExpiry = await AsyncStorage.getItem("tokenExpiry");
      if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
        console.log("Token expired, attempting refresh...");

        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const response = await axios.post(
              `${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/auth/refresh-token`,
              { refreshToken },
            );

            token =
              response.data?.data?.accessToken || response.data?.accessToken;
            if (token) {
              await AsyncStorage.setItem("token", token);

              // Update expiry
              try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                if (payload.exp) {
                  await AsyncStorage.setItem(
                    "tokenExpiry",
                    (payload.exp * 1000).toString(),
                  );
                }
              } catch (e) {}
            }
          } catch (refreshError) {
            console.log("Refresh failed, clearing tokens");
            await AsyncStorage.multiRemove([
              "token",
              "refreshToken",
              "tokenExpiry",
            ]);
            return Promise.reject(refreshError);
          }
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("Failed to get token from storage:", error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If not 401 or already retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve) => {
        addRefreshSubscriber((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(client(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("No refresh token");
      }

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/auth/refresh-token`,
        { refreshToken },
      );

      const newToken =
        response.data?.data?.accessToken || response.data?.accessToken;

      if (!newToken) {
        throw new Error("No token in refresh response");
      }

      // Save new token
      await AsyncStorage.setItem("token", newToken);

      // Update expiry
      try {
        const payload = JSON.parse(atob(newToken.split(".")[1]));
        if (payload.exp) {
          await AsyncStorage.setItem(
            "tokenExpiry",
            (payload.exp * 1000).toString(),
          );
        }
      } catch (e) {}

      // Update authorization header
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      // Process queued requests
      onTokenRefreshed(newToken);

      return client(originalRequest);
    } catch (refreshError) {
      // Refresh failed - clear everything and logout
      await AsyncStorage.multiRemove(["token", "refreshToken", "tokenExpiry"]);
      onTokenRefreshed("");
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default client;
