import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export const ChipsList = ({ chips, onChipPress, initialActiveChip }: any) => {
  const [activeId, setActiveId] = useState(initialActiveChip);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipsContainer}
    >
      {chips.map((chip: any) => (
        <TouchableOpacity
          key={chip.id}
          style={[styles.chip, activeId === chip.id && styles.chipActive]}
          onPress={() => {
            setActiveId(chip.id);
            onChipPress(chip);
          }}
        >
          {React.cloneElement(chip.icon, {
            color: activeId === chip.id ? "#fff" : "#666",
            size: 14,
          })}
          <Text
            style={[
              styles.chipText,
              activeId === chip.id && styles.chipTextActive,
            ]}
          >
            {chip.label}
          </Text>
          {chip.count > 0 && (
            <View
              style={[
                styles.chipCount,
                activeId === chip.id && styles.chipCountActive,
              ]}
            >
              <Text
                style={[
                  styles.chipCountText,
                  activeId === chip.id && styles.chipCountTextActive,
                ]}
              >
                {chip.count}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chipsWrapper: {
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  chipsContainer: {
    gap: 10,
    paddingVertical: 4,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 0, // Remove vertical padding
    borderRadius: 15, // Half of height (30/2 = 15)
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    gap: 4,
    height: 40, // Fixed height for chip
  },
  chipActive: {
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  chipText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  chipTextActive: {
    color: "#fff",
  },
  chipCount: {
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 20,
    alignItems: "center",
  },
  chipCountActive: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  chipCountText: {
    fontSize: 11,
    color: "#666",
    fontWeight: "600",
  },
  chipCountTextActive: {
    color: "#fff",
  },
});
