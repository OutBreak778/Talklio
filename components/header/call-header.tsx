import Fonts from "@/utils/constants";
import { Search } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const MAX_WIDTH = SCREEN_WIDTH;
const MIN_WIDTH = 150;

const CallHeader = ({ isFocused, setIsFocused }: any) => {
  const [searchText, setSearchText] = useState("");
  const inputWidth = useRef(new Animated.Value(150)).current;
  const inputRef = useRef<RNTextInput>(null);
  const chatTranslateX = useRef(new Animated.Value(0)).current;
  const chatOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isFocused) {
      Animated.parallel([
        Animated.spring(inputWidth, {
          toValue: MAX_WIDTH,
          useNativeDriver: false,
          damping: 15,
          mass: 0.8,
          stiffness: 150,
        }),
        Animated.timing(inputWidth, {
          toValue: 316,
          duration: 450,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(chatTranslateX, {
          toValue: -150,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(chatOpacity, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(inputWidth, {
          toValue: MIN_WIDTH,
          useNativeDriver: false,
          damping: 15,
          mass: 0.8,
          stiffness: 150,
        }),
        Animated.timing(chatTranslateX, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(chatOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFocused]); // Remove searchText.length dependency

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    setSearchText("");
  };

  const handleCancel = () => {
    setSearchText("");
    setIsFocused(false);
    inputRef.current?.blur();
    Keyboard.dismiss();
  };

  const handleOutsidePress = () => {
    if (isFocused) {
      setIsFocused(false);
      Keyboard.dismiss();
      inputRef.current?.blur();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
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
            Calls
          </Text>
        </Animated.View>

        {/* RIGHT: Search */}
        <View style={[styles.searchContainer]}>
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
        </View>
        {/* <View
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
        >
          <EllipsisVertical size={20} />
        </View> */}
      </View>
    </TouchableWithoutFeedback>
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
});

export default CallHeader;
