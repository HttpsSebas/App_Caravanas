import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Modal,
} from "react-native";
import { useRef, useState } from "react";
import * as Crypto from "expo-crypto";
import SexRadio from "./sex_radio";
import ExportDataModal from "./export_data";
import GanadoActions from "./ganado_actions_modal";
import { insertData } from "../schema/initialize";
import { useSheetName } from "../context/sheetNameContext";
import { useRefreshDB } from "../context/refreshDBContext";
import GanadoCard from "./ganado_card";
import { useSQLiteContext } from "expo-sqlite";
import infoAlert from "./infoAlert";
import { read } from "xlsx";

export default function ReadingScreen({
  sessionActive,
  setSessionActive,
}: {
  sessionActive: boolean;
  setSessionActive: (active: boolean) => void;
}) {
  const inputRef = useRef<TextInput>(null);
  const processingRef = useRef(false);


  type Ganado = {
    id: string;
    caravana_id: string;
    sexo: string;
    observaciones: string;
  };

  const { setRefresh } = useRefreshDB();

  const db = useSQLiteContext();

  const [caravana, setCaravan] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
  const [sex, setSex] = useState("macho");
  const [showGanadoActions, setShowGanadoActions] = useState(false);
  const [selectedGanado, setSelectedGanado] = useState<Ganado | null>(null);

  const { sheetName } = useSheetName();

  const [readings, setReadings] = useState<Ganado[]>([]);

  const editGanado = () => {
    if (!selectedGanado) {
      infoAlert("Error", "Seleccione un ganado");
      return;
    }

    setReadings((prev) =>
      prev.map((g) => {
        if (g.id === selectedGanado.id) {
          return {
            ...g,
            caravana_id: selectedGanado.caravana_id,
            sexo: selectedGanado.sexo,
            observaciones: selectedGanado.observaciones,
          };
        }
        return g;
      }),
    );
    setSelectedGanado(null);
    setShowGanadoActions(false);
  };

  const saveReading = (reading: string) => {
    if (reading.length === 0) {
      processingRef.current = false;
      inputRef.current?.focus();
      return;
    }

    if (selectedGanado) {
      editGanado();
      return;
    }

    const cleanedText = reading.replace(/\D/g, "");

    setReadings((prev) => {
      if (prev.some((r) => r.caravana_id === cleanedText)) {
        infoAlert("Caravana duplicada", "La caravana ya está en la sesión");
        return prev;
      }

      return [
        {
          id: Crypto.randomUUID(),
          caravana_id: cleanedText,
          sexo: sex,
          observaciones: "",
        },
        ...prev,
      ];
    });
    setCaravan("");
    processingRef.current = false;
    inputRef.current?.focus();
  };

  const handleRead = (reading: string) => {
    // Prevent multiple reads at the same time
    if (processingRef.current) return;

    processingRef.current = true;

    if (reading.length === 0) {
      processingRef.current = false;
      inputRef.current?.focus();
      return;
    }

    saveReading(reading);
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

  const handleDelete = () => {
    if (!selectedGanado) {
      infoAlert("Error", "Seleccione un ganado");
      return;
    }

    infoAlert("Confirmación", "¿Está seguro de eliminar este ganado?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setReadings((prev) => prev.filter((g) => g.id !== selectedGanado.id));
          setSelectedGanado(null);
          setShowGanadoActions(false);
        },
      },
    ]);
  };

  const handleEditData = (data: { sexo: string; observaciones: string }) => {
    setSelectedGanado((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        ...data,
        observaciones: data.observaciones,
        sexo: data.sexo,
      };
    });
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
            }}
            onSubmitEditing={(e) => {
              handleRead(e.nativeEvent.text);
            }}
            keyboardType="numeric"
            autoFocus
            maxLength={20}
            placeholder="Esperando lectura..."
            style={styles.input}
          />

          <FlatList
            data={readings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setSelectedGanado(item);
                  setShowGanadoActions(true);
                }}
                style={styles.row}
              >
                <GanadoCard
                  caravana={item.caravana_id}
                  sexo={item.sexo}
                  observaciones={item.observaciones}
                />
              </Pressable>
            )}
          />

          {selectedGanado && (
            <GanadoActions
              showGanadoModal={showGanadoActions}
              onSave={editGanado}
              onDelete={handleDelete}
              onClose={() => {
                setShowGanadoActions(false);
                setSelectedGanado(null);
              }}
              data={selectedGanado}
              setData={handleEditData}
            />
          )}

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
        data={readings.map(({ caravana_id, sexo, observaciones }) => ({
          Caravana: caravana_id,
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
