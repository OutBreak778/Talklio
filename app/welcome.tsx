import { useAuthStore } from "@/store/authStore";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const WelcomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation<any>();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.replace("/(root)/(tabs)/dashboard"); // ← Correct path
    }
  }, [isAuthenticated, isLoading, navigate]);

  const navigateToSignIn = () => {
    router.navigate("/(auth)/sign-in");
  };

  if (!fontsLoaded) return null;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Full-screen Elegant Gradient Background */}
      <LinearGradient
        colors={["#bae5fd5f", "#fff", "#f4d9c721", "#7dd4fc8c"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 0.8, y: 1.0 }}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.mainContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your space for</Text>
          <View style={styles.appNameContainer}>
            <Image
              source={require("@/assets/images/icons.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>Talklio</Text>
          </View>
        </View>

        {/* Responsive Illustration */}
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/welcome-1-removebg-preview.png")}
            style={styles.pattern}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Bottom Section - Always at safe bottom */}
      <View
        style={[styles.bottomContainer, { paddingBottom: insets.bottom + 20 }]}
      >
        <Text style={styles.bottomTitle}>Connect instantly, anytime.</Text>

        <Text style={styles.bottomDescription}>
          Stay close with friends and family through messages, voice calls, and
          video — fast and secure.
        </Text>

        <TouchableOpacity
          onPress={navigateToSignIn}
          style={styles.mainButton}
          activeOpacity={0.85}
        >
          <Text style={styles.mainButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center", // Centers content vertically when possible
  },

  header: {
    alignItems: "flex-start", // Changed to center for better balance
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontFamily: "Poppins_500Medium",
    color: "#475569",
    textAlign: "center",
  },

  appNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -12, // Reduced negative margin
  },

  logo: {
    width: 48,
    height: 48,
  },

  appName: {
    fontSize: 44,
    fontFamily: "Poppins_700Bold",
    color: "#1e40af",
    letterSpacing: -1.1,
    marginLeft: 8,
  },

  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // Allows image to take available space
    marginVertical: 20,
  },

  pattern: {
    width: "100%",
    maxWidth: 420, // Prevents it from becoming too wide on tablets/large phones
    height: undefined,
    aspectRatio: 0.7, // Adjust this based on your image's actual aspect ratio
    maxHeight: SCREEN_HEIGHT * 1, // Limits height to ~42% of screen
  },

  bottomContainer: {
    paddingHorizontal: 32,
    alignItems: "center",
  },

  bottomTitle: {
    fontSize: 31,
    fontFamily: "Poppins_700Bold",
    color: "#0f172a",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 12,
  },

  bottomDescription: {
    fontSize: 15.5,
    fontFamily: "Poppins_500Medium",
    color: "#64748b",
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 28,
  },

  mainButton: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.32,
    shadowRadius: 18,
    elevation: 12,
    width: "100%",
    maxWidth: 360,
  },

  mainButtonText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Poppins_600SemiBold",
  },
});

export default WelcomeScreen;
