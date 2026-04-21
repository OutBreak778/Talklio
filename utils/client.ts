import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 30000,
  withCredentials: true,
});

client.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.warn("Failed to get token from storage:", error);
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default client;
