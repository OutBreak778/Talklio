import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [loaded] = useFonts({
    // FIGTREE
    "Figtree-Regular": require("@/assets/fonts/figtree/static/Figtree-Regular.ttf"),
    "Figtree-Medium": require("@/assets/fonts/figtree/static/Figtree-Medium.ttf"),
    "Figtree-SemiBold": require("@/assets/fonts/figtree/static/Figtree-SemiBold.ttf"),
    "Figtree-Bold": require("@/assets/fonts/figtree/static/Figtree-Bold.ttf"),
    // add others same way...
  });

  if (!loaded) return null;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash-screen" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />

      {/* Auth Group */}
      <Stack.Screen name="(auth)/sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/verify-otp" options={{ headerShown: false }} />

      {/* Main App Group - This covers everything inside (root) */}
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
    </Stack>
  );
}
