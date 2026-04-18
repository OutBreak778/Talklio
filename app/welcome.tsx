import {
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React from "react";
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const WelcomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation<any>();

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const navigateToDashboard = () => {
    navigate.navigate("(auth)/sign-in");
  };

  if (!fontsLoaded) return null;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Elegant Soft Gradient Background */}
      <LinearGradient
        colors={["#bae5fd5f", "#fff", "#f4d9c721", "#7dd4fc8c"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 0.8, y: 1.0 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.content}>
        {/* Classic Modern Header */}
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
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/welcome-1-removebg-preview.png")}
            style={styles.pattern}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.bottomTitle}>Connect instantly, anytime.</Text>
        </View>

        <Text style={styles.bottomDescription}>
          Stay close with friends and family through messages, voice calls, and
          video{"\n"} fast and secure.
        </Text>

        <TouchableOpacity
          onPress={navigateToDashboard}
          style={styles.mainButton}
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
  content: {
    paddingHorizontal: 32,
  },
  header: {
    alignItems: "flex-start",
    marginTop: 20, // 👈 pulls header closer to image
  },
  title: {
    fontSize: 27,
    fontFamily: "Poppins_500Medium",
    color: "#475569",
    textAlign: "center",
  },
  appNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -18,
  },
  logo: {
    width: 58,
    height: 58,
  },
  appName: {
    fontSize: 45,
    fontFamily: "Poppins_700Bold",
    color: "#1e40af",
    letterSpacing: -1.2,
    marginLeft: 8,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  pattern: {
    width: "120%",
    height: 400,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 90,
    left: 0,
    right: 0,
    paddingHorizontal: 32,
  },

  bottomTitle: {
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 8,
  },

  bottomDescription: {
    fontSize: 15.5,
    fontFamily: "Poppins_500Medium",
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },

  mainButton: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    marginTop: 20,
  },

  mainButtonText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Poppins_600SemiBold",
  },
});

export default WelcomeScreen;
