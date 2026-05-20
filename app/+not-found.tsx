import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { ArrowLeft, Clock, Hammer, Home } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NotFound() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={["#a5d6f039", "#fff", "#fbeee521", "#93d9f953"]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Hammer size={68} color="#1a1a1a" strokeWidth={1.4} />
        </View>

        {/* Badge */}
        <View style={styles.devBadge}>
          <Clock size={16} color="#3b82f6" />
          <Text style={styles.devText}>IN DEVELOPMENT</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Page Under Construction</Text>

        {/* Description */}
        <Text style={styles.description}>
          This feature is currently being built.{"\n"}
          We're working hard to bring it to you soon.
        </Text>

        <View style={styles.divider} />

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Link href="/(root)/(tabs)/dashboard" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <Home size={22} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={styles.primaryButtonText}>Return to Dashboard</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(root)/(tabs)/chat" asChild>
            <TouchableOpacity style={styles.secondaryButton}>
              <ArrowLeft size={22} color="#1a1a1a" strokeWidth={2.5} />
              <Text style={styles.secondaryButtonText}>Go Back</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#f6f4fcad",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  devBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 16,
  },
  devText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3b82f6",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#707070",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  divider: {
    width: 90,
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
    gap: 14,
    maxWidth: 320,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 10,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  secondaryButtonText: {
    color: "#1a1a1a",
    fontSize: 17,
    fontWeight: "600",
  },
});
