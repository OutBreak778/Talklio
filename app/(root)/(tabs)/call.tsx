import { ChipsList } from "@/components/call-chip-list";
import CallHeader from "@/components/header/call-header";
import Fonts, { callData, incomingCalls } from "@/utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import {
  BellRing,
  Check,
  Clock,
  Inbox,
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOff,
  PhoneOutgoing,
  Video,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Call() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isFocused, setIsFocused] = useState(false);

  // Call categories chips
  const callChips = [
    {
      id: "1",
      label: "All",
      count: 8,
      icon: <Phone size={16} />,
    },
    {
      id: "2",
      label: "Missed",
      count: 3,
      icon: <PhoneOff size={16} />,
    },
    {
      id: "3",
      label: "Incoming",
      count: 4,
      icon: <PhoneIncoming size={16} />,
    },
    {
      id: "4",
      label: "Outgoing",
      count: 5,
      icon: <PhoneOutgoing size={16} />,
    },
    {
      id: "5",
      label: "Video",
      count: 2,
      icon: <Video size={16} />,
    },
  ];

  const handleChipPress = (chip: any) => {
    setActiveFilter(chip.label.toLowerCase());
  };

  const getCallIcon = (type: string, incoming: boolean, missed: boolean) => {
    if (missed) {
      return <PhoneOff size={18} color="#ff3a30" />;
    }
    if (type === "video") {
      return <Video size={18} color="#007aff" />;
    }
    if (incoming) {
      return <PhoneIncoming size={18} color="#34c759" />;
    }
    return <PhoneOutgoing size={18} color="#007aff" />;
  };

  const getCallStatusText = (missed: boolean, incoming: boolean) => {
    if (missed) return "Missed";
    if (incoming) return "Incoming";
    return "Outgoing";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#ff3a30";
      case "medium":
        return "#ff9500";
      case "low":
        return "#34c759";
      default:
        return "#8e8e93";
    }
  };
  const IncomingCallCard = ({ call }: { call: any }) => {
    const [isAccepted, setIsAccepted] = useState(false);
    const [isDeclined, setIsDeclined] = useState(false);

    if (isAccepted || isDeclined) return null;

    return (
      <View style={styles.incomingCard}>
        <LinearGradient
          colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.98)"]}
          style={styles.incomingCardGradient}
        >
          <View style={styles.incomingCardContent}>
            <View style={styles.incomingAvatarContainer}>
              <Image source={call.avatar} style={styles.incomingAvatar} />
              <View
                style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(call.priority) },
                ]}
              />
              <View style={styles.videoIndicatorIcon}>
                <Video size={12} color="#fff" />
              </View>
            </View>

            <View style={styles.incomingInfo}>
              <Text
                style={[
                  styles.incomingName,
                  { fontFamily: Fonts.figtree.semibold },
                ]}
              >
                {call.name}
              </Text>
              <Text
                style={[
                  styles.incomingTitle,
                  { fontFamily: Fonts.figtree.regular },
                ]}
              >
                {call.title}
              </Text>
              <View style={styles.incomingTimeContainer}>
                <Clock size={12} color="#888" />
                <Text
                  style={[
                    styles.incomingTime,
                    { fontFamily: Fonts.figtree.regular },
                  ]}
                >
                  {call.timestamp}
                </Text>
              </View>
            </View>

            <View style={styles.incomingActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.declineButton]}
                onPress={() => setIsDeclined(true)}
              >
                <X size={22} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.acceptButton]}
                onPress={() => setIsAccepted(true)}
              >
                <Check size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const EmptyIncomingState = () => (
    <View style={styles.emptyIncomingContainer}>
      <LinearGradient
        colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.98)"]}
        style={styles.emptyIncomingGradient}
      >
        <View style={styles.emptyIconContainer}>
          <Inbox size={48} color="#ccc" />
        </View>
        <Text
          style={[styles.emptyTitle, { fontFamily: Fonts.figtree.semibold }]}
        >
          No incoming calls
        </Text>
        <Text
          style={[styles.emptySubtitle, { fontFamily: Fonts.figtree.regular }]}
        >
          All caught up! No pending incoming calls
        </Text>
        <TouchableOpacity style={styles.startCallButton}>
          <PhoneCall size={18} color="#fff" />
          <Text
            style={[styles.startCallText, { fontFamily: Fonts.figtree.medium }]}
          >
            Start a call
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

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
      <CallHeader isFocused={isFocused} setIsFocused={setIsFocused} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Section - Same as Chat */}

        {/* Chips Section */}
        <View style={styles.chipsWrapper}>
          <ChipsList
            chips={callChips}
            onChipPress={handleChipPress}
            initialActiveChip="1"
          />
        </View>

        {/* Incoming Calls Section - Height 320 */}
        <View style={styles.incomingSection}>
          <View style={[styles.sectionHeader, { paddingHorizontal: 16 }]}>
            <View style={styles.sectionHeaderLeft}>
              <BellRing size={18} color="#007aff" />
              <Text
                style={[
                  styles.sectionTitle,
                  { fontFamily: Fonts.figtree.semibold },
                ]}
              >
                Incoming calls
              </Text>
            </View>
            {/* <TouchableOpacity>
              <Text
                style={[styles.seeAll, { fontFamily: Fonts.figtree.medium }]}
              >
                View all
              </Text>
            </TouchableOpacity> */}
          </View>

          <View style={styles.incomingContainer}>
            {incomingCalls.length > 0 ? (
              incomingCalls.map((call, index) => (
                <IncomingCallCard key={index} call={call} />
              ))
            ) : (
              <EmptyIncomingState />
            )}
          </View>
        </View>

        {/* Calls Container - Same style as Chat */}
        <View style={styles.callsSection}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { fontFamily: Fonts.figtree.semibold },
              ]}
            >
              Recent calls
            </Text>
            <TouchableOpacity>
              <Text
                style={[styles.seeAll, { fontFamily: Fonts.figtree.medium }]}
              >
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.callsContainer}>
            {callData.map((item) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.callItem,
                  pressed && styles.callItemPressed,
                ]}
              >
                {/* Avatar */}
                <View style={styles.callAvatar}>
                  <Image source={item.avatar} style={styles.avatarImage} />
                  {item.missed && <View style={styles.missedDot} />}
                </View>

                {/* Call Info */}
                <View style={styles.callInfo}>
                  <View style={styles.callHeader}>
                    <View>
                      <Text
                        style={[
                          styles.callName,
                          { fontFamily: Fonts.figtree.semibold },
                        ]}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={[
                          styles.callTitle,
                          { fontFamily: Fonts.figtree.regular },
                        ]}
                      >
                        {item.title}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.callButton}>
                      {item.type === "video" ? (
                        <Video
                          size={20}
                          color={item.missed ? "#ff3a30" : "#007aff"}
                        />
                      ) : (
                        <Phone
                          size={20}
                          color={item.missed ? "#ff3a30" : "#007aff"}
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  <View style={styles.callFooter}>
                    <View style={styles.callMeta}>
                      {getCallIcon(item.type, item.incoming, item.missed)}
                      <Text
                        style={[
                          styles.callStatus,
                          { fontFamily: Fonts.figtree.medium },
                        ]}
                      >
                        {getCallStatusText(item.missed, item.incoming)}
                      </Text>
                      <View style={styles.dotSeparator} />
                      <Clock size={12} color="#888" />
                      <Text
                        style={[
                          styles.callTime,
                          { fontFamily: Fonts.figtree.regular },
                        ]}
                      >
                        {item.time}
                      </Text>
                      <View style={styles.dotSeparator} />
                      <Text
                        style={[
                          styles.callDuration,
                          { fontFamily: Fonts.figtree.medium },
                        ]}
                      >
                        {item.duration}
                      </Text>
                    </View>

                    {/* {item.type === "video" && (
                      <View style={styles.videoBadge}>
                        <Video size={12} color="#fff" />
                        <Text
                          style={[
                            styles.videoBadgeText,
                            { fontFamily: Fonts.figtree.medium },
                          ]}
                        >
                          Video
                        </Text>
                      </View>
                    )} */}
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Welcome Section - Same as Chat
  welcomeSection: {
    marginTop: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  welcomeDescription: {
    fontSize: 15,
    color: "#666",
    marginTop: 6,
    lineHeight: 22,
  },

  // Chips Wrapper - Same as Chat
  chipsWrapper: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  // Calls Section - Same structure as Chat messages
  callsSection: {
    marginTop: 8,
    paddingHorizontal: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  seeAll: {
    color: "#38393a65",
    fontWeight: "500",
    fontSize: 14,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  // Calls Container - Same as chatContainer
  callsContainer: {
    backgroundColor: "#f1f0f5ee",
    padding: 12,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 68,
  },

  // Call Items - Same as chatItem but modified for calls
  callItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 20,
    marginBottom: 8,
    shadowColor: "#000000b1",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
  },
  callItemPressed: {
    backgroundColor: "#f8f8f8",
    transform: [{ scale: 0.98 }],
  },

  // Avatar - Same as Chat
  callAvatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    position: "relative",
  },
  avatarImage: {
    width: 56,
    height: 56,
  },
  missedDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ff3a30",
    borderWidth: 2,
    borderColor: "#fff",
  },

  // Call Info - Same structure as chatInfo
  callInfo: {
    flex: 1,
  },
  callHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  callName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  callTitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  callButton: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },

  // Call Footer - New for calls
  callFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  callMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  callStatus: {
    fontSize: 12,
    color: "#666",
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#ccc",
  },
  callTime: {
    fontSize: 12,
    color: "#999",
  },
  callDuration: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },

  // Video Badge
  videoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#007aff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  videoBadgeText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "500",
  },

  incomingSection: {
    marginTop: 16,
    marginBottom: 24,
  },
  incomingContainer: {
    paddingHorizontal: 12,
    gap: 12,
  },
  incomingCard: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  incomingCardGradient: {
    padding: 16,
  },
  incomingCardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  incomingAvatarContainer: {
    position: "relative",
  },
  incomingAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
  },
  priorityDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#fff",
  },
  videoIndicatorIcon: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#007aff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  incomingInfo: {
    flex: 1,
    marginLeft: 14,
  },
  incomingName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  incomingTitle: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  incomingTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  incomingTime: {
    fontSize: 11,
    color: "#999",
  },
  incomingActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  declineButton: {
    backgroundColor: "#ff3a30",
  },
  acceptButton: {
    backgroundColor: "#34c759",
  },

  // Empty State
  emptyIncomingContainer: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyIncomingGradient: {
    padding: 32,
    alignItems: "center",
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  startCallButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#007aff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: "#007aff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  startCallText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
});
