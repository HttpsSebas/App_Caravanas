import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SessionData from "../../components/session_data";
import CreateSessionForm from "../../components/new_session";
import ReadingScreen from "../../components/reading_caravanas";
import { useState, useEffect } from "react";
import { initializeDatabase } from "../../schema/initialize";
import { useSQLiteContext } from "expo-sqlite";

export default function HomeScreen() {
  const [sessionActive, setSessionActive] = useState(false);

  const db = useSQLiteContext();

  useEffect(() => {
    const initDB = async () => {
      await initializeDatabase(db);
    };
    initDB();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <CreateSessionForm
          onStartSession={() => {
            setSessionActive(true);
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 20,
            paddingLeft: 20,
          }}
        >
          Ultimas 2 Sesiones
        </Text>
        <SessionData limit={2} />
        <ReadingScreen
          sessionActive={sessionActive}
          setSessionActive={setSessionActive}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
});
