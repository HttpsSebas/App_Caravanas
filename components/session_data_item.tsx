import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { clamp } from "react-native-reanimated";
import { useState, useEffect } from "react";
import { getSessionGanadosById } from "../schema/session_ganados";
import GanadoCard from "./ganado_card";
import { IconSymbol } from "./ui/icon-symbol";
import ExportDataModal from "./export_data";
import { useRefreshDB } from "../context/refreshDBContext";
import { useSQLiteContext } from "expo-sqlite";
import ObservationModal from "./observation_modal";
import { updateGanado } from "../schema/ganados";
import infoAlert from "./infoAlert";

type SessionItemProps = {
  session: {
    id: string;
    session_date: string;
  };
};

export default function SessionItem({ session }: SessionItemProps) {
  const [openSessionData, setOpenSessionData] = useState(false);
  const [sessionData, setSessionData] = useState([]);

  const db = useSQLiteContext();

  const { refresh, setRefresh } = useRefreshDB();

  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [observationModalVisible, setObservationModalVisible] = useState(false);
  const [selectedGanadoId, setSelectedGanadoId] = useState<number | null>(null);
  const [observaciones, setObservaciones] = useState("");
  const date = new Date(session.session_date);

  const updateObservation = async () => {
    if (selectedGanadoId === null) {
      infoAlert("Error", "Seleccione un ganado");
      return;
    }
    const updatedGanado = sessionData.map((ganado: any) => {
      if (ganado.id !== selectedGanadoId) {
        return ganado
      }
      return {
        ...ganado,
        observaciones
      }
    })
    const res = await updateGanado({ db, data: updatedGanado });
    if (!res.ok) {
      infoAlert("Error", "Error actualizando el ganado");
      return;
    }
    setSessionData(updatedGanado);
    setRefresh((prev: number) => prev + 1);
    setObservationModalVisible(false);
    setObservaciones("");
    setSelectedGanadoId(null);
  };

  useEffect(() => {
    const fetchSessionData = async () => {
      const sessionData = await getSessionGanadosById({
        id: Number(session.id),
        db,
      });
      setSessionData(sessionData);
    };
    fetchSessionData();
  }, [refresh]);

  return (
    <>
      <View>
        <Pressable
          style={styles.date}
          onPress={() => setOpenSessionData(!openSessionData)}
        >
          <Text style={styles.sessionName}>
            {date.toLocaleDateString("es-AR")}
          </Text>
          <Text style={styles.sessionName}>
            {date.toLocaleTimeString("es-AR")}
          </Text>
          <Pressable onPress={() => setExportModalVisible(true)}>
            <IconSymbol name="arrow.down.circle" size={24} color="blue" />
          </Pressable>
          <Text style={styles.arrow}>{openSessionData ? "▲" : "▼"}</Text>
        </Pressable>
      </View>

      {openSessionData && (
        <View style={styles.container}>
          <FlatList
            data={sessionData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setSelectedGanadoId(item.id);
                  setObservationModalVisible(true);
                  setObservaciones(item.observaciones);
                }}
              >
                <GanadoCard
                  caravana={item.caravana_id}
                  sexo={item.sexo}
                  observaciones={item.observaciones}
                />
              </Pressable>
            )}
          />

          <ObservationModal
            showObservationModal={observationModalVisible}
            onSave={updateObservation}
            observation={observaciones}
            setObservation={setObservaciones}
          />
        </View>
      )}

      {exportModalVisible && (
        <ExportDataModal
          visible={exportModalVisible}
          onClose={() => setExportModalVisible(false)}
          data={sessionData.map((item) => ({
            caravana: item.caravana_id,
            sexo: item.sexo,
            observaciones: item.observaciones
          }))}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
