import { LinearGradient } from "expo-linear-gradient";
import {
  BookOpen,
  Briefcase,
  Clock,
  Layers,
  Lightbulb,
  NotebookPen,
  Plus,
  Sparkles,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TasksHeader from "../header/tasks-header";

type Note = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
};

const CATEGORIES = [
  {
    id: "all",
    label: "All",
    icon: (active: boolean) => (
      <Layers
        size={18}
        color={active ? "#FFFFFF" : "#707070"}
        strokeWidth={1.8}
      />
    ),
  },
  {
    id: "work",
    label: "Work",
    icon: (active: boolean) => (
      <Briefcase
        size={18}
        color={active ? "#FFFFFF" : "#707070"}
        strokeWidth={1.8}
      />
    ),
  },
  {
    id: "personal",
    label: "Personal",
    icon: (active: boolean) => (
      <User
        size={18}
        color={active ? "#FFFFFF" : "#707070"}
        strokeWidth={1.8}
      />
    ),
  },
  {
    id: "ideas",
    label: "Ideas",
    icon: (active: boolean) => (
      <Lightbulb
        size={18}
        color={active ? "#FFFFFF" : "#707070"}
        strokeWidth={1.8}
      />
    ),
  },
  {
    id: "study",
    label: "Study",
    icon: (active: boolean) => (
      <BookOpen
        size={18}
        color={active ? "#FFFFFF" : "#707070"}
        strokeWidth={1.8}
      />
    ),
  },
];
export default function Notes() {
  const insets = useSafeAreaInsets();
  const [activeChip, setActiveChip] = useState("all");
  const [notes, setNotes] = useState<Note[]>([]); // Empty by default
  const [isFocused, setIsFocused] = useState(false);

  const filteredNotes = notes.filter(
    (note) =>
      activeChip === "all" || note.category.toLowerCase() === activeChip,
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={["#a5d6f039", "#fff", "#fbeee521", "#93d9f953"]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header */}
      <TasksHeader
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        placeholder="Notes..."
        name={"Notes"}
      />

      {/* Chips */}
      <View style={styles.chipsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScroll}
        >
          {CATEGORIES.map((chip) => {
            const isActive = activeChip === chip.id;
            return (
              <TouchableOpacity
                key={chip.id}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => setActiveChip(chip.id)}
                activeOpacity={0.8}
              >
                {chip.icon(isActive)}
                <Text
                  style={[styles.chipLabel, isActive && styles.chipLabelActive]}
                >
                  {chip.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>
        {notes.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateCard}>
              <View style={styles.emptyStateAccent}>
                <Sparkles size={16} color="#1a1a1a" strokeWidth={1.5} />
              </View>

              <View style={styles.emptyStateContent}>
                <View style={styles.emptyIconContainer}>
                  <NotebookPen size={48} color="#1a1a1a" strokeWidth={1.4} />
                </View>

                <Text style={styles.emptyTitle}>No Notes Yet</Text>
                <Text style={styles.emptyDescription}>
                  Your notes will appear here. Tap the + button to create your
                  first note and keep your thoughts organized.
                </Text>

                <View style={styles.dashedLine} />

                <View style={styles.timeSuggestion}>
                  <Clock size={14} color="#707070" strokeWidth={1.5} />
                  <Text style={styles.timeText}>Start capturing ideas</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <FlatList
            data={filteredNotes}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.notesList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.noteCard}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteDescription} numberOfLines={3}>
                  {item.description}
                </Text>
                <Text style={styles.noteDate}>{item.date}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Plus size={45} color="#FFFFFF" strokeWidth={1.6} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
  },

  /* ==================== CHIPS ==================== */
  chipsContainer: {
    marginBottom: 20,
  },
  chipsScroll: {
    paddingHorizontal: 20,
    gap: 10,
    paddingVertical: 4,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 36, // Compact height
    gap: 6,
  },
  chipActive: {
    backgroundColor: "#1a1a1a",
    borderColor: "#1a1a1a",
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#707070",
  },
  chipLabelActive: {
    color: "#FFFFFF",
  },

  /* ==================== EMPTY STATE ==================== */
  emptyStateContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  emptyStateCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  emptyStateAccent: {
    backgroundColor: "#f6f4fcad",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    flexDirection: "row",
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
    backgroundColor: "#f6f4fcad",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 14,
    color: "#707070",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  dashedLine: {
    width: "60%",
    height: 1,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    marginBottom: 20,
  },
  timeSuggestion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timeText: {
    fontSize: 13,
    color: "#707070",
  },

  /* ==================== NOTES LIST ==================== */
  notesList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  noteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  noteDescription: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 21,
    marginBottom: 10,
  },
  noteDate: {
    fontSize: 13,
    color: "#9ca3af",
    textAlign: "right",
  },

  /* ==================== FAB ==================== */
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 74,
    height: 74,
    borderRadius: 51,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
});
