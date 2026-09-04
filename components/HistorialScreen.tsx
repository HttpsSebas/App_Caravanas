import { View, Text, FlatList, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import SessionNameList from "./session_list";
import { useState, useEffect } from "react";
import { getProductores } from "../schema/productores";
import { useRefreshDB } from "../context/refreshDBContext";
import { useSQLiteContext } from "expo-sqlite";

export default function HistorialScreen() {
  const [sessions, setSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const db = useSQLiteContext();

  const { refresh } = useRefreshDB();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions = await getProductores(db);
        setSessions(sessions ?? []);
        console.log(sessions);
      } catch (e) {
        setSessions([]);
        throw new Error("Error al obtener sesiones: " + e);
      }
    };

    fetchSessions();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar sesiones"
        style={styles.searchInput}
        readOnly={sessions.length === 0}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {sessions.length === 0 ? (
        <Text style={styles.title}>No hay sesiones</Text>
      ) : (
        <FlatList
          data={
            searchQuery
              ? sessions.filter((session) =>
                  session.nombre
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
                )
              : sessions
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SessionNameList sessionData={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: "auto",
  },
  searchInput: {
    marginBottom: "auto",
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    width: "100%",
  },
});
