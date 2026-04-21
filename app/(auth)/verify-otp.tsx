import { BackButton } from "@/components/back-button";
import { useAuthStore } from "@/store/authStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OTP_LENGTH = 6;

const VerifyOTP = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { verifyOtp, isLoading } = useAuthStore();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(30);

  const inputs = useRef<TextInput[]>([]);

  // 👉 Derived state (NO setCode needed)
  const code = otp.join("");

  // 🔥 Handle input change
  const handleChange = (text: string, index: number) => {
    // Handle paste
    if (text.length > 1) {
      const pasted = text.slice(0, OTP_LENGTH).split("");
      setOtp(pasted);
      inputs.current[OTP_LENGTH - 1]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move forward
    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  // 🔙 Handle backspace
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  // ⏳ Resend timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ✅ Verify OTP
  const handleVerify = async () => {
    if (code.length !== OTP_LENGTH) {
      Alert.alert("Invalid OTP", "Please enter complete code");
      return;
    }

    try {
      await verifyOtp(email, code);
      Alert.alert("Success", "Account verified!");
      router.replace("/(auth)/sign-in");
    } catch {
      Alert.alert("Error", "Invalid or expired OTP");
    }
  };

  // 🔁 Resend OTP
  const handleResend = async () => {
    try {
      // await resendOTP(email); // plug your API here
      setTimer(30);
      Alert.alert("OTP Sent", "Check your email");
    } catch {
      Alert.alert("Error", "Failed to resend OTP");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.screen}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <BackButton />

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Verify OTP</Text>
              <Text style={styles.subtitle}>Code sent to {email}</Text>
            </View>

            {/* Card */}
            <View style={styles.card}>
              <View style={styles.form}>
                {/* OTP Boxes */}
                <View style={styles.otpRow}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => {
                        inputs.current[index] = ref!;
                      }}
                      style={[
                        styles.otpBox,
                        digit && { borderColor: "#1c1c1c" }, // 👈 visual feedback
                      ]}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={digit}
                      onChangeText={(text) => handleChange(text, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      textContentType="oneTimeCode" // iOS autofill
                    />
                  ))}
                </View>

                {/* Verify Button */}
                <TouchableOpacity
                  style={[
                    styles.button,
                    (code.length !== OTP_LENGTH || isLoading) &&
                      styles.buttonDisabled,
                  ]}
                  disabled={code.length !== OTP_LENGTH || isLoading}
                  onPress={handleVerify}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Verify</Text>
                  )}
                </TouchableOpacity>

                {/* Resend */}
                <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
                  <Text style={styles.resend}>
                    {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  screen: { flex: 1 },

  content: {
    padding: 24,
    gap: 24,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  otpBox: {
    width: 48,
    height: 55,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#1c1c1c",
    backgroundColor: "#fff",
  },
  header: {
    gap: 6,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1c1c1c",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
  },

  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ececec",
  },

  form: {
    gap: 16,
  },

  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    paddingHorizontal: 14,
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 6,
  },

  button: {
    height: 50,
    borderRadius: 14,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonDisabled: {
    opacity: 0.4,
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  resend: {
    textAlign: "center",
    color: "#888",
    marginTop: 8,
  },
});

export default VerifyOTP;
