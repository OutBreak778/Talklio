import { useLocalSearchParams, useRouter } from "expo-router";
import { PhoneOff, Volume2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OutgoingCallScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [isRinging, setIsRinging] = useState(true);

  // Auto accept simulation (remove later)
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace({
        pathname: "/(root)/(call)/call/outgoing/[id]",
        params: { id },
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.background} />

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>

        <Text style={styles.name}>Sarah Williams</Text>
        <Text style={styles.status}>
          {isRinging ? "Ringing..." : "Calling..."}
        </Text>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.controlButton}>
          <Volume2 size={28} color="#fff" />
          <Text style={styles.controlLabel}>Speaker</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.endButton]}
          onPress={() => router.back()}
        >
          <PhoneOff size={34} color="#fff" />
          <Text style={styles.controlLabel}>End</Text>
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
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 40,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#475569",
  },
  name: {
    fontSize: 30,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  status: {
    fontSize: 18,
    color: "#94a3b8",
  },

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 80,
    paddingHorizontal: 60,
  },
  controlButton: {
    alignItems: "center",
  },
  controlLabel: {
    color: "#cbd5e1",
    marginTop: 8,
    fontSize: 14,
  },
  endButton: {
    backgroundColor: "#ef4444",
    width: 75,
    height: 75,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
