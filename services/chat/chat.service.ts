import client from "@/utils/client";

interface StartConversationResponse {
  conversationId: string;
  roomId: string;
  participants: string[];
  type: string;
}

export interface Conversation {
  _id: string;
  type: string;
  participants: any[];
  lastMessage: any;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
}

// services/chat/chat.service.ts
class ChatService {
  private BASE_URL = "/api/v1/chat";

  async startConversation(
    participantId: string,
  ): Promise<StartConversationResponse> {
    try {
      console.log("🚀 Starting conversation with participant:", participantId);

      const response = await client.post(`${this.BASE_URL}/start`, {
        participantId,
      });

      console.log("✅ API Response:", response.data);

      // Handle different response structures
      if (response.data && response.data.data) {
        return {
          conversationId: response.data.data.conversationId,
          roomId: response.data.data.roomId,
          participants: response.data.data.participants,
          type: response.data.data.type,
        };
      } else if (response.data && response.data.conversationId) {
        return {
          conversationId: response.data.conversationId,
          roomId: response.data.roomId,
          participants: response.data.participants,
          type: response.data.type,
        };
      } else {
        throw new Error("Invalid response structure from server");
      }
    } catch (error: any) {
      console.error(
        "❌ Start conversation error:",
        error.response?.data || error.message,
      );

      // If duplicate key error, try to fetch existing conversation
      if (
        error.response?.data?.message?.includes("duplicate key") ||
        error.code === 11000
      ) {
        console.log("Duplicate detected, fetching existing conversation...");
      }

      throw new Error(
        error.response?.data?.message || "Failed to start conversation",
      );
    }
  }
}

export default new ChatService();
