import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { useRef, useState } from "react";
import * as Crypto from "expo-crypto";
import SexModal from "./sex_modal";
import ExportDataModal from "./export_data";
import { createProductor } from "../schema/productores";
import { createGanados } from "../schema/ganados";
import { useSheetName } from "../context/sheetNameContext";

export default function ReadingScreen({
  sessionActive,
  setSessionActive,
}: {
  sessionActive: boolean;
  setSessionActive: (active: boolean) => void;
}) {
  const inputRef = useRef<TextInput>(null);
  const processingRef = useRef(false);

  const [caravana, setCaravan] = useState("");
  const [pendingCaravan, setPendingCaravan] = useState("");
  const [showSexModal, setShowSexModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const { sheetName, setSheetName } = useSheetName();

  const [readings, setReadings] = useState<
    { id: string; caravana: string; sexo: string }[]
  >([]);

  const saveReading = (sexo: string) => {
    setReadings((prev) => {
      if (prev.some((r) => r.caravana === pendingCaravan)) {
        Alert.alert(
          "Caravana ya leída",
          `La caravana ${pendingCaravan} ya fue leída en esta sesión.`,
        );
        return prev;
      }

      return [
        {
          id: Crypto.randomUUID(),
          caravana: pendingCaravan,
          sexo,
        },
        ...prev,
      ];
    });

    setShowSexModal(false);
    setPendingCaravan("");

    setTimeout(() => {
      processingRef.current = false;
      inputRef.current?.focus();
    }, 100);
  };

  const handleRead = () => {
    if (processingRef.current) return;

    processingRef.current = true;

    const value = caravana.trim();

    console.log("Reading caravan:", value);

    if (!value) {
      processingRef.current = false;
      return;
    }

    setPendingCaravan(value);
    setShowSexModal(true);

    setCaravan("");
  };

  return (
    <>
      <Modal visible={sessionActive} transparent={true}>
        <View style={styles.container}>
          <Text style={styles.title}>Sesión Activa</Text>

          <Text style={styles.counter}>Lecturas: {readings.length}</Text>

          <TextInput
            ref={inputRef}
            value={caravana}
            onChangeText={setCaravan}
            onSubmitEditing={handleRead}
            autoFocus
            placeholder="Esperando lectura..."
            style={styles.input}
          />

          <FlatList
            data={readings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text>{item.caravana}</Text>
                <Text>{item.sexo}</Text>
              </View>
            )}
          />

          <Pressable
            style={styles.finishButton}
            onPress={async () => {
              setSessionActive(false);
              setShowExportModal(true);
              const productorId = await createProductor(sheetName);
              await createGanados(readings.map(({ caravana, sexo }) => ({ caravana_id: caravana, sexo, productor_id: productorId })));
            }}
          >
            <Text style={styles.finishText}>Terminar Sesión</Text>
          </Pressable>
        </View>
      </Modal>

      <SexModal showSexModal={showSexModal} saveReading={saveReading} />

      <ExportDataModal 
       visible={showExportModal} 
       onClose={() => {
          setShowExportModal(false);
          setReadings([]);
       }} 
       data={readings.map(({ caravana, sexo }) => ({ Caravana: caravana, Sexo: sexo }))}
       />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  counter: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  row: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  finishButton: {
    backgroundColor: "#dc2626",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  finishText: {
    color: "#fff",
    fontWeight: "bold",
  },

});
