import { router } from "expo-router";
import {
    Ban,
    BellOff,
    ChevronLeft,
    EllipsisVertical,
    EyeOff,
    Flag,
    ImageIcon,
    Info,
    Layout,
    Lock,
    Search,
    Timer,
    Trash2,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
    Image,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

interface ChatRoomHeaderProps {
  name: string;
  isOnline?: boolean;
  onCallPress?: () => void;
  onVideoPress?: () => void;
}

export default function ChatRoomHeader({
  name,
  isOnline = true,
  onCallPress,
  onVideoPress,
}: ChatRoomHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuPosition = useRef({ x: 0, y: 0 });
  const [isIncognito, setIsIncognito] = useState(false);

  const handleMenuPress = () => {
    setShowMenu(!showMenu);
  };
  const handleMenuAction = (action: string) => {
    setShowMenu(false);
    if (action === "newGroup") {
      console.log("New Group");
    } else if (action === "newBroadcast") {
      console.log("New Broadcast");
    } else if (action === "starred") {
      console.log("Starred Messages");
    } else if (action === "settings") {
      console.log("Settings");
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <ChevronLeft size={28} color="#000" />
      </TouchableOpacity>
      <View style={styles.chatAvatar}>
        <Image
          source={require("@/assets/images/image-1.jpg")}
          style={{ width: 40, height: 40, borderRadius: 50, marginRight: 8 }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: isOnline ? "#10b981" : "transparent",
            borderWidth: 2,
            borderColor: "#fff",
          }}
        />
      </View>

      <View style={styles.headerInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text
          style={[styles.status, isOnline ? styles.online : styles.offline]}
        >
          {isOnline ? "Online" : "Offline"}
        </Text>
      </View>

      <View style={styles.actions}>
        {/* <TouchableOpacity style={styles.actionButton} onPress={onCallPress}>
          <Phone size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onVideoPress}>
          <Video size={24} color="#000" />
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.actionButton} onPress={handleMenuPress}>
          <EllipsisVertical size={20} color="#000" />
        </TouchableOpacity>
      </View>
      {showMenu && (
        <>
          <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
            <View style={styles.menuOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.dropdownMenu}>
            {/* Contact Info */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuAction("contactInfo")}
            >
              <Info size={18} color="#1a1a1a" />
              <Text style={styles.menuText}>Contact info</Text>
            </TouchableOpacity>

            {/* Media Links */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuAction("media")}
            >
              <ImageIcon size={18} color="#1a1a1a" />
              <Text style={styles.menuText}>Media, links & docs</Text>
            </TouchableOpacity>

            {/* Search in Chat */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuAction("search")}
            >
              <Search size={18} color="#1a1a1a" />
              <Text style={styles.menuText}>Search</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Mute Notifications */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuAction("mute")}
            >
              <BellOff size={18} color="#1a1a1a" />
              <Text style={styles.menuText}>Mute notifications</Text>
            </TouchableOpacity>

            {/* Wallpaper */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuAction("wallpaper")}
            >
              <Layout size={18} color="#1a1a1a" />
              <Text style={styles.menuText}>Wallpaper</Text>
            </TouchableOpacity>

            {/* Incognito Mode (Your special feature) */}
            <TouchableOpacity
              style={[styles.menuItem, { justifyContent: "space-between" }]}
              onPress={() => handleMenuAction("incognito")}
            >
              <View style={{ flexDirection: "row", gap: 12 }}>
                <EyeOff size={18} color="#1a1a1a" />
                <Text style={styles.menuText}>Incognito mode</Text>
              </View>

              <Switch
                value={isIncognito}
                onValueChange={setIsIncognito}
                trackColor={{ false: "#E5E7EB", true: "#3B82F6" }}
              />
            </TouchableOpacity>

            {/* Disappearing Messages */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuAction("disappearing")}
            >
              <Timer size={18} color="#1a1a1a" />
              <Text style={styles.menuText}>Disappearing messages</Text>
            </TouchableOpacity>

            {/* Lock Chat */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuAction("lock")}
            >
              <Lock size={18} color="#1a1a1a" />
              <Text style={styles.menuText}>Lock chat</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Block Contact */}
            <TouchableOpacity
              style={[styles.menuItem, styles.dangerItem]}
              onPress={() => handleMenuAction("block")}
            >
              <Ban size={18} color="#DC2626" />
              <Text style={[styles.menuText, styles.dangerText]}>
                Block contact
              </Text>
            </TouchableOpacity>

            {/* Report */}
            <TouchableOpacity
              style={[styles.menuItem, styles.dangerItem]}
              onPress={() => handleMenuAction("report")}
            >
              <Flag size={18} color="#DC2626" />
              <Text style={[styles.menuText, styles.dangerText]}>Report</Text>
            </TouchableOpacity>

            {/* Delete Chat */}
            <TouchableOpacity
              style={[styles.menuItem, styles.dangerItem]}
              onPress={() => handleMenuAction("delete")}
            >
              <Trash2 size={18} color="#DC2626" />
              <Text style={[styles.menuText, styles.dangerText]}>
                Delete chat
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.6,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "transparent",
  },
  chatAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    position: "relative",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  backButton: {
    marginRight: 16,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: "#d9d9d975",
    elevation: 1,
  },
  headerInfo: {
    flex: 1,
  },
  dangerText: {
    color: "#DC2626",
  },
  dangerItem: {
    backgroundColor: "#FFFFFF",
  },
  activeDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  status: {
    fontSize: 12,
    marginTop: 2,
  },
  online: {
    color: "#10B981",
  },
  offline: {
    color: "#9CA3AF",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginLeft: 16,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: "#d9d9d975",
    elevation: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  menuText: {
    fontSize: 15,
    color: "#1a1a1a",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 4,
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 9,
  },
  dropdownMenu: {
    position: "absolute",
    top: 60,
    right: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 8,
    width: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
});
