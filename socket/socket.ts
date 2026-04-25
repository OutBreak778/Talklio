import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "./constants/socketEvents";

let socket: Socket | null = null;

export async function connectSocket(): Promise<Socket> {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("No Token Found");
  }

  if (!socket) {
    socket = io(process.env.EXPO_PUBLIC_BASE_URL, {
      auth: { token },
    });

    await new Promise((resolve) => {
      socket?.on(SOCKET_EVENTS.CONNECTION.CONNECT, () => {
        console.log("Socket Connected: ", socket?.id);
        resolve(true);
      });
    });

    socket.on(SOCKET_EVENTS.CONNECTION.DISCONNECT, () => {
      console.log("Socket Disconnected");
    });
  }

  return socket;
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
