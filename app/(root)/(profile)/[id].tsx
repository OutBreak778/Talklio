// app/(main)/profile/[id].tsx

import TasksHeader from "@/components/header/tasks-header";
import Fonts from "@/utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Copy, Phone, Video } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function UserProfile() {
  const { id, name, title, avatar } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);

  const callHistory = [
    {
      id: 1,
      type: "audio",
      incoming: true,
      missed: false,
      time: "Today, 10:45 AM",
      duration: "12 min",
    },
    {
      id: 2,
      type: "video",
      incoming: false,
      missed: false,
      time: "Yesterday, 06:20 PM",
      duration: "34 min",
    },
    {
      id: 3,
      type: "audio",
      incoming: true,
      missed: true,
      time: "May 19, 02:15 PM",
      duration: "07 min",
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={["#a5d6f039", "#fff", "#fbeee521", "#93d9f953"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={StyleSheet.absoluteFillObject}
      />
      <TasksHeader
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        placeholder="name..."
        name={"Profile"}
        isVisible={false}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                avatar
                  ? { uri: avatar as string }
                  : require("@/assets/images/image-1.jpg")
              }
              style={styles.avatar}
              resizeMode="cover"
            />
            {/* <View style={styles.onlineDot} /> */}
          </View>
        </View>

        {/* Name & Title */}
        <View style={styles.infoSection}>
          <Text style={styles.name}>{name}</Text>
          {title && <Text style={styles.title}>{title}</Text>}
        </View>

        {/* Phone Number Card */}
        <View style={styles.phoneCard}>
          <Text style={styles.sectionLabel}>Phone Number</Text>
          <View style={styles.phoneRow}>
            <Text style={styles.phoneNumber}>+91 98765 43210</Text>
            <TouchableOpacity style={styles.copyButton}>
              <Copy size={20} color="#007aff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Call Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.actionButton, styles.audioButton]}
            onPress={() => console.log("Audio Call")}
          >
            <Phone size={26} color="#fff" />
            <Text style={styles.actionText}>Audio Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.actionButton, styles.videoButton]}
            onPress={() => console.log("Video Call")}
          >
            <Video size={26} color="#fff" />
            <Text style={styles.actionText}>Video Call</Text>
          </TouchableOpacity>
        </View>

        {/* Call History */}
        <View style={styles.historyCard}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.sectionTitle}>Call History</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.sectionTitleDesc}>See All</Text>
            </TouchableOpacity>
          </View>

          {callHistory.map((call, index) => (
            <View
              key={call.id}
              style={[
                styles.historyItem,
                index !== callHistory.length - 1 && styles.borderBottom,
              ]}
            >
              <View style={styles.historyIconContainer}>
                {call.type === "video" ? (
                  <Video
                    size={24}
                    color={call.missed ? "#ff3a30" : "#007aff"}
                  />
                ) : (
                  <Phone
                    size={24}
                    color={call.missed ? "#ff3a30" : "#34c759"}
                  />
                )}
              </View>

              <View style={styles.historyInfo}>
                <Text style={styles.historyType}>
                  {call.missed
                    ? "Missed"
                    : call.incoming
                      ? "Incoming"
                      : "Outgoing"}{" "}
                  {call.type === "video" ? "Video" : "Call"}
                </Text>
                <Text style={styles.historyTime}>{call.time}</Text>
              </View>

              <Text style={styles.historyDuration}>{call.duration}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 30, paddingHorizontal: 16 },

  /* Avatar */
  avatarSection: { alignItems: "center", marginTop: 20, marginBottom: 24 },
  avatarContainer: { position: "relative" },
  avatar: {
    width: 138,
    height: 138,
    borderRadius: 70,
    backgroundColor: "#f0f0f0",
  },
  onlineDot: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#34c759",
    borderWidth: 3,
    borderColor: "#fff",
  },

  /* Info */
  infoSection: { alignItems: "center", marginBottom: 32 },
  name: {
    fontSize: 26,
    fontFamily: Fonts.figtree.semibold,
    color: "#1a1a1a",
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    color: "#666",
    fontFamily: Fonts.figtree.regular,
  },

  /* Phone Card */
  phoneCard: {
    backgroundColor: "#fff",
    borderRadius: 26,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
    fontFamily: Fonts.figtree.medium,
  },
  phoneRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  phoneNumber: {
    fontSize: 17.5,
    fontFamily: Fonts.figtree.semibold,
    color: "#1a1a1a",
  },
  copyButton: { padding: 6 },

  /* Action Buttons */
  actionContainer: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 32,
  },

  actionButton: {
    flex: 1,
    height: 74,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 3,
  },

  /* Dashboard Matching Colors */
  audioButton: {
    backgroundColor: "#34c759e8", // Same green used in dashboard
  },

  videoButton: {
    backgroundColor: "#007affe8", // Same blue used in dashboard (Voice Calls)
  },

  actionText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: Fonts.figtree.semibold,
    fontWeight: "600",
  },

  /* History Card */
  historyCard: {
    backgroundColor: "#fff",
    borderRadius: 26,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 19,
    fontFamily: Fonts.figtree.semibold,
    color: "#1a1a1a",
    marginBottom: 18,
  },
  sectionTitleDesc: {
    fontSize: 13,
    fontFamily: Fonts.figtree.semibold,
    color: "#1a1a1a76",
    marginBottom: 18,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  historyIconContainer: {
    width: 48,
    alignItems: "center",
  },
  historyInfo: { flex: 1 },
  historyType: {
    fontSize: 16,
    fontFamily: Fonts.figtree.medium,
    color: "#1a1a1a",
  },
  historyTime: {
    fontSize: 13.5,
    color: "#888",
    marginTop: 3,
  },
  historyDuration: {
    fontSize: 15,
    fontFamily: Fonts.figtree.medium,
    color: "#555",
  },
});
