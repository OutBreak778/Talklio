import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Mic,
    MicOff,
    PhoneOff,
    Video,
    VideoOff,
    Volume2
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function OngoingCallScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [isVideo, setIsVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setDuration((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <View style={styles.background} />

      {isVideo ? (
        /* ==================== VIDEO CALL UI ==================== */
        <View style={styles.videoContainer}>
          <Text style={styles.videoPlaceholder}>Remote Video Feed</Text>
          <View style={styles.localVideo}>
            <Text style={styles.localText}>You</Text>
          </View>
        </View>
      ) : (
        /* ==================== VOICE CALL UI ==================== */
        <View style={styles.voiceContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar} />
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.status}>
            Connected • {formatDuration(duration)}
          </Text>
        </View>
      )}

      {/* Bottom Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setIsMuted(!isMuted)}
        >
          {isMuted ? (
            <MicOff size={28} color="#fff" />
          ) : (
            <Mic size={28} color="#fff" />
          )}
          <Text style={styles.controlLabel}>Mute</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setIsSpeaker(!isSpeaker)}
        >
          <Volume2 size={28} color="#fff" />
          <Text style={styles.controlLabel}>Speaker</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setIsVideo(!isVideo)}
        >
          {isVideo ? (
            <VideoOff size={28} color="#fff" />
          ) : (
            <Video size={28} color="#fff" />
          )}
          <Text style={styles.controlLabel}>
            {isVideo ? "Stop Video" : "Video"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.endButton]}
          onPress={() => router.back()}
        >
          <PhoneOff size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#1e2937",
  },
  voiceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#64748b",
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  status: {
    fontSize: 16,
    color: "#94a3b8",
  },

  /* Video Mode */
  videoContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  videoPlaceholder: {
    color: "#fff",
    fontSize: 18,
  },
  localVideo: {
    position: "absolute",
    bottom: 120,
    right: 20,
    width: 100,
    height: 140,
    backgroundColor: "#334155",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  localText: { color: "#fff", fontSize: 12 },

  /* Controls */
  controlsContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  controlButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
  },
  controlLabel: {
    color: "#cbd5e1",
    fontSize: 12,
    marginTop: 6,
  },
  endButton: {
    backgroundColor: "#ef4444",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});
