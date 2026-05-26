export const EVENT_EMITTER = {
  // Socket connection events (these are Socket.IO built-in events)
  CONNECTION: "connection",
  CONNECTED: "connected", // Your backend emits "connected"
  DISCONNECT: "disconnect", // Socket.IO built-in
  RECONNECT: "reconnect", // Socket.IO built-in
  CONNECT_ERROR: "connect_error", // Socket.IO built-in

  // Custom events from your backend
  SOCKET_ERROR: "socketError", // Your backend emits "socketError"
  CONNECTION_FAILED: "connectionFailed", // Your backend emits "connectionFailed"

  // Chat events (these should match your backend exactly)
  JOIN_CHAT: "joinChat", // Match backend
  LEAVE_CHAT: "leaveChat", // Match backend
  SEND_MESSAGE: "sendMessage", // Match backend
  NEW_MESSAGE: "newMessage", // Match backend
  TYPING: "typing", // Match backend
  STOP_TYPING: "stopTyping", // Match backend
  USER_JOINED: "userJoined", // Match backend
  USER_LEFT: "userLeft", // Match backend
  MESSAGE_READ: "messageRead", // Match backend
  MESSAGE_DELIVERED: "messageDelivered", // Match backend
};
