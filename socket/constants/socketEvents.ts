export const SOCKET_EVENTS = {
  CONNECTION: {
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    ERROR: "connect_error",
  },

  MESSAGE: {
    SEND: "message:send",
    RECEIVE: "message:receive",
  },

  ROOM: {
    JOIN: "room:join",
    LEAVE: "room:leave",
  },

  USER: {
    TYPING: "user:typing",
    STOP_TYPING: "user:stop_typing",
  },
};
