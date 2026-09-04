import { View, StyleSheet, Button } from "react-native";
import { cleanDatabase } from "../schema/db";
import { useRefreshDB } from "../context/refreshDBContext";
import { useSQLiteContext } from "expo-sqlite";
import infoAlert from "./infoAlert";

export default function SettingsScreen() {
  const db = useSQLiteContext();
  const { setRefresh } = useRefreshDB();

  const handleClean = async () => {
    const res = await cleanDatabase(db);

    if (res.ok) {
      infoAlert("Base de datos limpiada", "Base de datos limpiada con éxito");
      setRefresh((prev: number) => prev + 1);
    } else {
      infoAlert("Error", "Error limpiando la base de datos");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Limpiar Base de Datos" onPress={() => handleClean()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 20,
  },
});
