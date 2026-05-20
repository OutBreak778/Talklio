import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatRoomHeader from "./chat-room-header";
import MessageBubble from "./message-bubble";
import { MessageInput } from "./message-input";

interface Message {
  id: any;
  text: string | string[];
  isUser?: boolean;
  timestamp?: string;
}

const HARDCODED_MESSAGES: Message[] = [
  { id: "1", text: "Hey! How are you?", isUser: false, timestamp: "10:30 AM" },
  { id: "2", text: "I am good, thanks!", isUser: true, timestamp: "10:31 AM" },
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

export default function ChatRoom({ id, text }: Message) {
  const [messages, setMessages] = useState<Message[]>(HARDCODED_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

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
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

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

      <ChatRoomHeader name="John Doe" isOnline={true} />

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble
            text={item.text}
            isUser={item.isUser}
            timestamp={item.timestamp}
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
