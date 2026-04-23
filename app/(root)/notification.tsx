import NotificationHeader from "@/components/header/notification-header";
import Fonts from "@/utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import {
  AlertCircle,
  Bell,
  CheckCheck,
  CheckCircle,
  Clock,
  MessageCircle,
  MoreVertical,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Notification() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState("all");

  const notificationFilters = [
    { id: "all", label: "All", icon: <Bell size={16} /> },
    { id: "unread", label: "Unread", icon: <AlertCircle size={16} /> },
    { id: "messages", label: "Messages", icon: <MessageCircle size={16} /> },
    { id: "updates", label: "Updates", icon: <CheckCircle size={16} /> },
  ];

  const notifications = [
    {
      id: "1",
      type: "message",
      title: "New message from Admin",
      message:
        "Your account has been successfully verified. Welcome to the platform!",
      time: "2 min ago",
      read: false,
      avatar: require("@/assets/images/image-1.jpg"),
      sender: "Admin",
      priority: "high",
    },
    {
      id: "2",
      type: "message",
      title: "Team meeting reminder",
      message: "Don't forget about the design team meeting at 3 PM today.",
      time: "15 min ago",
      read: false,
      avatar: require("@/assets/images/image-2.jpg"),
      sender: "Sarah Johnson",
      priority: "medium",
    },
    {
      id: "3",
      type: "update",
      title: "App update available",
      message: "Version 2.0.0 is now available. Update to enjoy new features.",
      time: "1 hour ago",
      read: true,
      avatar: null,
      sender: "System",
      priority: "low",
    },
    {
      id: "4",
      type: "message",
      title: "Alex commented on your post",
      message: "Great work on the new design! Love the color scheme.",
      time: "2 hours ago",
      read: true,
      avatar: require("@/assets/images/image-3.jpg"),
      sender: "Alex Thompson",
      priority: "low",
    },
    {
      id: "5",
      type: "update",
      title: "New feature alert",
      message: "Video calls now support screen sharing. Try it out!",
      time: "5 hours ago",
      read: false,
      avatar: null,
      sender: "Product Team",
      priority: "medium",
    },
    {
      id: "6",
      type: "message",
      title: "Meeting scheduled",
      message:
        "Your meeting with the client has been scheduled for tomorrow at 10 AM.",
      time: "Yesterday",
      read: true,
      avatar: require("@/assets/images/images.png"),
      sender: "Client Team",
      priority: "high",
    },
    {
      id: "7",
      type: "update",
      title: "Task completed",
      message: "Your task 'Update documentation' has been marked as complete.",
      time: "Yesterday",
      read: true,
      avatar: null,
      sender: "Task Manager",
      priority: "low",
    },
    {
      id: "8",
      type: "message",
      title: "New follower",
      message: "Maria Garcia started following you. Check out their profile.",
      time: "2 days ago",
      read: true,
      avatar: require("@/assets/images/image-2.jpg"),
      sender: "Maria Garcia",
      priority: "low",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#ff3a30";
      case "medium":
        return "#ff9500";
      case "low":
        return "#34c759";
      default:
        return "#8e8e93";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle size={20} color="#007aff" />;
      case "update":
        return <CheckCircle size={20} color="#34c759" />;
      default:
        return <Bell size={20} color="#007aff" />;
    }
  };

  const FilterChip = ({ filter, isActive, onPress }: any) => (
    <TouchableOpacity
      style={[styles.filterChip, isActive && styles.filterChipActive]}
      onPress={() => onPress(filter.id)}
    >
      {React.cloneElement(filter.icon, {
        color: isActive ? "#fff" : "#666",
        size: 14,
      })}
      <Text
        style={[
          styles.filterChipText,
          isActive && styles.filterChipTextActive,
          { fontFamily: Fonts.figtree.medium },
        ]}
      >
        {filter.label}
      </Text>
    </TouchableOpacity>
  );

  const NotificationCard = ({ notification }: { notification: any }) => {
    const [isRead, setIsRead] = useState(notification.read);

    const markAsRead = () => {
      setIsRead(true);
    };

    return (
      <TouchableOpacity
        style={[styles.notificationCard, !isRead && styles.unreadCard]}
        onPress={markAsRead}
        activeOpacity={0.7}
      >
        <View style={styles.notificationLeft}>
          <View style={styles.notificationAvatarContainer}>
            {notification.avatar ? (
              <Image
                source={notification.avatar}
                style={styles.notificationAvatar}
              />
            ) : (
              <View style={styles.defaultAvatar}>
                {getNotificationIcon(notification.type)}
              </View>
            )}
            {!isRead && <View style={styles.unreadDot} />}
          </View>
        </View>

        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.notificationTitle,
                  !isRead && styles.unreadText,
                  { fontFamily: Fonts.figtree.semibold },
                ]}
              >
                {notification.title}
              </Text>
              {notification.priority === "high" && !isRead && (
                <View
                  style={[
                    styles.priorityBadge,
                    {
                      backgroundColor: getPriorityColor(notification.priority),
                    },
                  ]}
                >
                  <AlertCircle size={10} color="#fff" />
                </View>
              )}
            </View>
            <TouchableOpacity>
              <MoreVertical size={16} color="#ccc" />
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.notificationMessage,
              { fontFamily: Fonts.figtree.regular },
            ]}
            numberOfLines={2}
          >
            {notification.message}
          </Text>

          <View style={styles.notificationFooter}>
            <View style={styles.senderInfo}>
              <Text
                style={[
                  styles.senderName,
                  { fontFamily: Fonts.figtree.medium },
                ]}
              >
                {notification.sender}
              </Text>
              <View style={styles.dotSeparator} />
              <Clock size={12} color="#999" />
              <Text
                style={[
                  styles.notificationTime,
                  { fontFamily: Fonts.figtree.regular },
                ]}
              >
                {notification.time}
              </Text>
            </View>
            {!isRead && (
              <TouchableOpacity style={styles.markReadButton}>
                <CheckCheck size={16} color="#007aff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !notification.read;
    if (activeFilter === "messages") return notification.type === "message";
    if (activeFilter === "updates") return notification.type === "update";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

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
      <NotificationHeader unreadCount={unreadCount} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        {/* <View style={styles.headerSection}>
          <View style={styles.headerTop}>
            <Text
              style={[
                styles.headerTitle,
                { fontFamily: Fonts.figtree.semibold },
              ]}
            >
              Notifications
            </Text>
            <View style={styles.headerActions}>
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
              <TouchableOpacity>
                <Trash2 size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={[
              styles.headerSubtitle,
              { fontFamily: Fonts.figtree.regular },
            ]}
          >
            Stay updated with your latest activities
          </Text>
        </View> */}

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}
          >
            {notificationFilters.map((filter) => (
              <FilterChip
                key={filter.id}
                filter={filter}
                isActive={activeFilter === filter.id}
                onPress={setActiveFilter}
              />
            ))}
          </ScrollView>
        </View>

        {/* Notifications List */}
        <View style={styles.notificationsContainer}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <Bell size={48} color="#ccc" />
              </View>
              <Text
                style={[
                  styles.emptyTitle,
                  { fontFamily: Fonts.figtree.semibold },
                ]}
              >
                No notifications
              </Text>
              <Text
                style={[
                  styles.emptySubtitle,
                  { fontFamily: Fonts.figtree.regular },
                ]}
              >
                You're all caught up! Check back later for updates.
              </Text>
            </View>
          )}
        </View>

        {/* Bottom Padding */}
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
    flex: 1,
  },
  scrollContent: {},

  // Header Section
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },

  // Filters
  filtersContainer: {
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  filtersScroll: {
    gap: 10,
    paddingVertical: 4,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    gap: 6,
    height: 38,
  },
  filterChipActive: {
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  filterChipText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: "#fff",
  },

  // Notifications Container
  notificationsContainer: {
    paddingHorizontal: 12,
    gap: 12,
    paddingBottom: 20,
  },

  // Notification Card
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    elevation: 2,
  },
  unreadCard: {
    backgroundColor: "#ffffff",
    borderLeftWidth: 3,
    borderLeftColor: "#007aff",
  },
  notificationLeft: {
    marginRight: 12,
  },
  notificationAvatarContainer: {
    position: "relative",
  },
  notificationAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  defaultAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  unreadDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007aff",
    borderWidth: 2,
    borderColor: "#fff",
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    color: "#1a1a1a",
    flex: 1,
  },
  unreadText: {
    fontWeight: "600",
  },
  priorityBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationMessage: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  senderInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  senderName: {
    fontSize: 12,
    color: "#888",
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#ccc",
  },
  notificationTime: {
    fontSize: 11,
    color: "#999",
  },
  markReadButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },

  // Empty State
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    paddingHorizontal: 40,
  },

  // Bottom Padding
  bottomPadding: {
    height: 40,
  },
});
