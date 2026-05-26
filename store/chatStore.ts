import chatService from "@/services/chat/chat.service";
import {
  connectSocket,
  isSocketConnected,
  joinChatRoom,
  leaveChatRoom,
} from "@/socket/socket";
import { ChatState } from "@/types/chat";
import { create } from "zustand";

export const useChatStore = create<ChatState>((set, get) => ({
  activeChat: null,
  isConnecting: false,
  isConnected: false,
  error: null,

  // Initialize chat room only
  initializeChat: async (
    participantId,
    participantName,
    participantImage,
    isOnline,
  ) => {
    const { activeChat, clearActiveChat } = get();

    // If already in this chat, don't reinitialize
    if (activeChat?.participantId === participantId) {
      console.log("Already in this chat room:", activeChat.roomId);
      return;
    }

    // Clear previous chat if exists
    if (activeChat) {
      clearActiveChat();
    }

    set({ isConnecting: true, error: null });

    try {
      // 1. Ensure socket is connected
      await connectSocket();
      const isConnected = isSocketConnected();
      set({ isConnected });

      console.log("🔌 Socket connected:", isConnected);

      // 2. Start conversation via API to get room ID
      const result = await chatService.startConversation(participantId);
      const { roomId, conversationId } = result;

      console.log(
        "📡 Starting conversation - Room ID:",
        roomId,
        "Conversation ID:",
        conversationId,
      );

      // 3. Join socket room
      if (roomId && isConnected) {
        joinChatRoom(roomId);
        console.log("✅ Joined socket room:", roomId);
      } else if (roomId && !isConnected) {
        console.log("⚠️ Socket not connected, waiting for connection...");
        // Wait for socket connection and then join
        const waitForConnection = setInterval(() => {
          if (isSocketConnected()) {
            joinChatRoom(roomId);
            console.log("✅ Joined socket room after connection:", roomId);
            clearInterval(waitForConnection);
          }
        }, 500);

        // Timeout after 10 seconds
        setTimeout(() => clearInterval(waitForConnection), 10000);
      }

      // 4. Set active chat
      set({
        activeChat: {
          roomId,
          conversationId,
          participantId,
          participantName,
          participantImage,
          isOnline,
        },
        isConnecting: false,
      });

      console.log("🎉 Chat initialized successfully - Room:", roomId);
    } catch (error: any) {
      console.error("❌ Failed to initialize chat:", error);
      set({
        error: error.message || "Failed to initialize chat",
        isConnecting: false,
        activeChat: null,
      });
    }
  },

  // Clear active chat (leave room)
  clearActiveChat: () => {
    const { activeChat } = get();

    if (activeChat) {
      console.log("👋 Leaving chat room:", activeChat.roomId);
      leaveChatRoom(activeChat.roomId);
    }

    set({
      activeChat: null,
      error: null,
    });
  },
}));
