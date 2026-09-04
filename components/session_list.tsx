import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import SessionData from "./session_data";
import { clamp } from "react-native-reanimated";
import { useSheetName } from "../context/sheetNameContext";

export default function SessionNameList({ sessionData }) {
  const [openSessionList, setOpenSessionList] = useState(false);
  const { setSheetName } = useSheetName();

  useEffect(() => {
    setSheetName(sessionData.nombre.trim());
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setOpenSessionList(!openSessionList)}
        style={styles.button}
      >
        <Text style={styles.sessionName}>{sessionData.nombre}</Text>

        <Text style={styles.arrow}>{openSessionList ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {openSessionList && (
        <SessionData productorId={sessionData.id}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: "auto",
    padding: 20,
  },
  sessionName: {
    fontSize: clamp(16, 20, 24),
    fontWeight: "bold",
    color: "black",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    fontSize: clamp(16, 20, 24),
    fontWeight: "bold",
    color: "black",
  },
});
