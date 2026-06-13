import { View, Text, StyleSheet, Button } from "react-native";
import { importDatabase, exportDatabase } from "../Services/export_import_database"
import { cleanDatabase } from "../schema/db"
import { useRefreshDB } from "../context/refreshDBContext";

export default function SettingsScreen() {
    const { triggerRefresh } = useRefreshDB();
    return (
        <View style={styles.container}>
            <Button title="Importar Base de Datos" onPress={importDatabase} />
            <Button title="Exportar Base de Datos" onPress={exportDatabase} />
            <Button title="Limpiar Base de Datos" onPress={async () => {
                await cleanDatabase();
                triggerRefresh();
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        gap: 20
    },
});