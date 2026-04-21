import { AuthState } from "@/types/index";
import client from "@/utils/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Register with email
      register: async (fullName, email, password) => {
        set({ isLoading: true, error: null });

        try {
          const res = await client.post("/api/v1/auth/register", {
            fullName,
            email,
            password,
          });

          const data = res.data;

          set({
            isLoading: false,
            user: data.data?.user || null,
            requiresVerification: data.data?.requiresVerification || false,
          });

          return data;
        } catch (error: any) {
          const message =
            error.response?.data?.message || "Registration failed";

          // 🚨 Handle already verified case
          if (error.response?.status === 409) {
            set({
              isLoading: false,
              error: message,
            });
          } else {
            set({
              isLoading: false,
              error: message,
            });
          }

          throw error;
        }
      },

      // Verify OTP (sent to email)
      verifyOtp: async (email, otp) => {
        set({ isLoading: true, error: null });
        try {
          await client.post("/api/v1/auth/verify-otp", {
            email,
            otp,
          });

          set({
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          const message = error.response?.data?.message || "Invalid OTP";
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      // Login with email + password
      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const { data } = await client.post("/api/v1/auth/login", {
            email,
            password,
          });

          // ✅ Correct destructuring based on your backend response
          const { user, accessToken, refreshToken } = data?.data || data; // handle both possible structures

          if (!accessToken) {
            throw new Error("No access token received from server");
          }

          // ✅ Safe token storage
          await AsyncStorage.setItem("token", accessToken);

          // Optionally store refresh token too
          if (refreshToken) {
            await AsyncStorage.setItem("refreshToken", refreshToken);
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Invalid credentials";

          set({ isLoading: false, error: message });
          throw error; // Let SignIn screen catch it and show alert
        }
      },

      logout: async () => {
        try {
          await AsyncStorage.removeItem("token");
          // Optional: await client.post('/auth/logout');
        } catch (e) {
          console.warn("Failed to remove token");
        }

        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),

      // Restore user session on app start
      loadUser: async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        set({ isLoading: true });
        try {
          const { data } = await client.get("/auth/me");
          set({
            user: data.user || data,
            isAuthenticated: true,
          });
        } catch (error) {
          await AsyncStorage.removeItem("token");
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
    }),

    {
      name: "talklio-auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
