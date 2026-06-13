import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LastCaravansRead from "../../components/last_caravans_read";
import CreateSessionForm from "../../components/new_session";
import ReadingScreen from "../../components/reading_caravanas";
import { useState, useEffect } from "react";
import { SheetNameProvider } from "../../context/sheetNameContext";
import { RefreshDBProvider } from "../../context/refreshDBContext";
import { initializeDatabase } from "../../schema/initialize";

export default function HomeScreen() {
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <SheetNameProvider>
      <RefreshDBProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <CreateSessionForm
              onStartSession={() => {
                setSessionActive(true);
              }}
            />
            <LastCaravansRead />
            <ReadingScreen
              sessionActive={sessionActive}
              setSessionActive={setSessionActive}
            />
          </View>
        </SafeAreaView>
      </RefreshDBProvider>
    </SheetNameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
});
