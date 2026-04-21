import Header from "@/components/header";
import Fonts from "@/utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import {
  CircleCheckBig,
  MessageCircleMore,
  MessagesSquareIcon,
  NotebookPen,
  NotepadText,
  Phone,
} from "lucide-react-native";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function dashboard() {
  const insets = useSafeAreaInsets();

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

      <Header />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Hello, Nikhil 👋</Text>
          <Text style={styles.welcomeDescription}>
            Always stay focused, Complete your tasks
          </Text>
        </View>

        {/* 2. Main Grid - Tall left + Two stacked right (like your CSS example) */}
        <View style={styles.gridContainer}>
          {/* Left Column - Tall box (spans both rows) */}
          <View style={styles.tallBoxContainer}>
            <View style={styles.leftGrid}>
              <View style={styles.gridBox}>
                <View style={{ flexDirection: "row", gap: 7 }}>
                  <View
                    style={{
                      width: 45,
                      height: 45,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fff",
                      borderRadius: 50,
                    }}
                  >
                    <Phone size={20} />
                  </View>
                  <Text
                    style={[
                      styles.boxTitle,
                      { fontFamily: Fonts.figtree.semibold },
                    ]}
                  >
                    Voice {"\n"} Calls
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 5,
                    paddingLeft: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 35,
                      fontWeight: "700",
                      fontFamily: Fonts.figtree.bold,
                    }}
                  >
                    3
                  </Text>
                  <Text
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontFamily: Fonts.figtree.regular,
                      color: "#707070",
                    }}
                  >
                    new
                  </Text>
                </View>

                <View>
                  <Image
                    source={require("@/assets/images/voice.png")}
                    style={{ width: 130, height: 60, marginTop: 14 }}
                  />
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <Image
                    source={require("@/assets/icons/canva.png")}
                    style={{ width: 34, borderRadius: 50, height: 34 }}
                  />
                  <Image
                    source={require("@/assets/images/icon.png")}
                    style={{
                      width: 34,
                      borderRadius: 50,
                      height: 34,
                      marginLeft: -15,
                    }}
                  />
                  <Image
                    source={require("@/assets/icons/canva.png")}
                    style={{
                      width: 34,
                      borderRadius: 50,
                      height: 34,
                      marginLeft: -15,
                    }}
                  />
                  <View
                    style={{
                      width: 34,
                      backgroundColor: "#fff",
                      height: 34,
                      borderRadius: 50,
                      marginLeft: -15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: Fonts.figtree.semibold,
                      }}
                    >
                      5+
                    </Text>
                  </View>
                </View>
                {/* Add more content here later */}
              </View>
            </View>
          </View>

          {/* Right Column - Two half-height boxes stacked */}
          <View style={styles.rightColumn}>
            <View style={styles.rightTopGrid}>
              <View style={styles.gridBox}>
                <View style={{ flexDirection: "row", gap: 7 }}>
                  <View
                    style={{
                      width: 45,
                      height: 45,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fff",
                      borderRadius: 50,
                    }}
                  >
                    <MessagesSquareIcon size={20} />
                  </View>
                  <Text
                    style={[
                      styles.boxTitle,
                      { fontFamily: Fonts.figtree.semibold },
                    ]}
                  >
                    Team {"\n"}Channels
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 5,
                    paddingLeft: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 35,
                      fontWeight: "700",
                      fontFamily: Fonts.figtree.bold,
                    }}
                  >
                    2
                  </Text>
                  <Text
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontFamily: Fonts.figtree.regular,
                      color: "#707070",
                    }}
                  >
                    new
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.rightBottomGrid}>
              <View style={styles.gridBox}>
                <View style={{ flexDirection: "row", gap: 7 }}>
                  <View
                    style={{
                      width: 45,
                      height: 45,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fff",
                      borderRadius: 50,
                    }}
                  >
                    <MessageCircleMore size={20} />
                  </View>
                  <Text
                    style={[
                      styles.boxTitle,
                      { fontFamily: Fonts.figtree.semibold },
                    ]}
                  >
                    Task {"\n"}Threads
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 5,
                    paddingLeft: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 35,
                      fontWeight: "700",
                      fontFamily: Fonts.figtree.bold,
                    }}
                  >
                    5
                  </Text>
                  <Text
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontFamily: Fonts.figtree.regular,
                      color: "#707070",
                    }}
                  >
                    new
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 3. Two Column Boxes - Tasks & Notes */}
        <View style={styles.twoColumnContainer}>
          {/* Tasks Box */}
          <View
            style={[styles.twoColBox, styles.tasksBox, { overflow: "hidden" }]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingHorizontal: 8,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f1f1f1a7",
                  borderRadius: 50,
                  padding: 8,
                  marginTop: -4,
                }}
              >
                <NotepadText size={22} />
              </View>
              <Text
                style={[
                  styles.boxTitle,
                  {
                    fontFamily: Fonts.figtree.semibold,
                    fontSize: 20,
                    marginLeft: 9,
                    alignItems: "center",
                  },
                ]}
              >
                Tasks
              </Text>
            </View>
            <View
              style={{
                marginTop: 12,
                flexDirection: "row",
                position: "relative",
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 6,
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <CircleCheckBig size={20} />
                  <Text
                    style={{
                      fontFamily: Fonts.figtree.medium,
                      color: "#727272be",
                    }}
                  >
                    UX Edits
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 6,
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <CircleCheckBig size={20} />
                  <Text
                    style={{
                      fontFamily: Fonts.figtree.medium,
                      color: "#727272be",
                    }}
                  >
                    Wireframes
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 6,
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <CircleCheckBig size={20} />
                  <Text
                    style={{
                      fontFamily: Fonts.figtree.medium,
                      color: "#727272be",
                    }}
                  >
                    Panels
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 30,
                  backgroundColor: "#000",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >
                <Image
                  source={require("@/assets/icons/add.png")}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: "#fff",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Notes Box */}
          <View
            style={[styles.twoColBox, styles.tasksBox, { overflow: "hidden" }]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingHorizontal: 8,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f1f1f1a7",
                  borderRadius: 50,
                  padding: 8,
                  marginTop: -4,
                }}
              >
                <NotebookPen size={22} />
              </View>
              <Text
                style={[
                  styles.boxTitle,
                  {
                    fontFamily: Fonts.figtree.semibold,
                    fontSize: 20,
                    marginLeft: 9,
                    alignItems: "center",
                  },
                ]}
              >
                Notes
              </Text>
            </View>
            <View
              style={{
                marginTop: 12,
                flexDirection: "row",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 6,
                    alignItems: "center",
                    marginBottom: 6,
                    backgroundColor: "#ded3fb",
                    padding: 10,
                    borderRadius: 22,
                  }}
                >
                  <CircleCheckBig size={20} />
                  <Text
                    style={{
                      fontFamily: Fonts.figtree.medium,
                      color: "#727272be",
                    }}
                  >
                    Finance
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 6,
                    alignItems: "center",
                    marginBottom: 6,
                    backgroundColor: "#f7eac8",
                    padding: 10,
                    borderRadius: 22,
                  }}
                >
                  <CircleCheckBig size={20} />
                  <Text
                    style={{
                      fontFamily: Fonts.figtree.medium,
                      color: "#727272be",
                    }}
                  >
                    Design
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 30,
                  backgroundColor: "#000",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >
                <Image
                  source={require("@/assets/icons/add.png")}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: "#fff",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 4. Latest Messages - WhatsApp-like Chat Section */}
        <View style={styles.messagesSection}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { fontFamily: Fonts.figtree.semibold },
              ]}
            >
              Latest messages
            </Text>
            <Text style={[styles.seeAll, { fontFamily: Fonts.figtree.medium }]}>
              See All
            </Text>
          </View>

          <View style={styles.chatContainer}>
            <FlatList
              data={[
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
              ]}
              keyExtractor={(item) => item.id}
              scrollEnabled={false} // Important: disable scrolling inside ScrollView
              renderItem={({ item }) => (
                <View style={styles.chatItem}>
                  {/* Avatar */}
                  <View style={styles.chatAvatar}>
                    <Image
                      source={item.src}
                      style={{ width: 48, height: 48 }}
                    />
                  </View>

                  {/* Chat Info */}
                  <View style={styles.chatInfo}>
                    <View style={styles.chatHeader}>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.chatName}>{item.name}</Text>
                        {item.unread > 0 && (
                          <View style={styles.unreadBadge}>
                            <Text style={styles.unreadText}>{item.unread}</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.chatTime}>{item.time}</Text>
                    </View>
                    <Text style={styles.chatMessage} numberOfLines={1}>
                      {item.message}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 100, // extra space at bottom
  },

  // 1. Welcome
  welcomeSection: {
    marginTop: 20,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  welcomeDescription: {
    fontSize: 16,
    color: "#666",
    marginTop: 6,
    lineHeight: 22,
  },

  // 2. Main Grid (Improved - Tall left + Two right boxes)
  gridContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
    height: 280, // ← Total height of the grid (adjust if needed)
  },
  tallBoxContainer: {
    flex: 1, // Left column takes equal width
  },
  rightColumn: {
    flex: 1, // Right column same width
    justifyContent: "space-between", // Pushes the two boxes apart
    gap: 12, // Gap between the two right boxes
  },

  gridBox: {
    borderRadius: 16,
    padding: 16,
    flex: 1, // Makes each box fill its container
  },
  leftGrid: {
    backgroundColor: "#ded3fd",
    flex: 1,
    borderRadius: 30,
  },
  rightTopGrid: {
    backgroundColor: "#f8e9c8",
    flex: 1,
    borderRadius: 30,
  },
  rightBottomGrid: {
    backgroundColor: "#deecec",
    flex: 1,
    borderRadius: 30,
  },

  // 3. Two Column Boxes
  twoColumnContainer: {
    flexDirection: "row",
    gap: 7,
    marginBottom: 28,
    backgroundColor: "#f6f4fcad",
    padding: 6,
    borderRadius: 30,
  },
  twoColBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: "#828282",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  tasksBox: {
    flex: 1,
  },
  notesBox: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  // 4. Messages Section
  messagesSection: {},
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAll: {
    color: "#38393a65",
    fontWeight: "500",
  },
  chatContainer: {
    backgroundColor: "#f6f4fca9",
    padding: 10,
    borderRadius: 20,
  },

  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: "#000000b1",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
  },
  chatAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
  },
  chatTime: {
    fontSize: 12,
    color: "#888",
  },
  chatMessage: {
    fontSize: 14,
    color: "#999",
  },
  unreadBadge: {
    backgroundColor: "#ff3a30d6",
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  // Existing header styles...
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: { width: 60, justifyContent: "center", alignItems: "flex-start" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  right: { width: 60, justifyContent: "center", alignItems: "flex-end" },
  title: { fontSize: 18, fontWeight: "600" },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ccc",
  },
  action: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#ccc",
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  boxSubtitle: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
});
