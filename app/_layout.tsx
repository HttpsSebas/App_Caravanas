import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="(tabs)" />
    </Stack>

    </SafeAreaProvider>
  );
}
