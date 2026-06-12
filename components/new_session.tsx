import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useSheetName } from "../context/sheetNameContext";

type Props = {
  onStartSession: (sessionName: string) => void;
};

export default function CreateSessionForm({ onStartSession }: Props) {
  const [sessionName, setSessionName] = useState("");
  const { sheetName, setSheetName } = useSheetName();

  const handleSubmit = () => {
    if (!sessionName.trim()) return;

    onStartSession(sessionName.trim());
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Nueva Sesión</Text>
        <TextInput
          placeholder="Nombre de la sesión"
          value={sessionName}
          onChangeText={setSessionName}
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={() => {
          setSheetName(sessionName.trim() || "Lecturas");
          handleSubmit();
        }}>
          <Text style={styles.buttonText}>Crear Sesión</Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
