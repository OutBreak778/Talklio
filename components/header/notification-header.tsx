import Fonts from "@/utils/constants";
import { useRouter } from "expo-router";
import { ChevronLeft, Trash2Icon } from "lucide-react-native";
import React, { useRef } from "react";
import {
  Alert,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const NotificationHeader = ({ unreadCount }: any) => {
  const router = useRouter();

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
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <ChevronLeft size={28} color="#000" />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.left,
          {
            transform: [{ translateX: chatTranslateX }],
            opacity: chatOpacity,
          },
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={[styles.name, { fontFamily: Fonts.figtree.semibold }]}>
            Notifications
          </Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text
                style={[
                  styles.unreadBadgeText,
                  { fontFamily: Fonts.figtree.semibold },
                ]}
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </Text>
            </View>
          )}
        </View>

        <Text
          style={[styles.description, { fontFamily: Fonts.figtree.regular }]}
        >
          Stay updated with your latest activities
        </Text>
      </Animated.View>

      {/* RIGHT: Clear All Button */}
      <View style={styles.rightButton}>
        <Pressable onPress={handleClearNotifications}>
          <Trash2Icon size={20} color="#1a1a1a" />
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
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center", // ✅ Centers badge vertically with text
    gap: 8, // Space between title and badge
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a1a1a",
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a83",
    letterSpacing: -0.5,
    marginTop: 2,
  },
  backButton: {
    marginRight: 16,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: "#d9d9d975",
    elevation: 1,
  },
  rightButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: "#d9d9d975",
    marginLeft: 8,
    elevation: 1,
  },
  unreadBadge: {
    backgroundColor: "#ff3a30",
    minWidth: 16, // ✅ Minimum width
    height: 20, // ✅ Fixed height (was 28 before, had 15/28)
    borderRadius: 24, // ✅ Perfect circle (half of height)
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8, // ✅ Padding for larger numbers
  },
  unreadBadgeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default NotificationHeader;
