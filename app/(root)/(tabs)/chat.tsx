import ChipsList, { Chip } from "@/components/chat-chip-list";
import ChatHeader from "@/components/header/chat-header";
import { useUserStore } from "@/store/userStore";
import Fonts from "@/utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Archive,
  CheckCheck,
  Mail,
  MessageCircle,
  Star,
  Users,
} from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Chat() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState(""); // ← Lifted state

  const { users, loading, fetchAllUsers } = useUserStore();

  // Fetch users with search (Server-side + Client-side)
  useEffect(() => {
    fetchAllUsers(searchText);
  }, [fetchAllUsers, searchText]);

  // Optimistic Filtering using useMemo (Very fast)
  const filteredUsers = useMemo(() => {
    if (!users || users.length === 0) return [];

    let result = [...users];

    // Client-side search (fallback + better UX)
    if (searchText.trim()) {
      const query = searchText.toLowerCase().trim();
      result = result.filter(
        (user) =>
          user.name?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query),
      );
    }

    // Apply Active Filter
    switch (activeFilter) {
      case "unread":
        return result.filter((user) => (user.unread || 0) > 0);
      case "groups":
        return result.filter((user) => user.type === "group");
      case "favorites":
        return result.filter((user) => user.isFavorite === true);
      case "archived":
        return result.filter((user) => user.isArchived === true);
      case "all":
      default:
        return result;
    }
  }, [users, searchText, activeFilter]);

  // Chips Data
  const chips: Chip[] = [
    {
      id: "1",
      label: "All",
      count: users.length,
      icon: <MessageCircle size={16} />,
    },
    {
      id: "2",
      label: "Unread",
      count: users.filter((u) => (u.unread || 0) > 0).length,
      icon: <Mail size={16} />,
    },
    { id: "3", label: "Groups", count: 5, icon: <Users size={16} /> },
    {
      id: "4",
      label: "Favorites",
      count: users.filter((u) => u.isFavorite).length,
      icon: <Star size={16} />,
    },
    {
      id: "5",
      label: "Archived",
      count: users.filter((u) => u.isArchived).length,
      icon: <Archive size={16} />,
    },
  ];

  const handleChipPress = (chip: Chip): void => {
    setActiveFilter(chip.label.toLowerCase());
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllUsers(searchText);
    setRefreshing(false);
  };

  const openChatRoom = (
    chatId: string,
    chatName: string,
    chatImage: any,
    isOnline: boolean,
  ) => {
    let imageUri = "";
    if (typeof chatImage === "object" && chatImage.uri) {
      imageUri = chatImage.uri;
    } else if (typeof chatImage === "string") {
      imageUri = chatImage;
    }

    router.push({
      pathname: "/(root)/(chat)/chat/[id]",
      params: {
        id: chatId,
        chatName: chatName,
        chatImage: imageUri,
        isOnline: isOnline.toString(),
      },
    });
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

      <ChatHeader
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3b82f6"]}
            tintColor="#3b82f6"
          />
        }
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
              {activeFilter === "all"
                ? "All Conversations"
                : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Conversations`}
            </Text>
          </View>

          <View style={styles.chatContainer}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((item) => (
                <Pressable
                  key={item._id}
                  style={({ pressed }) => [
                    styles.chatItem,
                    pressed && styles.chatItemPressed,
                  ]}
                  onPress={() =>
                    openChatRoom(item._id, item.name, item.src, item.isOnline)
                  }
                >
                  {/* Your existing chat item UI */}
                  <View style={styles.chatAvatar}>
                    <Image
                      source={
                        typeof item.src === "string"
                          ? { uri: item.src }
                          : item.src
                      }
                      style={styles.avatarImage}
                    />
                    <View
                      style={
                        item.isOnline ? styles.activeDot : styles.nonActiveDot
                      }
                    />
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
                          color="#888"
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
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No conversations found</Text>
                <Text style={styles.emptySubText}>
                  {searchText
                    ? `No results for "${searchText}"`
                    : "No chats in this category"}
                </Text>
              </View>
            )}
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
    bottom: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "#fff",
  },
  nonActiveDot: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#bebdbdf3",
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

  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#faf8f5dd",
    borderRadius: 20,
    marginHorizontal: 8,
    marginTop: 20,
  },

  emptyText: {
    fontSize: 18,
    fontFamily: Fonts.figtree.semibold,
    color: "#1a1a1a",
    marginBottom: 8,
    textAlign: "center",
  },

  emptySubText: {
    fontSize: 14,
    fontFamily: Fonts.figtree.regular,
    color: "#888",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
  },

  // Optional: Add an icon container if you want to show an icon later
  emptyIconContainer: {
    marginBottom: 16,
    opacity: 0.6,
  },
});
