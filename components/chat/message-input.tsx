import {
  AudioLines,
  Files,
  Image,
  Plus,
  Send
} from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface MessageInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

export default function MessageInput({
  value,
  onChangeText,
  onSend,
}: MessageInputProps) {
  const [activeButton, setActiveButton] = useState<string>("file");

  const actionButtons = [
    { id: "file", icon: Files, label: "Files" },
    { id: "image", icon: Image, label: "Images" },
    { id: "audio", icon: AudioLines, label: "Audio" },
    { id: "plus", icon: Plus, label: "More" },
  ];

  return (
    <View style={styles.container}>
      {/* Row 1: Input with overlapping Send button */}
      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            value={value}
            onChangeText={onChangeText}
            multiline
            numberOfLines={5}
            maxLength={500}
            textAlignVertical="top"
          />
          <TouchableOpacity
            onPress={onSend}
            style={[
              styles.sendButton,
              !value.trim() && styles.sendButtonDisabled,
            ]}
            disabled={!value.trim()}
          >
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Row 2: Action Buttons */}
      <View style={styles.actionsRow}>
        {actionButtons.map((button) => {
          const Icon = button.icon;
          const isActive = activeButton === button.id;

          return (
            <TouchableOpacity
              key={button.id}
              style={[
                styles.actionButton,
                isActive && styles.actionButtonActive,
              ]}
              onPressIn={() => setActiveButton(button.id)}
              activeOpacity={1}
            >
              <Icon
                size={20}
                color={isActive ? "#FFFFFF" : "#6B7280"}
                strokeWidth={2}
              />
              <Text
                style={[
                  styles.actionLabel,
                  isActive && styles.actionLabelActive,
                ]}
              >
                {button.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  inputRow: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 18,
    paddingRight: 56,
    fontSize: 16,
    maxHeight: 120,
    backgroundColor: "#F9FAFB",
    textAlignVertical: "top",
  },
  sendButton: {
    position: "absolute",
    bottom: "19%",
    right: 13,
    backgroundColor: "#000000",
    borderRadius: 14,
    padding: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  sendButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    gap: 8,
    minWidth: 70,
    justifyContent: "center",
  },
  actionButtonActive: {
    backgroundColor: "#000000",
  },
  actionLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  actionLabelActive: {
    color: "#FFFFFF",
  },
});
