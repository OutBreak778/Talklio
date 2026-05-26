import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Check, ChevronLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddNote() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");

  // Auto update date & time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      };
      setDateTime(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    if (!title.trim() && !description.trim()) return;

    // TODO: Save note logic here
    console.log({ title, description, dateTime });
    router.back();
  };

  const charCount = description.length;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient
          colors={["#a5d6f039", "#fff", "#fbeee521", "#93d9f953"]}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.headerButton}
          >
            <ChevronLeft size={28} color="#1a1a1a" strokeWidth={2.2} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>New Note</Text>

          <TouchableOpacity
            onPress={handleSave}
            style={[styles.headerButton, styles.doneButton]}
            disabled={!title.trim() && !description.trim()}
          >
            <Check size={24} color="#1a1a1a" strokeWidth={2.3} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title Input */}
          <TextInput
            style={styles.titleInput}
            placeholder="Note Title"
            placeholderTextColor="#9ca3af"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />

          {/* Date & Character Count */}
          <View style={styles.metaRow}>
            <Text style={styles.dateTime}>{dateTime}</Text>
            <Text style={styles.charCount}>{charCount} characters</Text>
          </View>

          {/* Description Input */}
          <TextInput
            style={styles.descriptionInput}
            placeholder="Write your note here..."
            placeholderTextColor="#9ca3af"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  headerButton: {
    marginRight: 16,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: "#d9d9d975",
    elevation: 1,
  },
  doneButton: {
    opacity: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  /* Title */
  titleInput: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1a1a1a",
    paddingVertical: 12,
    marginBottom: 8,
  },

  /* Meta Row */
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  dateTime: {
    fontSize: 14,
    color: "#6b7280",
  },
  charCount: {
    fontSize: 14,
    color: "#9ca3af",
  },

  /* Description */
  descriptionInput: {
    flex: 1,
    fontSize: 17,
    lineHeight: 26,
    color: "#374151",
    paddingVertical: 8,
    minHeight: 300,
  },
});
