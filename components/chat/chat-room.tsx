import { useChatStore } from "@/store/chatStore";
import { useUserStore } from "@/store/userStore";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatRoomHeader from "./chat-room-header";
import MessageBubble from "./message-bubble";
import { MessageInput } from "./message-input";

interface Message {
  id: any;
  text: any;
  isUser?: boolean;
  timestamp?: string;
  image?: any;
  isOnline?: boolean;
}

const HARDCODED_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hey! How are you?",
    isUser: false,
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    text: "I am good, thanks!",
    isUser: true,
    timestamp: "10:31 AM",
  },
  {
    id: "3",
    text: "What are you doing!",
    isUser: false,
    timestamp: "10:32 AM",
  },
  {
    id: "4",
    text: "Are you Free Today?",
    isUser: false,
    timestamp: "10:33 AM",
  },
  {
    id: "5",
    text: "No, Actually i am Working on the chat app",
    isUser: true,
    timestamp: "10:33 AM",
  },
];

export default function ChatRoom({
  id,
  text,
  image,
  isOnline = false,
}: Message) {
  const [messages, setMessages] = useState<Message[]>(HARDCODED_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const {
    activeChat,
    isConnecting,
    isConnected,
    error,
    initializeChat,
    clearActiveChat,
  } = useChatStore();

  const { users, fetchAllUsers } = useUserStore();

  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

  const getImageSource = () => {
    if (image && typeof image === "string" && image.startsWith("http")) {
      return { uri: image };
    }
    // Fallback to default image
    return require("@/assets/images/image-3.jpg");
  };

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);

        // Force scroll to bottom when keyboard opens
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      },
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);

        // Optional: scroll to bottom when keyboard closes
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      },
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const imageURL = typeof image === "string" ? image : "";
    initializeChat(id, text, image, isOnline);
    fetchAllUsers();

    return () => {
      clearActiveChat();
    };
  }, [id, fetchAllUsers]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOnline: isOnline,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Loading state
  // if (isConnecting) {
  //   return (
  //     <View style={[styles.centerContainer, { paddingTop: insets.top }]}>
  //       <ActivityIndicator size="large" color="#3b82f6" />
  //       <Text style={styles.loadingText}>Connecting to chat...</Text>
  //     </View>
  //   );
  // }

  // // Error state
  // if (error) {
  //   return (
  //     <View style={[styles.centerContainer, { paddingTop: insets.top }]}>
  //       <Text style={styles.errorText}>Failed to connect</Text>
  //       <Text style={styles.errorSubText}>{error}</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <LinearGradient
        colors={["#a5d6f039", "#fff", "#fbeee521", "#93d9f953"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={StyleSheet.absoluteFillObject}
      />

      <ChatRoomHeader
        id={id}
        isOnline={isOnline}
        image={getImageSource()}
        chatName={text}
      />

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble
            text={item.text}
            isUser={item.isUser}
            timestamp={item.timestamp}
            userName={activeChat?.participantName || "User"}
            otherUserSrc={activeChat?.participantImage} // ← Other person's avatar
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={[
          styles.messagesContent,
          { paddingBottom: keyboardHeight + 80 },
        ]}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No messages yet</Text>
            <Text style={styles.emptySubText}>
              Send a message to start the conversation
            </Text>
          </View>
        }
      />

      {/* Simple View - No animations */}
      <View style={{ marginBottom: keyboardHeight }}>
        <MessageInput
          value={inputText}
          onChangeText={setInputText}
          onSend={sendMessage}
          keyboardVisible={keyboardHeight > 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  keyboardAvoidView: {
    width: "100%",
  },
  inputWrapper: {
    width: "100%",
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#FFF",
  },
  backButton: {
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#3b82f6",
    fontFamily: "Figtree-Medium",
  },
  errorText: {
    fontSize: 18,
    color: "#dc2626",
    fontFamily: "Figtree-SemiBold",
    marginBottom: 8,
  },
  errorSubText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Figtree-Regular",
    textAlign: "center",
    paddingHorizontal: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Figtree-Medium",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    fontFamily: "Figtree-Regular",
  },
  headerName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  headerStatus: {
    fontSize: 12,
    color: "#10B981",
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAction: {
    marginLeft: 16,
  },
  messagesList: {
    flex: 1,
    backgroundColor: "#c4c4c41e",
  },
  messagesContent: {
    paddingVertical: 8,
    paddingBottom: 16,
  },
  messageContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
  },
  otherMessage: {
    alignSelf: "flex-start",
  },
  messageBubble: {
    borderRadius: 12,
    padding: 12,
  },
  userBubble: {
    backgroundColor: "#3B82F6",
  },
  otherBubble: {
    backgroundColor: "#F3F4F6",
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: "#FFF",
  },
  otherText: {
    color: "#000",
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
  },
  userTimestamp: {
    color: "#BFDBFE",
  },
  otherTimestamp: {
    color: "#6B7280",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFF",
  },
  attachButton: {
    marginRight: 8,
  },
  cameraButton: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: "#FFF",
  },
  sendButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 24,
    padding: 10,
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
});
