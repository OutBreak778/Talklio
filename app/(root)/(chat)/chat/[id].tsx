// app/chat/[id].tsx
import ChatRoom from "@/components/chat/chat-room";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ChatRoomScreen() {
  const { id, name } = useLocalSearchParams();

  // Safe extraction
  const chatId = Array.isArray(id) ? id[0] : id || "";
  const chatName = Array.isArray(name) ? name[0] : name || "Chat";

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#a5d6f039", "#fff", "#fbeee521", "#93d9f953"]}
        style={StyleSheet.absoluteFillObject}
      />

      <ChatRoom id={chatId} text={chatName} />
    </View>
  );
}
