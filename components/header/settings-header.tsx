import Fonts from "@/utils/constants";
import {
  EllipsisVertical,
  MessageCircle,
  Settings,
  Star,
  Users,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SettingHeader = ({ unreadCount }: any) => {
  const inputRef = useRef<RNTextInput>(null);
  const chatTranslateX = useRef(new Animated.Value(0)).current;
  const chatOpacity = useRef(new Animated.Value(1)).current;
  const [showMenu, setShowMenu] = useState(false);
  const menuPosition = useRef({ x: 0, y: 0 });

  const handleMenuPress = () => {
    setShowMenu(!showMenu);
  };
  const handleMenuAction = (action: string) => {
    setShowMenu(false);
    if (action === "newGroup") {
      console.log("New Group");
    } else if (action === "newBroadcast") {
      console.log("New Broadcast");
    } else if (action === "starred") {
      console.log("Starred Messages");
    } else if (action === "settings") {
      console.log("Settings");
    }
  };

  return (
    <View style={styles.header}>
      {/* LEFT: Profile + Name */}
      <Animated.View
        style={[
          styles.left,
          {
            transform: [{ translateX: chatTranslateX }],
            opacity: chatOpacity,
          },
        ]}
      >
        <Text style={[styles.name, { fontFamily: Fonts.figtree.semibold }]}>
          Settings
        </Text>
      </Animated.View>

      {/* RIGHT: Search */}
      {/* <View style={[styles.searchContainer]}>
          <Animated.View
            style={[
              styles.inputWrapper,
              { width: inputWidth, alignSelf: "flex-end" },
            ]}
          >
            <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
              <View style={styles.searchInner}>
                <Search
                  size={18}
                  color={isFocused || searchText ? "#999" : "#999"}
                />
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  placeholder={isFocused ? "Search..." : "Search"}
                  placeholderTextColor="#bbb"
                  value={searchText}
                  onChangeText={setSearchText}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
                {searchText.length > 0 && (
                  <TouchableOpacity
                    onPress={handleClear}
                    style={styles.clearButton}
                  >
                    <Text style={styles.clearText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>

          {isFocused && (
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View> */}
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          borderRadius: 50,
          borderRightWidth: 0.4,
          borderRightColor: "#99999972",
          marginLeft: 8,
        }}
        onPress={handleMenuPress}
      >
        <EllipsisVertical size={20} />
      </TouchableOpacity>
      {showMenu && (
        <>
          <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
            <View style={styles.menuOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuAction("newGroup")}
            >
              <Users size={18} color="#1a1a1a" />
              <Text style={styles.menuText}>New group</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuAction("newBroadcast")}
            >
              <MessageCircle size={18} color="#1a1a1a" />
              <Text style={styles.menuText}>New broadcast</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuAction("starred")}
            >
              <Star size={18} color="#1a1a1a" />
              <Text style={styles.menuText}>Starred messages</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuAction("settings")}
            >
              <Settings size={18} color="#1a1a1a" />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  left: {
    flex: 1, // 👈 THIS is critical
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 32,
    fontWeight: "600",
    color: "#1a1a1a",
    letterSpacing: -0.5,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  inputWrapper: {
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  searchInner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    position: "relative",
  },

  input: {
    flex: 1,
    height: 44,
    fontSize: 15,
    color: "#1c1c1c",
    padding: 0,
    margin: 0,
    marginLeft: 8,
    backgroundColor: "transparent",
  },

  clearButton: {
    padding: 4,
    marginLeft: 4,
  },

  clearText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },

  cancelButton: {
    paddingHorizontal: 8,
  },

  cancelText: {
    fontSize: 15,
    color: "#007aff",
    fontWeight: "500",
  },

  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 9,
  },
  dropdownMenu: {
    position: "absolute",
    top: 60,
    right: 10,
    marginTop: 3,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  menuText: {
    fontSize: 15,
    color: "#1a1a1a",
    fontFamily: Fonts.figtree.medium,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 4,
  },
});

export default SettingHeader;
