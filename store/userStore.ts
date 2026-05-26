import { UserStore } from "@/types/user";
import client from "@/utils/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      loading: false,
      error: null,

      fetchAllUsers: async (search = "", page = 1, limit = 20) => {
        set({ loading: true, error: null });

        try {
          const token = await AsyncStorage.getItem("token");

          if (!token) {
            throw new Error(
              "No authentication token found. Please login again.",
            );
          }

          const response = await client.get("/api/v1/user/all", {
            params: { search, page, limit },
          });

          const result = response.data;

          if (result.success && result.data?.users) {
            const formattedUsers = result.data.users.map((user: any) => ({
              id: user._id,
              _id: user._id,
              name: user.fullName || "Unknown User",
              message: "Tap to start chatting",
              time: user.lastActive
                ? new Date(user.lastActive).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Recently",
              unread: 0,
              src:
                user.avatar ||
                "https://res.cloudinary.com/dbyqlpgav/image/upload/v1752840682/qvur50ixqx0sphodevx5.jpg",
              isOnline: user.status === "online",
              lastActive: user.lastActive,
              email: user.email,
              isFavourite: user.isFavourite || false,
              isArchived: user.isArchived || false,
              type: user.type || "direct",
            }));

            set({ users: formattedUsers, loading: false });
          } else {
            set({
              users: [],
              error: result.message || "No users found",
              loading: false,
            });
          }
        } catch (error: any) {
          console.error(
            "❌ Fetch users error:",
            error.response?.data || error.message,
          );

          // Handle 401 specifically
          if (error.response?.status === 401) {
            // Clear token and logout
            await AsyncStorage.removeItem("token");
            // Redirect to login using your navigation method
            // router.replace("/(auth)/sign-in");

            set({
              error: "Session expired. Please login again.",
              loading: false,
            });
          } else {
            set({
              error: error.response?.data?.message || "Failed to load users",
              loading: false,
            });
          }
        }
      },

      setUsers: (users) => set({ users }),
      clearUsers: () => set({ users: [], error: null }),
      resetError: () => set({ error: null }),
    }),

    {
      name: "talklio-user-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ users: state.users }),
    },
  ),
);
