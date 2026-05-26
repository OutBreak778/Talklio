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
      tokenExpiryCheck: null,

      register: async (fullName, email, password) => {
        set({ isLoading: true, error: null });

        try {
          const res = await client.post("/api/v1/auth/register", {
            fullName,
            email,
            password,
          });

          const data = res.data;

          // Check if registration returns token (auto-login)
          const accessToken = data?.data?.accessToken || data?.accessToken;
          if (accessToken) {
            await AsyncStorage.setItem("token", accessToken);

            // Store refresh token if exists
            const refreshToken = data?.data?.refreshToken || data?.refreshToken;
            if (refreshToken) {
              await AsyncStorage.setItem("refreshToken", refreshToken);
            }

            set({
              isLoading: false,
              user: data.data?.user || data?.user || null,
              isAuthenticated: true,
              requiresVerification: false,
            });
          } else {
            set({
              isLoading: false,
              user: data.data?.user || null,
              requiresVerification: data.data?.requiresVerification || false,
              isAuthenticated: false,
            });
          }

          return data;
        } catch (error: any) {
          const message =
            error.response?.data?.message || "Registration failed";
          set({
            isLoading: false,
            error: message,
          });
          throw error;
        }
      },

      verifyOtp: async (email, otp) => {
        set({ isLoading: true, error: null });
        try {
          const response = await client.post("/api/v1/auth/verify-otp", {
            email,
            otp,
          });

          const data = response.data;

          // ✅ IMPORTANT: Save token after OTP verification
          const accessToken = data?.data?.accessToken || data?.accessToken;
          if (accessToken) {
            await AsyncStorage.setItem("token", accessToken);

            // Store refresh token if exists
            const refreshToken = data?.data?.refreshToken || data?.refreshToken;
            if (refreshToken) {
              await AsyncStorage.setItem("refreshToken", refreshToken);
            }

            set({
              isAuthenticated: true,
              isLoading: false,
              error: null,
              user: data?.data?.user || data?.user || null,
            });
          } else {
            set({
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          }
        } catch (error: any) {
          const message = error.response?.data?.message || "Invalid OTP";
          set({ isLoading: false, error: message });
          throw error;
        }
      },

      // In useAuthStore - Update login function
      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const { data } = await client.post("/api/v1/auth/login", {
            email,
            password,
          });

          // Handle different response structures
          const user = data?.data?.user || data?.user;
          const accessToken =
            data?.data?.accessToken || data?.accessToken || data?.token;
          const refreshToken = data?.data?.refreshToken || data?.refreshToken;

          if (!accessToken) {
            throw new Error("No access token received from server");
          }

          // Save tokens
          await AsyncStorage.setItem("token", accessToken);

          if (refreshToken) {
            await AsyncStorage.setItem("refreshToken", refreshToken);
          }

          // Calculate and store token expiry
          if (data?.data?.expiresIn) {
            const expiryTime = Date.now() + data.data.expiresIn * 1000;
            await AsyncStorage.setItem("tokenExpiry", expiryTime.toString());
          } else {
            // Try to decode JWT to get expiry
            try {
              const payload = JSON.parse(atob(accessToken.split(".")[1]));
              if (payload.exp) {
                await AsyncStorage.setItem(
                  "tokenExpiry",
                  (payload.exp * 1000).toString(),
                );
              }
            } catch (e) {
              console.log("Could not decode token expiry");
            }
          }

          // Verify token was saved
          const savedToken = await AsyncStorage.getItem("token");
          if (!savedToken) {
            throw new Error("Failed to save token");
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // Don't return anything - just void
          return; // ✅ This matches Promise<void>
        } catch (error: any) {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Invalid credentials";
          set({ isLoading: false, error: message });
          throw error; // This will be caught by the SignIn screen
        }
      },

      logout: async () => {
        try {
          // Clear all auth-related data
          await AsyncStorage.multiRemove([
            "token",
            "refreshToken",
            "tokenExpiry",
            "talklio-auth-storage",
            "talklio-user-storage",
          ]);

          // Optional: Call logout endpoint if exists
          // await client.post('/api/v1/auth/logout').catch(console.error);
        } catch (e) {
          console.warn("Failed to clear auth data:", e);
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
        if (!token) {
          set({ isLoading: false });
          return;
        }

        // Check if token is expired
        const tokenExpiry = await AsyncStorage.getItem("tokenExpiry");
        if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
          console.log("Token expired, clearing session");
          await get().logout();
          set({ isLoading: false });
          return;
        }

        set({ isLoading: true });
        try {
          const { data } = await client.get("/api/v1/auth/me");
          set({
            user: data.user || data,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          console.error("Failed to load user:", error.response?.status);

          // If 401, token is invalid
          if (error.response?.status === 401) {
            await AsyncStorage.multiRemove([
              "token",
              "refreshToken",
              "tokenExpiry",
            ]);
            set({ user: null, isAuthenticated: false });
          }
          set({ isLoading: false });
        }
      },

      // Helper method to check if token is valid
      isTokenValid: async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) return false;

        const tokenExpiry = await AsyncStorage.getItem("tokenExpiry");
        if (tokenExpiry) {
          return Date.now() < parseInt(tokenExpiry);
        }

        // Try to decode JWT
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload.exp) {
            return Date.now() < payload.exp * 1000;
          }
        } catch (e) {}

        return true;
      },

      // Refresh token manually
      refreshAuthToken: async () => {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        try {
          const response = await client.post("/api/v1/auth/refresh-token", {
            refreshToken,
          });

          const newAccessToken =
            response.data?.data?.accessToken || response.data?.accessToken;
          if (newAccessToken) {
            await AsyncStorage.setItem("token", newAccessToken);
            return newAccessToken;
          }
          throw new Error("No token in refresh response");
        } catch (error) {
          await get().logout();
          throw error;
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
