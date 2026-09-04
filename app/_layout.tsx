import "react-native-reanimated";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SheetNameProvider } from "../context/sheetNameContext";
import RefreshDataProvider from "../context/refreshDBContext";
import { SQLiteProvider } from "expo-sqlite";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName={"ganados.db"}>
        <RefreshDataProvider>
          <SheetNameProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(tabs)" />
            </Stack>
          </SheetNameProvider>
        </RefreshDataProvider>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
