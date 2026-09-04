import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getSessionsByDate } from "../schema/session";
import { clamp } from "react-native-reanimated";
import SessionItem from "./session_data_item";
import { useRefreshDB } from "../context/refreshDBContext";
import { useSQLiteContext } from "expo-sqlite";
import infoAlert from "./infoAlert";

export default function SessionData({
  limit,
  productorId,
}: {
  limit?: number;
  productorId?: number;
}) {
  const [sessions, setSessions] = useState([]);

  const db = useSQLiteContext();

  const { refresh } = useRefreshDB();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions = await getSessionsByDate({ limit, productorId, db });
        setSessions(sessions);
      } catch (e) {
        setSessions([]);
        infoAlert("Error al obtener las sesiones", e.message);
      }
    };
    fetchSessions();
  }, [productorId, refresh]);

  return (
    <View style={styles.container}>
      {sessions.length > 0 ? (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SessionItem session={item} />}
        />
      ) : (
        <Text>No hay sesiones</Text>
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
    fontSize: clamp(12, 16, 20),
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
  date: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
});
