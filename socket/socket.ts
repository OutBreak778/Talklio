import eventEmitter from "@/utils/event-emitter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";
import { EVENT_EMITTER } from "./constants/socketEvents";

let socket: Socket | null = null;
let currentRoomId: string | null = null;

export async function connectSocket(): Promise<Socket> {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("No Token Found");
  }

  if (!socket) {
    socket = io(process.env.EXPO_PUBLIC_BASE_URL, {
      auth: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    await new Promise((resolve) => {
      socket?.on(EVENT_EMITTER.CONNECTED, () => {
        console.log("Socket Connected: ", socket?.id);
        eventEmitter.emit(EVENT_EMITTER.CONNECTED, socket?.id);
        resolve(true);
      });
    });

    // Setup disconnect event
    socket.on(EVENT_EMITTER.DISCONNECT, () => {
      console.log("Socket Disconnected");
      currentRoomId = null;
      eventEmitter.emit(EVENT_EMITTER.DISCONNECT, socket?.id);
    });

    socket.on(EVENT_EMITTER.RECONNECT, (attemptNumber) => {
      eventEmitter.emit(EVENT_EMITTER.RECONNECT, attemptNumber);
    });

    socket.on(EVENT_EMITTER.SOCKET_ERROR, (error) => {
      eventEmitter.emit(EVENT_EMITTER.SOCKET_ERROR, error);
    });

    socket.on(EVENT_EMITTER.CONNECTION_FAILED, (error) => {
      eventEmitter.emit(EVENT_EMITTER.CONNECTION_FAILED, error);
    });

    setupChatEventListeners();
  }

  return socket;
}

function setupChatEventListeners() {
  if (!socket) return;

  socket.on(EVENT_EMITTER.NEW_MESSAGE, (data) => {
    eventEmitter.emit(EVENT_EMITTER.NEW_MESSAGE, data);
  });

  socket.on(EVENT_EMITTER.USER_JOINED, (data) => {
    eventEmitter.emit(EVENT_EMITTER.USER_JOINED, data);
  });

  socket.on(EVENT_EMITTER.USER_LEFT, (data) => {
    eventEmitter.emit(EVENT_EMITTER.USER_LEFT, data);
  });

  socket.on(EVENT_EMITTER.TYPING, (data) => {
    eventEmitter.emit(EVENT_EMITTER.TYPING, data);
  });

  socket.on(EVENT_EMITTER.STOP_TYPING, (data) => {
    eventEmitter.emit(EVENT_EMITTER.STOP_TYPING, data);
  });

  socket.on(EVENT_EMITTER.MESSAGE_DELIVERED, (data) => {
    eventEmitter.emit(EVENT_EMITTER.MESSAGE_DELIVERED, data);
  });

  socket.on(EVENT_EMITTER.MESSAGE_READ, (data) => {
    eventEmitter.emit(EVENT_EMITTER.MESSAGE_READ, data);
  });
}

// Start building JOIN_CHAT functionality
export function joinChatRoom(roomId: string) {
  if (!socket) return false;

  if (currentRoomId === roomId) {
    return true;
  }

  if (currentRoomId) {
    leaveChatRoom(currentRoomId);
  }

  socket.emit(EVENT_EMITTER.JOIN_CHAT, { chatId: roomId });
  currentRoomId = roomId;
  return true;
}

export function leaveChatRoom(roomId: string) {
  if (!socket) return;

  if (roomId === currentRoomId) {
    socket.emit(EVENT_EMITTER.LEAVE_CHAT, { chatId: roomId });
    currentRoomId = null;
  }
}

export function getCurrentRoomId(): string | null {
  return currentRoomId;
}

export function isSocketConnected(): boolean {
  return socket?.connected || false;
}

export function onSocketEvent(
  event: string,
  callback: (data: any) => void,
): () => void {
  return eventEmitter.on(event, callback);
}

export function offSocketEvent(
  event: string,
  callback: (data: any) => void,
): void {
  eventEmitter.off(event, callback);
}
export function getSocket(): Socket | null {
  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
