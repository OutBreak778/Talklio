import Fonts from "@/utils/constants";
import { Image } from "expo-image";
import { Search } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
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

      {/* RIGHT: Search */}
      <View style={styles.right}>
        {/* <View style={styles.searchIcon} /> */}
        <Search size={20} />
      </View>
    </View>
  );
};

export default Header;

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
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 10,
    paddingRight: 6,
  },

  right: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  name: {
    fontSize: 26,
    marginTop: 8,
    lineHeight: 40,
    fontWeight: "600",
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
