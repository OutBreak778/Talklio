import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// Types
export interface Chip {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactElement<{ color?: string }>;
}

export interface ChipsListProps {
  chips: Chip[];
  onChipPress?: (chip: Chip) => void;
  initialActiveChip?: string;
  containerStyle?: ViewStyle;
  chipStyle?: ViewStyle;
  chipActiveStyle?: ViewStyle;
  chipTextStyle?: TextStyle;
  chipTextActiveStyle?: TextStyle;
}

const ChipsList: React.FC<ChipsListProps> = ({
  chips,
  onChipPress,
  initialActiveChip,
  containerStyle,
  chipStyle,
  chipActiveStyle,
  chipTextStyle,
  chipTextActiveStyle,
}) => {
  const [activeChipId, setActiveChipId] = useState<string>(
    initialActiveChip || chips[0]?.id || "",
  );

  const handleChipPress = (chip: Chip): void => {
    setActiveChipId(chip.id);
    if (onChipPress) {
      onChipPress(chip);
    }
  };

  const renderChip = ({ item }: { item: Chip }) => {
    const isActive = activeChipId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.chip,
          chipStyle,
          isActive && [styles.chipActive, chipActiveStyle],
        ]}
        onPress={() => handleChipPress(item)}
        activeOpacity={0.7}
      >
        {item.icon &&
          React.cloneElement(item.icon as React.ReactElement, {
            color: isActive ? "#fff" : "#222",
          })}
        <Text
          style={[
            styles.chipText,
            chipTextStyle,
            isActive && [styles.chipTextActive, chipTextActiveStyle],
          ]}
        >
          {item.label}
        </Text>
        {item.count !== undefined && item.count > 0 && (
          <View style={[styles.chipCount, isActive && styles.chipCountActive]}>
            <Text
              style={[
                styles.chipCountText,
                isActive && styles.chipCountTextActive,
              ]}
            >
              {item.count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={chips}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.chipsContainer, containerStyle]}
        renderItem={renderChip}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 40, // Fixed height for the wrapper
    marginBottom: 8,
    zIndex: 6,
  },
  chipsContainer: {
    gap: 10,
    height: 40, // Fixed height for the entire container
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
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    lineHeight: 30, // Match chip height for vertical centering
  },
  chipTextActive: {
    color: "#fff",
    marginLeft: 3,
  },
  chipIcon: {
    marginRight: 2,
  },
  chipActiveIcon: {
    color: "#fff",
  },
  chipCount: {
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 4,
    paddingVertical: 0,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  chipCountActive: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  chipCountText: {
    fontSize: 10,
    color: "#666",
    fontWeight: "600",
    lineHeight: 14,
  },
  chipCountTextActive: {
    color: "#fff",
  },
  chipIconActive: {
    color: "#fff",
  },
});

export default ChipsList;
