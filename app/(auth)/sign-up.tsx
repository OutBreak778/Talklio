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
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const router = useRouter();
  const navigation = useNavigation<any>();
  const { register, isAuthenticated, isLoading } = useAuthStore();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(root)/(tabs)/dashboard");
    }
  }, [isAuthenticated]);

  // ✅ Validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isPasswordValid = form.password.length >= 6;
  const isNameValid = form.fullName.trim().length > 2;

  const isFormValid = isEmailValid && isPasswordValid && isNameValid;

  // ✅ Register
  const handleSignUp = async () => {
    try {
      const res: any = await register(form.fullName, form.email, form.password);

      if (res?.data?.requiresVerification) {
        router.push({
          pathname: "/(auth)/verify-otp",
          params: { email: form.email },
        });
      }
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 409) {
        Alert.alert(
          "Account Exists",
          "This email is already registered. Please login.",
        );
        router.replace("/(auth)/sign-in");
      } else {
        Alert.alert("Error", "Registration failed. Try again.");
      }
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
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <BackButton />

            {/* Branding */}
            <View style={styles.brandBlock}>
              <View style={styles.logoWrap}>
                <Image
                  source={require("@/assets/images/icons.png")}
                  style={styles.logo}
                />
                <View>
                  <Text style={styles.wordmark}>Talklio</Text>
                  <Text style={styles.wordmarkSub}>MESSAGING</Text>
                </View>
              </View>

              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Start your conversations now</Text>
            </View>

            {/* Form */}
            <View style={styles.card}>
              <View style={styles.form}>
                {/* Username */}
                <View style={styles.field}>
                  <Text style={styles.label}>User Name</Text>
                  <TextInput
                    style={styles.input}
                    value={form.fullName}
                    placeholder="John Doe"
                    onChangeText={(text) =>
                      setForm((prev) => ({ ...prev, fullName: text }))
                    }
                  />
                </View>

                {/* Email */}
                <View style={styles.field}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={[
                      styles.input,
                      touched.email && !isEmailValid && styles.inputError,
                    ]}
                    value={form.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="example@gmail.com"
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, email: true }))
                    }
                    onChangeText={(text) =>
                      setForm((prev) => ({ ...prev, email: text }))
                    }
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={[
                        styles.input,
                        touched.password &&
                          !isPasswordValid &&
                          styles.inputError,
                      ]}
                      value={form.password}
                      placeholder="*********"
                      secureTextEntry={!passwordVisible}
                      onBlur={() =>
                        setTouched((prev) => ({ ...prev, password: true }))
                      }
                      onChangeText={(text) =>
                        setForm((prev) => ({ ...prev, password: text }))
                      }
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
                  disabled={!isFormValid || isLoading}
                  onPress={handleSignUp}
                >
                  {isLoading ? (
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <ActivityIndicator size="small" color="#fff" />
                      <Text style={{ color: "#fff" }}>Signing Up</Text>
                    </View>
                  ) : (
                    <Text style={styles.buttonText}>Sign Up</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Link */}
            <View style={styles.linkRow}>
              <Text style={styles.linkCopy}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.replace("(auth)/sign-in")}
              >
                <Text style={styles.link}>Sign In</Text>
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

  // Branding
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
  eyeButton: {
    position: "absolute",
    right: 12,
    padding: 8,
    marginTop: 6,
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
    letterSpacing: -0.3,
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
  subtitle: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },

  // Card
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

  // Fields
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
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#1c1c1c",
  },
  inputError: {
    borderColor: "#e53935",
  },
  error: {
    fontSize: 12,
    color: "#e53935",
    marginTop: 2,
  },

  // Primary button
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

  // Secondary button
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

  // Footer link
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

export default SignUp;
