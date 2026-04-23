import { icons } from "@/utils/icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  LayoutChangeEvent,
  Pressable,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_ITEMS = [
  { name: "dashboard", icon: icons.home },
  { name: "chat", icon: icons.chat },
  { name: "call", icon: icons.telephone },
  { name: "settings", icon: icons.setting },
];

const TAB_HEIGHT = 58;

function AnimatedTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const [tabOffsets, setTabOffsets] = useState<number[]>([]);
  const longPressTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const PILL_WIDTH = Math.min(tabWidths[state.index] * 0.85, 80);

  const pillX = useRef(new Animated.Value(0)).current;
  const pillScaleX = useRef(new Animated.Value(1)).current;
  const pillScaleY = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (tabOffsets.length === 0) return;

    const toX =
      tabOffsets[state.index] + (tabWidths[state.index] - PILL_WIDTH) / 2;

    // Liquid stretch: squash horizontally then snap back
    Animated.sequence([
      Animated.parallel([
        Animated.spring(pillX, {
          toValue: toX,
          useNativeDriver: true,
          damping: 18,
          stiffness: 200,
          mass: 0.8,
        }),
        // Stretch wide as it moves
        Animated.sequence([
          Animated.timing(pillScaleX, {
            toValue: 1.5,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.spring(pillScaleX, {
            toValue: 1,
            damping: 10,
            stiffness: 300,
            useNativeDriver: true,
          }),
        ]),
        // Squash vertically as it stretches
        Animated.sequence([
          Animated.timing(pillScaleY, {
            toValue: 0.75,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.spring(pillScaleY, {
            toValue: 1,
            damping: 10,
            stiffness: 300,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();
  }, [state.index, tabOffsets]);

  const handleLayout = (index: number) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    setTabOffsets((prev) => {
      const next = [...prev];
      next[index] = x;
      return next;
    });
    setTabWidths((prev) => {
      const next = [...prev];
      next[index] = width;
      return next;
    });
  };

  const handlePressIn = (tabName: string) => {
    longPressTimeout.current = setTimeout(() => {
      // On long press, navigate to the tab
      navigation.navigate(tabName);
    }, 500); // 500ms long press delay
  };

  const handlePressOut = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  };

  const handlePress = (tabName: string) => {
    // Normal tap navigation
    navigation.navigate(tabName);
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: Math.max(insets.bottom, 12),
        marginHorizontal: 15,
        left: 0,
        right: 0,
        height: TAB_HEIGHT,
        borderRadius: 30,
        backgroundColor: "#262628",
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#999",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 3,
        overflow: "hidden",
      }}
    >
      {/* Liquid pill */}
      <Animated.View
        style={{
          position: "absolute",
          width: PILL_WIDTH,
          height: 45,
          marginBottom: 1,
          borderRadius: 30,
          overflow: "hidden",
          transform: [
            { translateX: pillX },
            { scaleX: pillScaleX },
            { scaleY: pillScaleY },
          ],
        }}
      >
        {/* 💧 Base liquid gradient */}
        <LinearGradient
          colors={["#6B7280", "#3F3F46", "#1F2937"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: 30,
          }}
        />

        {/* ✨ Top shine (water reflection) */}
        <LinearGradient
          colors={["rgba(255,255,255,0.4)", "transparent"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            position: "absolute",
            top: 1,
            left: 6,
            right: 6,
            height: 12,
            borderRadius: 20,
          }}
        />

        {/* 🌊 Soft inner glow */}
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: 30,
            backgroundColor: "rgba(255,255,255,0.05)",
          }}
        />
      </Animated.View>

      {TAB_ITEMS.map((tab, index) => {
        const focused = state.index === index;
        return (
          <Pressable
            key={tab.name}
            onLayout={handleLayout(index)}
            onPress={() => handlePress(tab.name)}
            onPressIn={() => handlePressIn(tab.name)}
            onPressOut={handlePressOut}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              paddingHorizontal: 16,
            }}
          >
            <Image
              source={tab.icon}
              resizeMode="contain"
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? "#fff" : "#888",
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="chat"
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {TAB_ITEMS.map(({ name }) => (
        <Tabs.Screen key={name} name={name} />
      ))}
    </Tabs>
  );
}
