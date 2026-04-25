import { CheckCheck } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface MessageBubbleProps {
  text: string;
  isUser: boolean;
  timestamp: string;
  userName?: string;
  isDelivered?: boolean;
  isRead?: boolean;
}

export default function MessageBubble({
  text,
  isUser,
  timestamp,
  userName = "John Doe",
  isDelivered = true,
  isRead = false,
}: MessageBubbleProps) {
  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.otherContainer,
      ]}
    >
      {/* Avatar for other user messages (left side) */}
      {!isUser && (
        <Image
          source={require("@/assets/images/image-1.jpg")}
          style={styles.avatar}
        />
      )}

      {/* Message Content */}
      <View
        style={[
          styles.messageContent,
          isUser ? styles.userContent : styles.otherContent,
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingRight: 12,
            paddingVertical: 4,
            paddingHorizontal: 3,
          }}
        >
          {/* User Name for other user messages */}
          <View>
            {!isUser && <Text style={styles.userName}>{userName}</Text>}
            {isUser && (
              <Text
                style={[
                  styles.userName,
                  { color: "#fff", fontWeight: 400, marginLeft: 4 },
                ]}
              >
                You
              </Text>
            )}
          </View>

          <View style={{ flexDirection: "row" }}>
            <View>
              {isUser && (
                <CheckCheck
                  size={17}
                  color={isRead ? "#3B82F6" : "#9CA3AF"}
                  style={styles.statusIcon}
                />
              )}
            </View>

            <Text
              style={[
                styles.timestamp,
                isUser ? styles.userTimestamp : styles.otherTimestamp,
              ]}
            >
              {timestamp}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.bubble,
            isUser ? styles.userBubble : styles.otherBubble,
          ]}
        >
          <Text
            style={[styles.text, isUser ? styles.userText : styles.otherText]}
          >
            {text}
          </Text>
        </View>
      </View>
      {isUser && (
        <Image
          source={require("@/assets/images/image-3.jpg")}
          style={styles.avatar}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxWidth: "85%",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  userContainer: {
    alignSelf: "flex-end",
    flexDirection: "row", // Avatar on right for user
  },
  otherContainer: {
    alignSelf: "flex-start",
    flexDirection: "row", // Avatar on left for others
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: 20, // Align with message bubble
  },
  messageContent: {
    flex: 1,
  },
  userContent: {
    alignItems: "flex-end",
    padding: 6,
    borderRadius: 17,
    backgroundColor: "#000",
  },
  otherContent: {
    alignItems: "flex-start",

    padding: 6,
    borderRadius: 17,
    backgroundColor: "#fff",
  },
  userName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 4,
    marginLeft: 4,
  },
  bubble: {
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 6,
    maxWidth: "100%",
  },
  userBubble: {
    backgroundColor: "transparent", // Black background for user
  },
  otherBubble: {
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: "#FFFFFF", // White text for user
    marginHorizontal: 6,
  },
  otherText: {
    color: "#000000",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginHorizontal: 4,
    gap: 4,
  },
  timestamp: {
    fontSize: 10,
  },
  userTimestamp: {
    color: "#9CA3AF",
    fontSize: 11,
    alignItems: "center",
    flexDirection: "row",
  },
  otherTimestamp: {
    color: "#6B7280",
  },
  statusIcon: {
    marginRight: 8,
  },
});
