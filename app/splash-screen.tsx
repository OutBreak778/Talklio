import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { runOnJS } from "react-native-worklets";

const SplashScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const logoOpacity = useSharedValue(0);
  const nameOpacity = useSharedValue(0);

  useEffect(() => {
    // 1. Show logo + name with fade-in
    logoOpacity.value = withTiming(1, { duration: 800 });
    nameOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));

    // 2. Navigate after ~5 seconds
    const navigateTimer = setTimeout(() => {
      runOnJS(() => {
        navigation.replace("welcome");
      })();
    }, 3000);

    return () => clearTimeout(navigateTimer);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <LinearGradient
        colors={["#bae5fd5f", "#fff", "#f4d9c721", "#7dd4fc8c"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Centered Logo + Name */}
      <Animated.View style={styles.content}>
        <Animated.Image
          source={require("@/assets/images/icons.png")}
          style={[styles.logo, { opacity: logoOpacity }]}
          resizeMode="contain"
        />

        <Animated.Text style={[styles.appName, { opacity: nameOpacity }]}>
          Talklio
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  logo: {
    width: 170,
    height: 170,
  },
  appName: {
    fontSize: 54,
    fontWeight: "700",
    color: "#262628",
  },
});

export default SplashScreen;
