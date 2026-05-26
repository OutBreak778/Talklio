import ChatRoom from "@/components/chat/chat-room";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ChatRoomScreen() {
  const params = useLocalSearchParams();

  // Safely extract params
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const chatName = Array.isArray(params.chatName)
    ? params.chatName[0]
    : params.chatName || "Chat";
  const chatImage = Array.isArray(params.chatImage)
    ? params.chatImage[0]
    : params.chatImage;
  const isOnline = Array.isArray(params.isOnline)
    ? params.isOnline[0] === "true"
    : params.isOnline === "true";

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#a5d6f039", "#fff", "#fbeee521", "#93d9f953"]}
        style={StyleSheet.absoluteFillObject}
      />

      <ChatRoom id={id} text={chatName} image={chatImage} isOnline={isOnline} />
    </View>
  );
}
