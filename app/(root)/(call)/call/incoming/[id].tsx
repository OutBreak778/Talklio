import { useLocalSearchParams, useRouter } from "expo-router";
import { Phone, PhoneOff, Video } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function IncomingCallScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Mock data - replace with real data later
  const caller = {
    name: "Sarah Williams",
    avatar: "https://i.pravatar.cc/300?u=sarah",
    callType: "video", // "voice" or "video"
  };

  return (
    <View style={styles.container}>
      <View style={styles.background} />

      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: caller.avatar }} style={styles.avatar} />
        </View>

        {/* Caller Info */}
        <Text style={styles.name}>{caller.name}</Text>
        <Text style={styles.callType}>
          {caller.callType === "video"
            ? "Incoming Video Call"
            : "Incoming Voice Call"}
        </Text>

        <Text style={styles.status}>Ringing...</Text>
      </View>

      {/* Bottom Action Buttons */}
      <View style={styles.actionsContainer}>
        {/* Decline Button */}
        <TouchableOpacity
          style={[styles.actionButton, styles.declineButton]}
          onPress={() => router.back()}
        >
          <PhoneOff size={32} color="#fff" />
          <Text style={styles.actionLabel}>Decline</Text>
        </TouchableOpacity>

        {/* Accept Button */}
        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => {
            // Navigate to ongoing call
            router.replace({
              pathname: "/(root)/(call)/call/incoming/[id]",
              params: { id },
            });
          }}
        >
          {caller.callType === "video" ? (
            <Video size={32} color="#fff" />
          ) : (
            <Phone size={32} color="#fff" />
          )}
          <Text style={styles.actionLabel}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#1e2937",
    opacity: 0.95,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 30,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: "#fff",
  },
  name: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  callType: {
    fontSize: 18,
    color: "#94a3b8",
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    color: "#22c55e",
    fontWeight: "500",
  },

  /* Bottom Actions */
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 80,
    paddingHorizontal: 40,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  declineButton: {
    backgroundColor: "#ef4444",
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  acceptButton: {
    backgroundColor: "#22c55e",
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  actionLabel: {
    color: "#fff",
    marginTop: 12,
    fontSize: 15,
    fontWeight: "600",
  },
});
