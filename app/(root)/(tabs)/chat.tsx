import ChipsList, { Chip } from "@/components/chat-chip-list";
import ChatHeader from "@/components/header/chat-header";
import Fonts from "@/utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import {
  Archive,
  CheckCheck,
  Mail,
  MessageCircle,
  Star,
  Users,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Chat() {
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Define chips with proper type - Dashboard color scheme
  const chips: Chip[] = [
    {
      id: "1",
      label: "All",
      count: 12,
      icon: <MessageCircle size={16} />,
    },
    {
      id: "2",
      label: "Unread",
      count: 3,
      icon: <Mail size={16} />,
    },
    {
      id: "3",
      label: "Groups",
      count: 5,
      icon: <Users size={16} />,
    },
    {
      id: "4",
      label: "Favorites",
      count: 2,
      icon: <Star size={16} />,
    },
    {
      id: "5",
      label: "Archived",
      count: 4,
      icon: <Archive size={16} />,
    },
  ];

  const chatData = [
    {
      id: "1",
      name: "Rahul Sharma",
      message: "Hey, did you check the latest design?",
      time: "9:00 AM",
      unread: 2,
      src: require("@/assets/images/image-1.jpg"),
    },
    {
      id: "2",
      name: "Priya Patel",
      message: "Meeting rescheduled to 4 PM",
      time: "9:00 AM",
      unread: 0,
      src: require("@/assets/images/image-2.jpg"),
    },
    {
      id: "3",
      name: "Amit Kumar",
      message: "Can you share the report?",
      time: "9:00 AM",
      unread: 1,
      src: require("@/assets/images/image-3.jpg"),
    },
    {
      id: "4",
      name: "Sneha Gupta",
      message: "Thanks for the update!",
      time: "9:00 AM",
      unread: 0,
      src: require("@/assets/images/images.png"),
    },
    {
      id: "5",
      name: "Rahul Sharma",
      message: "Hey, did you check the latest design?",
      time: "9:00 AM",
      unread: 2,
      src: require("@/assets/images/image-1.jpg"),
    },
    {
      id: "6",
      name: "Priya Patel",
      message: "Meeting rescheduled to 4 PM",
      time: "9:00 AM",
      unread: 0,
      src: require("@/assets/images/image-2.jpg"),
    },
    {
      id: "7",
      name: "Amit Kumar",
      message: "Can you share the report?",
      time: "9:00 AM",
      unread: 1,
      src: require("@/assets/images/image-3.jpg"),
    },
    {
      id: "8",
      name: "Sneha Gupta",
      message: "Thanks for the update!",
      time: "9:00 AM",
      unread: 0,
      src: require("@/assets/images/images.png"),
    },
    {
      id: "9",
      name: "Amit Kumar",
      message: "Can you share the report?",
      time: "9:00 AM",
      unread: 1,
      src: require("@/assets/images/image-3.jpg"),
    },
    {
      id: "10",
      name: "Sneha Gupta",
      message: "Thanks for the update!",
      time: "9:00 AM",
      unread: 0,
      src: require("@/assets/images/images.png"),
    },
  ];

  const handleChipPress = (chip: Chip): void => {
    console.log("Selected chip:", chip);
    setActiveFilter(chip.label.toLowerCase());
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

      <ChatHeader isFocused={isFocused} setIsFocused={setIsFocused} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.chipsWrapper}>
          <ChipsList
            chips={chips}
            onChipPress={handleChipPress}
            initialActiveChip="1"
          />
        </View>

        <View style={styles.messagesSection}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { fontFamily: Fonts.figtree.semibold },
              ]}
            >
              All conversations
            </Text>
            <Text style={[styles.seeAll, { fontFamily: Fonts.figtree.medium }]}>
              See All
            </Text>
          </View>

          <View style={styles.chatContainer}>
            {chatData.map((item) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.chatItem,
                  pressed && styles.chatItemPressed,
                ]}
              >
                <View style={styles.chatAvatar}>
                  <Image source={item.src} style={styles.avatarImage} />
                  {item.unread > 0 && <View style={styles.activeDot} />}
                </View>

                <View style={styles.chatInfo}>
                  <View style={styles.chatHeader}>
                    <Text
                      style={[
                        styles.chatName,
                        { fontFamily: Fonts.figtree.semibold },
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.chatTime,
                        { fontFamily: Fonts.figtree.regular },
                      ]}
                    >
                      {item.time}
                    </Text>
                  </View>

                  <View style={styles.messageRow}>
                    <View style={styles.messageLeft}>
                      <CheckCheck
                        size={16}
                        color={"#888"}
                        style={styles.doubleCheck}
                      />
                      <Text
                        style={[
                          styles.chatMessage,
                          { fontFamily: Fonts.figtree.regular },
                        ]}
                        numberOfLines={1}
                      >
                        {item.message}
                      </Text>
                    </View>

                    {item.unread > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text
                          style={[
                            styles.unreadText,
                            { fontFamily: Fonts.figtree.semibold },
                          ]}
                        >
                          {item.unread}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    zIndex: 1,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 48,
    zIndex: 2,
  },

  // Welcome Section - Matching Dashboard
  welcomeSection: {
    marginTop: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  welcomeDescription: {
    fontSize: 15,
    color: "#666",
    marginTop: 6,
    lineHeight: 22,
  },

  // Chips Wrapper
  chipsWrapper: {
    paddingHorizontal: 12,
    marginBottom: 8,
    zIndex: 1,
  },

  // Messages Section - Dashboard inspired
  messagesSection: {
    marginTop: 8,
    paddingHorizontal: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  seeAll: {
    color: "#38393a65",
    fontWeight: "500",
    fontSize: 14,
  },

  // Chat Container - Similar to Dashboard's chatContainer
  chatContainer: {
    backgroundColor: "#faf8f5dd",
    padding: 12,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },

  // Chat Items - Dashboard gridBox style
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 20,
    marginBottom: 8,
    shadowColor: "#000000b1",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
  },
  chatItemPressed: {
    backgroundColor: "#f8f8f8",
    transform: [{ scale: 0.98 }],
  },

  // Avatar - Dashboard icon container style
  chatAvatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    position: "relative",
  },
  avatarImage: {
    width: 56,
    height: 56,
  },
  activeDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "#fff",
  },

  // Chat Info
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  chatTime: {
    fontSize: 11,
    color: "#999",
  },

  // Message Row
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  doubleCheck: {
    marginRight: 6,
  },
  chatMessage: {
    fontSize: 13,
    color: "#888",
    flex: 1,
  },

  // Unread Badge - Dashboard badge style
  unreadBadge: {
    backgroundColor: "#ff3a30d6",
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 7,
    marginLeft: 8,
  },
  unreadText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },

  // Bottom Padding
  bottomPadding: {
    height: 40,
  },
});
