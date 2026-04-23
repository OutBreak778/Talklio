import Fonts from "@/utils/constants";
import { Image } from "expo-image";
import { BellDot } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const DashboardHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {/* LEFT: Profile + Name */}
      <View style={styles.left}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.avatar}
        />
        <Text style={[styles.name, { fontFamily: Fonts.figtree.medium }]}>
          Nikhil
        </Text>
      </View>

      {/* RIGHT: Notification Bell */}
      <TouchableOpacity
        activeOpacity={0.6} // 👈 gives slight fade (NOT full white flash)
        onPress={() => router.navigate("/(root)/notification")}
        style={{
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          borderRadius: 50,
          borderRightWidth: 0.4,
          borderRightColor: "#99999972",
        }}
      >
        <BellDot size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#bbbbbb28",
    borderRadius: 50,
    paddingRight: 6,
  },

  right: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  name: {
    fontSize: 26,
    lineHeight: 40,
    fontWeight: "600",
    marginRight: 10,
  },

  // placeholders
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 38,
    borderWidth: 0.7,
    borderColor: "#c2c0c036",
    backgroundColor: "#ccc",
  },

  searchIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: "#ccc",
  },
});
