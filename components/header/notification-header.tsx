import Fonts from "@/utils/constants";
import { Trash2Icon } from "lucide-react-native";
import React, { useRef } from "react";
import {
    Alert,
    Animated,
    Pressable,
    TextInput as RNTextInput,
    StyleSheet,
    Text,
    View,
} from "react-native";

const NotificationHeader = ({ unreadCount }: any) => {
  const inputRef = useRef<RNTextInput>(null);
  const chatTranslateX = useRef(new Animated.Value(0)).current;
  const chatOpacity = useRef(new Animated.Value(1)).current;

  const handleClearNotifications = () => {
    Alert.alert(
      "Clear All Notifications",
      `You have ${unreadCount} unread notifications. Are you sure you want to clear all?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            // Optional: Show success message
            Alert.alert("Success", "All notifications cleared", [
              { text: "OK", style: "default" },
            ]);
          },
        },
      ],
    );
  };
  return (
    <View style={styles.header}>
      {/* LEFT: Profile + Name */}
      <Animated.View
        style={[
          styles.left,
          {
            transform: [{ translateX: chatTranslateX }],
            opacity: chatOpacity,
          },
        ]}
      >
        <Text style={[styles.name, { fontFamily: Fonts.figtree.semibold }]}>
          Notifications
        </Text>
        <Text
          style={[styles.description, { fontFamily: Fonts.figtree.regular }]}
        >
          Stay updated with your latest activities
        </Text>
      </Animated.View>

      {unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text
            style={[
              styles.unreadBadgeText,
              { fontFamily: Fonts.figtree.semibold },
            ]}
          >
            {unreadCount}
          </Text>
        </View>
      )}

      {/* RIGHT: Search */}
      <View
        style={{
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          borderRadius: 50,
          borderRightWidth: 0.4,
          borderRightColor: "#99999972",
          marginLeft: 8,
        }}
      >
        <Pressable onPress={handleClearNotifications}>
          <Trash2Icon size={20} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginBottom: 18,
  },
  left: {
    flex: 1, // 👈 THIS is critical
    flexDirection: "column",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 28,
    fontWeight: "600",
    color: "#1a1a1a",
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a83",
    letterSpacing: -0.5,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  inputWrapper: {
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  searchInner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    position: "relative",
  },

  input: {
    flex: 1,
    height: 44,
    fontSize: 15,
    color: "#1c1c1c",
    padding: 0,
    margin: 0,
    marginLeft: 8,
    backgroundColor: "transparent",
  },

  clearButton: {
    padding: 4,
    marginLeft: 4,
  },

  clearText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },

  cancelButton: {
    paddingHorizontal: 8,
  },

  cancelText: {
    fontSize: 15,
    color: "#007aff",
    fontWeight: "500",
  },

  unreadBadge: {
    backgroundColor: "#ff3a30",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 24,
    alignItems: "center",
  },
  unreadBadgeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
});

export default NotificationHeader;
