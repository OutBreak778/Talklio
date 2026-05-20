import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Calendar,
  CheckSquare,
  ClipboardList,
  Clock,
  List,
  Plus,
  Sparkles,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TasksHeader from "../header/tasks-header";

// Type definitions - Fixed the icon type
interface Chip {
  id: string;
  label: string;
  icon: (active: boolean) => React.JSX.Element; // Changed from ReactNode to function
}

const TasksUIScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [activeChip, setActiveChip] = useState<string>("tasks");
  const [isFocused, setIsFocused] = useState(false);

  const chips: Chip[] = [
    {
      id: "today",
      label: "Today",
      icon: (active: boolean) => (
        <Calendar
          size={18}
          color={active ? "#FFFFFF" : "#707070"}
          strokeWidth={1.5}
        />
      ),
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: (active: boolean) => (
        <CheckSquare
          size={18}
          color={active ? "#FFFFFF" : "#707070"}
          strokeWidth={1.5}
        />
      ),
    },
    {
      id: "list",
      label: "List",
      icon: (active: boolean) => (
        <List
          size={18}
          color={active ? "#FFFFFF" : "#707070"}
          strokeWidth={1.5}
        />
      ),
    },
  ];

  const handleChipPress = (chipId: string): void => {
    setActiveChip(chipId);
  };

  const handleAddTask = (): void => {
    console.log("Navigate to add task screen");
    router.push("/(root)/(dashboard)/add-tasks");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Matching Dashboard Gradient */}
      <LinearGradient
        colors={["#a5d6f039", "#fff", "#fbeee521", "#93d9f953"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={StyleSheet.absoluteFillObject}
      />

      <TasksHeader
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        name={"Tasks"}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View style={{}}>
            {/* Chips Section */}
            <View style={styles.chipsContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsScroll}
              >
                {chips.map((chip: Chip) => {
                  const isActive = activeChip === chip.id;
                  return (
                    <TouchableOpacity
                      key={chip.id}
                      style={[styles.chip, isActive && styles.chipActive]}
                      onPress={() => handleChipPress(chip.id)}
                      activeOpacity={0.7}
                    >
                      {chip.icon(isActive)}
                      <Text
                        style={[
                          styles.chipLabel,
                          isActive && styles.chipLabelActive,
                        ]}
                      >
                        {chip.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Empty State - Matching dashboard card style */}
            <View style={styles.emptyStateContainer}>
              <View style={styles.emptyStateCard}>
                {/* Decorative top accent - Matching dashboard accent color */}
                <View style={styles.emptyStateAccent}>
                  <Sparkles size={16} color="#1a1a1a" strokeWidth={1.5} />
                </View>

                {/* Empty state content */}
                <View style={styles.emptyStateContent}>
                  <View style={styles.emptyIconContainer}>
                    <ClipboardList
                      size={48}
                      color="#1a1a1a"
                      strokeWidth={1.5}
                    />
                  </View>

                  <Text style={styles.emptyTitle}>No Tasks Yet</Text>
                  <Text style={styles.emptyDescription}>
                    Your tasks will appear here. Start by adding a new task to
                    organize your day and stay productive.
                  </Text>

                  {/* Decorative dashed line */}
                  <View style={styles.dashedLine} />

                  {/* Time suggestion */}
                  <View style={styles.timeSuggestion}>
                    <Clock size={14} color="#707070" strokeWidth={1.5} />
                    <Text style={styles.timeText}>Plan your day ahead</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Add Task Button - Matching dashboard button style */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTask}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["#1a1a1a", "#2d2d2d"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.addButtonGradient}
            >
              <View style={styles.addButtonContent}>
                <View style={styles.addIconContainer}>
                  <Plus size={24} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.addButtonTitle}>Add New Task</Text>
                  <Text style={styles.addButtonSubtitle}>
                    Create a task for today
                  </Text>
                </View>
                <ArrowRight size={20} color="#FFFFFF" strokeWidth={2} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Changed to match dashboard
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },

  // Chips Styles - Matching dashboard chip aesthetics
  chipsContainer: {
    marginBottom: 24,
    marginTop: 8,
  },
  chipsScroll: {
    gap: 10,
    paddingVertical: 4,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  chipActive: {
    backgroundColor: "#1a1a1a", // Changed to dark color matching dashboard
    borderColor: "#1a1a1a",
    shadowColor: "#1a1a1a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#707070", // Matching dashboard secondary text
  },
  chipLabelActive: {
    color: "#FFFFFF",
  },

  // Empty State - Matching dashboard card design
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
  },
  emptyStateCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30, // Matching dashboard border radius
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
    borderWidth: 0.4,
    borderColor: "#48484848",
    borderStyle: "solid",
  },
  emptyStateAccent: {
    backgroundColor: "#f6f4fcad", // Matching dashboard accent background
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  emptyStateContent: {
    padding: 32,
    alignItems: "center",
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#f6f4fcad", // Matching dashboard accent
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0", // Subtle border
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a", // Matching dashboard title color
    marginBottom: 12,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 14,
    color: "#707070", // Matching dashboard secondary text
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  dashedLine: {
    width: "60%",
    height: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
    marginBottom: 16,
  },
  timeSuggestion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f6f4fcad", // Matching dashboard accent
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  timeText: {
    fontSize: 13,
    color: "#707070",
    fontWeight: "500",
  },

  // Add Task Button - Matching dashboard dark button
  addButton: {
    marginTop: 32,
    marginBottom: 8,
    borderRadius: 24,
    shadowColor: "#1a1a1a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    overflow: "hidden",
  },
  addButtonGradient: {
    borderRadius: 24,
    padding: 20,
  },
  addButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  addIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  addButtonTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  addButtonSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.85)",
    fontWeight: "500",
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 40,
  },
});
export default TasksUIScreen;
