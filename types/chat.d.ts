export interface ActiveChat {
  roomId: string;
  conversationId: string;
  participantId: string;
  participantName: string;
  participantImage: string;
  isOnline: boolean;
}

export interface ChatState {
  // State
  activeChat: ActiveChat | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;

  // Actions
  initializeChat: (
    participantId: string,
    participantName: string,
    participantImage: string,
    isOnline: boolean,
  ) => Promise<void>;
  clearActiveChat: () => void;
}
