import { BackButton } from "@/components/back-button";
import { useAuthStore } from "@/store/authStore";
import { Image } from "expo-image";
import { useNavigation, useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useEffect, useState } from "react";
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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const SignIn = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuthStore();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Redirect if already authenticated (works on mount + after login)
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(root)/(tabs)/dashboard");
    }
  }, [isAuthenticated, router]);

  const isEmailValid = emailAddress.includes("@") && emailAddress.length > 5;
  const isFormValid = isEmailValid && password.length >= 6;

  const handleSignIn = async () => {
    if (!isFormValid) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid email and password (min 6 characters)",
      );
      return;
    }

    try {
      await login(emailAddress.trim(), password);
      // No need to navigate manually here — the useEffect above will handle it
    } catch (err: any) {
      console.log("Login Error:", err);
      // Optional: Show error message from backend
      Alert.alert(
        "Login Failed",
        err?.message || "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.screen}
      >
        <ScrollView
          style={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <BackButton />
            <View style={styles.brandBlock}>
              <View style={styles.logoWrap}>
                <Image
                  source={require("@/assets/images/icons.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.wordmark}>Talklio</Text>
                  <Text style={styles.wordmarkSub}>MESSAGING</Text>
                </View>
              </View>
              <Text style={styles.title}>Welcome back</Text>
              <Text style={styles.subtitle}>
                Sign in to continue your conversations
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.form}>
                {/* Email Field */}
                <View style={styles.field}>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="name@example.com"
                    placeholderTextColor="rgba(0,0,0,0.4)"
                    onChangeText={setEmailAddress}
                    onBlur={() => setEmailTouched(true)}
                    keyboardType="email-address"
                    autoComplete="email"
                  />
                </View>

                {/* Password Field with Eye Button */}
                <View style={styles.field}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={password}
                      placeholder="Enter your password"
                      placeholderTextColor="rgba(0,0,0,0.4)"
                      secureTextEntry={!passwordVisible}
                      onChangeText={setPassword}
                      onBlur={() => setPasswordTouched(true)}
                      autoComplete="password"
                    />

                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? (
                        <EyeOff size={22} color="#999999a3" />
                      ) : (
                        <Eye size={22} color="#999999a3" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.button,
                    (!isFormValid || isLoading) && styles.buttonDisabled,
                  ]}
                  onPress={handleSignIn}
                  disabled={!isFormValid || isLoading}
                >
                  <Text style={styles.buttonText}>
                    {isLoading ? (
                      <View style={{ flexDirection: "row", gap: 8 }}>
                        <ActivityIndicator size="small" color="#fff" />
                        <Text style={{ color: "#fff" }}>Signing in</Text>
                      </View>
                    ) : (
                      "Sign In"
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.linkRow}>
              <Text style={styles.linkCopy}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.replace("(auth)/sign-up")}
              >
                <Text style={styles.link}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    gap: 24,
  },
  brandBlock: {
    gap: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  logoWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  logoMark: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  logoMarkText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  wordmark: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1c1c1c",
    letterSpacing: 0.3,
  },
  wordmarkSub: {
    fontSize: 10,
    fontWeight: "500",
    color: "#888",
    letterSpacing: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1c1c1c",
    letterSpacing: -0.5,
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    padding: 8,
    marginTop: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
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
  field: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
    letterSpacing: 0.1,
  },
  input: {
    width: "100%", // Full width input
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingRight: 50, // Extra space for eye icon
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#e53935",
  },
  error: {
    fontSize: 12,
    color: "#e53935",
    marginTop: 2,
  },
  button: {
    height: 50,
    borderRadius: 14,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  secondaryButton: {
    height: 46,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#444",
    fontSize: 14,
    fontWeight: "500",
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  linkCopy: {
    fontSize: 14,
    color: "#888",
  },
  link: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1c1c1c",
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    borderRadius: 12,
  },
});

export default SignIn;
