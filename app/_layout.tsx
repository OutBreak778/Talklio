import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash-screen" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />

      <Stack.Screen name="/(auth)/sign-in" options={{ headerShown: false }} />
    </Stack>
  );
}
