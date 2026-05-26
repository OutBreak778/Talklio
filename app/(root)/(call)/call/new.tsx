import TasksHeader from "@/components/header/tasks-header";
import Fonts, { callData } from "@/utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Phone, Video } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NewCallScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);

  const handleCallPress = (item: any) => {
    let avatarUri = "";

    // Convert require() to string path
    if (typeof item.avatar === "number") {
      const resolved = Image.resolveAssetSource(item.avatar);
      avatarUri = resolved?.uri || "";
    } else {
      avatarUri = item.avatar;
    }

    router.push({
      pathname: "/(root)/(profile)/[id]",
      params: {
        id: item.id,
        name: item.name,
        title: item.title || "",
        avatar: avatarUri,
        time: item.time,
        type: item.type,
        missed: item.missed,
        incoming: item.incoming,
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={["#a5d6f039", "#fff", "#fbeee521", "#93d9f953"]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header */}
      <TasksHeader
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        placeholder="here..."
        name={"Calls"}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.callsSection}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { fontFamily: Fonts.figtree.semibold },
              ]}
            >
              All Contacts
            </Text>
          </View>

          <View style={styles.callsContainer}>
            {callData.map((item) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.callItem,
                  pressed && styles.callItemPressed,
                ]}
                onPress={() => handleCallPress(item)}
              >
                {/* Avatar */}
                <View style={styles.callAvatar}>
                  <Image source={item.avatar} style={styles.avatarImage} />
                </View>

                {/* Call Info */}
                <View style={styles.callInfo}>
                  <View style={styles.callHeader}>
                    <View>
                      <Text
                        style={[
                          styles.callName,
                          { fontFamily: Fonts.figtree.semibold },
                        ]}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={[
                          styles.callTitle,
                          { fontFamily: Fonts.figtree.regular },
                        ]}
                      >
                        {item.title || ""}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.callActionButton}
                  activeOpacity={0.8}
                >
                  {item.type === "video" ? (
                    <Video size={22} color="#fff" />
                  ) : (
                    <Phone size={22} color="#fff" />
                  )}
                </TouchableOpacity>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 10,
  },

  callsSection: {
    paddingHorizontal: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  seeAll: {
    color: "#38393a65",
    fontWeight: "500",
    fontSize: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginHorizontal: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 10,
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1a1a1a",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 10,
    marginBottom: 7,
    color: "#1a1a1a",
  },
  listContent: { paddingBottom: 100 },

  // Calls Container - Same as chatContainer
  callsContainer: {
    backgroundColor: "#f1f0f5ee",
    padding: 12,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 38,
  },
  callActionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1184ffe9",
    justifyContent: "center",
    alignItems: "center",
  },
  // Call Items - Same as chatItem but modified for calls
  callItem: {
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
  callItemPressed: {
    backgroundColor: "#f8f8f8",
    transform: [{ scale: 0.98 }],
  },

  // Avatar - Same as Chat
  callAvatar: {
    width: 56,
    height: 56,
    borderRadius: 58,
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
  missedDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ff3a30",
    borderWidth: 2,
    borderColor: "#fff",
  },

  // Call Info - Same structure as chatInfo
  callInfo: {
    flex: 1,
    marginTop: 6,
  },
  callHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  callName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  callTitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  callButton: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },

  // Call Footer - New for calls
  callFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  callMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  callStatus: {
    fontSize: 12,
    color: "#666",
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#ccc",
  },
  callTime: {
    fontSize: 12,
    color: "#999",
  },
  callDuration: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
});
