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
import SexRadio from "./sex_radio";
import ExportDataModal from "./export_data";
import ObservationModal from "./observation_modal";
import { insertData } from "../schema/initialize";
import { useSheetName } from "../context/sheetNameContext";
import { useRefreshDB } from "../context/refreshDBContext";
import GanadoCard from "./ganado_card";
import { useSQLiteContext } from "expo-sqlite";
import infoAlert from "./infoAlert";

export default function ReadingScreen({
  sessionActive,
  setSessionActive,
}: {
  sessionActive: boolean;
  setSessionActive: (active: boolean) => void;
}) {
  const inputRef = useRef<TextInput>(null);
  const processingRef = useRef(false);
  const caravanaRef = useRef("");

  const { setRefresh } = useRefreshDB();

  const db = useSQLiteContext();

  const [caravana, setCaravan] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
  const [sex, setSex] = useState("macho");
  const [showObservationModal, setShowObservationModal] = useState(false);
  const [observation, setObservation] = useState("");
  const [selectedGanadoId, setSelectedGanadoId] = useState<string | null>(null);

  const { sheetName } = useSheetName();

  const [readings, setReadings] = useState<
    { id: string; caravana: string; sexo: string; observaciones: string }[]
  >([]);

  const editGanado = () => {
    if (selectedGanadoId === null) {
      infoAlert("Error", "Seleccione un ganado");
      return;
    }

    setReadings((prev) =>
      prev.map((ganado) =>
        ganado.id === selectedGanadoId
          ? { ...ganado, observaciones: observation }
          : ganado,
      ),
    );
    setObservation("");
    setSelectedGanadoId(null);
    setShowObservationModal(false);
  };

  const saveReading = () => {
    if (selectedGanadoId !== null) {
      editGanado();
      return;
    }

    setReadings((prev) => {
      if (prev.some((r) => r.caravana === caravana)) {
        infoAlert("Caravana duplicada", "La caravana ya está en la sesión");
        return prev;
      }

      return [
        {
          id: Crypto.randomUUID(),
          caravana: caravana,
          sexo: sex,
          observaciones: observation,
        },
        ...prev,
      ];
    });

    setObservation("");
    setShowObservationModal(false);

    setTimeout(() => {
      processingRef.current = false;
      inputRef.current?.focus();
    }, 100);
  };

  const handleRead = () => {
    if (processingRef.current) return;
    processingRef.current = true;

    setTimeout(() => {
      const value = caravanaRef.current.trim();
      caravanaRef.current = "";

      if (!value) {
        processingRef.current = false;
        return;
      }

      setCaravan("");

      setTimeout(() => {
        processingRef.current = false;
        inputRef.current?.focus();
      }, 100);

      saveReading();
    }, 100);
  };

  const handleFinishSession = async () => {
    try {
      setSessionActive(false);

      const res = await insertData({ db, sheetName, readings });

      if (!res.ok) {
        infoAlert("Error", res.message);
        return;
      }

      setShowExportModal(true);
      infoAlert("Sesión guardada", res.message);

      setRefresh((prev: number) => prev + 1);
    } catch (error) {
      infoAlert("Error", "Error guardando la sesión");
    }
  };

  return (
    <>
      <Modal visible={sessionActive} transparent={true}>
        <View style={styles.container}>
          <Text style={styles.title}>Sesión Activa</Text>

          <Text style={styles.counter}>Lecturas: {readings.length}</Text>

          <SexRadio sex={sex} setSex={setSex} />

          <TextInput
            ref={inputRef}
            value={caravana}
            onChangeText={(text) => {
              const cleanedText = text.replace(/\D/g, "");
              setCaravan(cleanedText);
              caravanaRef.current = cleanedText;
            }}
            onSubmitEditing={handleRead}
            keyboardType="numeric"
            autoFocus
            placeholder="Esperando lectura..."
            style={styles.input}
          />

          <FlatList
            data={readings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setSelectedGanadoId(item.id);
                  setShowObservationModal(true);
                  setObservation(item.observaciones);
                }}
                style={styles.row}
              >
                <GanadoCard
                  caravana={item.caravana}
                  sexo={item.sexo}
                  observaciones={item.observaciones}
                />
              </Pressable>
            )}
          />

          <ObservationModal
            showObservationModal={showObservationModal}
            onSave={saveReading}
            observation={observation}
            setObservation={setObservation}
          />

          <Pressable style={styles.finishButton} onPress={handleFinishSession}>
            <Text style={styles.finishText}>Terminar Sesión</Text>
          </Pressable>
        </View>
      </Modal>

      <ExportDataModal
        visible={showExportModal}
        onClose={() => {
          setShowExportModal(false);
          setReadings([]);
        }}
        data={readings.map(({ caravana, sexo, observaciones }) => ({
          Caravana: caravana,
          Sexo: sexo,
          Observaciones: observaciones,
        }))}
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
