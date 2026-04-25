import SettingHeader from "@/components/header/settings-header";
import { disconnectSocket } from "@/socket/socket";
import { useAuthStore } from "@/store/authStore";
import Fonts from "@/utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import {
  Bell,
  Calendar,
  ChevronRight,
  Database,
  Download,
  Fingerprint,
  Globe,
  HelpCircle,
  Lock,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  Palette,
  Phone,
  Shield,
  Smartphone,
  User,
  Users,
  Volume2,
  Wifi,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Settings() {
  const { logout, isLoading } = useAuthStore();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // User data
  const userData = {
    name: "Nikhil Mishra",
    email: "nikhil.mishra@example.com",
    phone: "+91 98765 43210",
    avatar: require("@/assets/images/image-1.jpg"),
    memberSince: "January 2024",
  };

  const menuSections = [
    {
      title: "Account",
      icon: <User size={20} color="#737476c9" />,
      items: [
        {
          label: "Personal Information",
          icon: <User size={18} color="#666" />,
          route: "Profile",
          value: userData.name,
        },
        {
          label: "Email Address",
          icon: <Mail size={18} color="#666" />,
          route: "Email",
          value: userData.email,
        },
        {
          label: "Phone Number",
          icon: <Phone size={18} color="#666" />,
          route: "Phone",
          value: userData.phone,
        },
        {
          label: "Location",
          icon: <MapPin size={18} color="#666" />,
          route: "Location",
          value: "New York, USA",
        },
      ],
    },
    {
      title: "Preferences",
      icon: <Palette size={20} color="#737476c9" />,
      items: [
        {
          label: "Dark Mode",
          icon: <Moon size={18} color="#666" />,
          type: "switch",
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          label: "Push Notifications",
          icon: <Bell size={18} color="#666" />,
          type: "switch",
          value: notifications,
          onToggle: setNotifications,
        },
        {
          label: "Sound Effects",
          icon: <Volume2 size={18} color="#666" />,
          type: "switch",
          value: soundEnabled,
          onToggle: setSoundEnabled,
        },
        {
          label: "Vibration",
          icon: <Smartphone size={18} color="#666" />,
          type: "switch",
          value: vibrationEnabled,
          onToggle: setVibrationEnabled,
        },
        {
          label: "Language",
          icon: <Globe size={18} color="#666" />,
          route: "Language",
          value: "English",
        },
      ],
    },
    {
      title: "Privacy & Security",
      icon: <Shield size={20} color="#737476c9" />,
      items: [
        {
          label: "Two-Factor Authentication",
          icon: <Fingerprint size={18} color="#666" />,
          type: "switch",
          value: twoFactorAuth,
          onToggle: setTwoFactorAuth,
        },
        {
          label: "Privacy Policy",
          icon: <Lock size={18} color="#666" />,
          route: "Privacy",
        },
        {
          label: "Data Usage",
          icon: <Database size={18} color="#666" />,
          route: "Data",
        },
        {
          label: "Blocked Contacts",
          icon: <Users size={18} color="#666" />,
          route: "Blocked",
          value: "3 blocked",
        },
      ],
    },
    {
      title: "Chat Settings",
      icon: <MessageCircle size={20} color="#737476c9" />,
      items: [
        {
          label: "Auto-Download Media",
          icon: <Download size={18} color="#666" />,
          type: "switch",
          value: autoDownload,
          onToggle: setAutoDownload,
        },
        {
          label: "Chat Backup",
          icon: <Database size={18} color="#666" />,
          route: "Backup",
          value: "Last backup: Today",
        },
        {
          label: "Wallpaper",
          icon: <Palette size={18} color="#666" />,
          route: "Wallpaper",
        },
        {
          label: "Chat History",
          icon: <MessageCircle size={18} color="#666" />,
          route: "History",
        },
      ],
    },
    {
      title: "Call Settings",
      icon: <Phone size={20} color="#737476c9" />,
      items: [
        {
          label: "Call Forwarding",
          icon: <Phone size={18} color="#666" />,
          route: "Forwarding",
        },
        {
          label: "VoIP Settings",
          icon: <Wifi size={18} color="#666" />,
          route: "VoIP",
        },
        {
          label: "Call Recording",
          icon: <Database size={18} color="#666" />,
          route: "Recording",
        },
      ],
    },
    {
      title: "Support",
      icon: <HelpCircle size={20} color="#737476c9" />,
      items: [
        {
          label: "Help Center",
          icon: <HelpCircle size={18} color="#666" />,
          route: "Help",
        },
        {
          label: "Contact Support",
          icon: <Mail size={18} color="#666" />,
          route: "Support",
        },
        {
          label: "About",
          icon: <Users size={18} color="#666" />,
          route: "About",
          value: "Version 1.0.0",
        },
      ],
    },
  ];

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          disconnectSocket();
          navigation.replace("welcome");
        },
      },
    ]);
  };

  const SettingItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => {
          if (item.route) {
            console.log(`Navigate to ${item.route}`);
          }
        }}
      >
        <View style={styles.settingItemLeft}>
          <View style={styles.settingIcon}>{item.icon}</View>
          <View style={styles.settingInfo}>
            <Text
              style={[
                styles.settingLabel,
                { fontFamily: Fonts.figtree.medium },
              ]}
            >
              {item.label}
            </Text>
            {item.value && (
              <Text
                style={[
                  styles.settingValue,
                  { fontFamily: Fonts.figtree.regular },
                ]}
              >
                {item.value}
              </Text>
            )}
          </View>
        </View>

        {item.type === "switch" ? (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: "#e0e0e0", true: "#007aff" }}
            thumbColor="#fff"
          />
        ) : (
          <ChevronRight size={18} color="#ccc" />
        )}
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
      <SettingHeader />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.98)"]}
            style={styles.profileCardGradient}
          >
            <View style={styles.profileContent}>
              <Image source={userData.avatar} style={styles.profileAvatar} />
              <View style={styles.profileInfo}>
                <Text
                  style={[
                    styles.profileName,
                    { fontFamily: Fonts.figtree.semibold },
                  ]}
                >
                  {userData.name}
                </Text>
                <Text
                  style={[
                    styles.profileEmail,
                    { fontFamily: Fonts.figtree.regular },
                  ]}
                >
                  {userData.email}
                </Text>
                <View style={styles.profileMeta}>
                  <Calendar size={14} color="#888" />
                  <Text
                    style={[
                      styles.profileDate,
                      { fontFamily: Fonts.figtree.regular },
                    ]}
                  >
                    Member since {userData.memberSince}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <User size={18} color="#53a6f9" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Settings Sections */}
        {menuSections.map((section, index) => (
          <View key={index} style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              {section.icon}
              <Text
                style={[
                  styles.sectionTitle,
                  { fontFamily: Fonts.figtree.semibold },
                ]}
              >
                {section.title}
              </Text>
            </View>

            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <SettingItem key={itemIndex} item={item} />
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#ff3a30" />
          <Text
            style={[styles.logoutText, { fontFamily: Fonts.figtree.semibold }]}
          >
            Logout
          </Text>
        </TouchableOpacity>

        {/* Version Info */}
        <Text
          style={[styles.versionText, { fontFamily: Fonts.figtree.regular }]}
        >
          Version 2.0.0 | Build 125
        </Text>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
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

  // Welcome Section
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

  // Profile Card
  profileCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileCardGradient: {
    padding: 20,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#fff",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  profileMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  profileDate: {
    fontSize: 11,
    color: "#999",
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },

  // Settings Sections
  sectionContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  sectionContent: {
    backgroundColor: "#fffefe",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },

  // Setting Items
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.7)",
    minHeight: 60, // Add fixed minimum height
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 32,
    alignItems: "center",
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
    justifyContent: "center", // Add this
  },
  settingLabel: {
    fontSize: 15,
    color: "#1a1a1a",
    lineHeight: 20, // Add fixed line height
  },
  settingValue: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
    lineHeight: 16, // Add fixed line height
  },

  // Logout Button
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "rgba(255,58,48,0.1)",
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,58,48,0.2)",
  },
  logoutText: {
    fontSize: 16,
    color: "#ff3a30",
    fontWeight: "600",
  },

  // Version Info
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginTop: 24,
  },

  // Bottom Padding
  bottomPadding: {
    height: 40,
  },
});
