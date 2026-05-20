import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Calendar,
  ChartNoAxesColumnIncreasing,
  Check,
  Inbox,
  Tag,
  User,
  X,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [taskTitle, setTaskTitle] = useState("");
  const [inputHeight, setInputHeight] = useState(200); // Increased from 100 to 150
  const [selectedChip, setSelectedChip] = useState("inbox");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const textInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const chips = [
    { id: "inbox", label: "Inbox", icon: Inbox },
    { id: "due", label: "Due Date", icon: Calendar },
    { id: "assignee", label: "Assignee", icon: User },
    { id: "priority", label: "Priority", icon: ChartNoAxesColumnIncreasing },
    { id: "label", label: "Label", icon: Tag },
  ];

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const handleSaveTask = () => {
    if (taskTitle.trim() === "") {
      navigation.goBack();
      return;
    }
    // TODO: Save task logic here
    navigation.goBack();
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleOutsideTap = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  const renderChip = ({ item }: any) => {
    const IconComponent = item.icon;
    const isActive = selectedChip === item.id;

    return (
      <TouchableOpacity
        style={[styles.smallChip, isActive && styles.smallChipActive]}
        onPress={() => setSelectedChip(item.id)}
        activeOpacity={0.8}
      >
        <IconComponent
          size={18}
          color={isActive ? "#FFFFFF" : "#707070"}
          strokeWidth={2.2}
        />
        <Text
          style={[styles.smallChipText, isActive && styles.smallChipTextActive]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <LinearGradient
        colors={["#a5d6f039", "#fff", "#fbeee521", "#93d9f953"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Main content with TouchableOpacity for outside tap */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleOutsideTap}
        style={styles.touchableContainer}
      >
        {/* Header - Don't close when tapping here */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={28} color="#1a1a1a" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        {/* ScrollView with dynamic bottom padding */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: keyboardHeight + 100 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Input Card - Don't close when tapping here */}
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <View style={styles.inputContainer}>
              <View style={[styles.inputUpper, { height: inputHeight }]}>
                <TextInput
                  ref={textInputRef}
                  style={styles.taskInput}
                  placeholder="What needs to be done?"
                  placeholderTextColor="#9CA3AF"
                  value={taskTitle}
                  onChangeText={setTaskTitle}
                  multiline
                  autoFocus
                  onContentSizeChange={(event) => {
                    const newHeight = Math.min(
                      Math.max(200, event.nativeEvent.contentSize.height + 20),
                      250,
                    );
                    setInputHeight(newHeight);
                  }}
                />
              </View>

              <View style={styles.inputBottom}>
                <View style={styles.chipsSection}>
                  <FlatList
                    data={chips}
                    renderItem={renderChip}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.chipRow}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Invisible spacer - ensures button can be pushed to bottom */}
          <View style={{ flex: 1 }} />
        </ScrollView>

        {/* Button Container - Don't close when tapping here */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={[
            styles.buttonContainer,
            { marginBottom: keyboardHeight + 10 },
          ]}
        >
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleSaveTask}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["#1a1a1a", "#2d2d2d"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.completeGradient}
            >
              <Check size={24} color="#FFFFFF" strokeWidth={3} />
              <Text style={styles.completeButtonText}>Complete & Add Task</Text>
            </LinearGradient>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  touchableContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: "#d9d9d975",
    elevation: 1,
    alignSelf: "flex-start",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 0,
    flexGrow: 1,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden",
  },
  inputUpper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  taskInput: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1a1a1a",
    lineHeight: 34,
  },
  inputBottom: {
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  chipsSection: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  chipRow: {
    gap: 10,
  },
  smallChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  smallChipActive: {
    backgroundColor: "#1a1a1a",
    borderColor: "#1a1a1a",
  },
  smallChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#707070",
  },
  smallChipTextActive: {
    color: "#FFFFFF",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "transparent",
  },
  completeButton: {
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#1a1a1a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  completeGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 18,
  },
  completeButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

export default AddTaskScreen;
