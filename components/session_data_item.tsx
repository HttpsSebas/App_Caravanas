import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { clamp } from "react-native-reanimated";
import { useState, useEffect } from "react";
import { getSessionGanadosById } from "../schema/session_ganados";
import GanadoCard from "./ganado_card";
import { IconSymbol } from "./ui/icon-symbol";
import ExportDataModal from "./export_data";
import { useRefreshDB } from "../context/refreshDBContext";
import { useSQLiteContext } from "expo-sqlite";
import GanadoActions from "./ganado_actions_modal";
import { updateGanado, deleteGanado } from "../schema/ganados";
import infoAlert from "./infoAlert";

type SessionItemProps = {
  session: {
    id: string;
    session_date: string;
  };
};

export default function SessionItem({ session }: SessionItemProps) {
  type Ganado = {
    id: string;
    caravana_id: string;
    sexo: string;
    observaciones: string;
  };

  const [openSessionData, setOpenSessionData] = useState(false);
  const [sessionData, setSessionData] = useState([]);

  const db = useSQLiteContext();

  const { refresh, setRefresh } = useRefreshDB();

  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [actionsModalVisible, setActionsModalVisible] = useState(false);
  const [selectedGanado, setSelectedGanado] = useState<Ganado | null>(null);
  const date = new Date(session.session_date);

  const updateGanadoData = async () => {
    if (selectedGanado === null) {
      infoAlert("Error", "Seleccione un ganado");
      return;
    }
    const updatedGanado = sessionData.map((ganado: any) => {
      if (ganado.id !== selectedGanado.id) {
        return ganado;
      }
      return {
        ...ganado,
        ...selectedGanado,
      };
    });
    const res = await updateGanado({ db, data: updatedGanado });
    if (!res.ok) {
      infoAlert("Error", "Error actualizando el ganado");
      return;
    }
    setSessionData(updatedGanado);
    setRefresh((prev: number) => prev + 1);
    setActionsModalVisible(false);
    setSelectedGanado(null);
  };

  const handleDelete = async () => {
    if (selectedGanado === null) {
      infoAlert("Error", "Seleccione un ganado");
      return;
    }

    const res = await deleteGanado({
      db,
      caravana_id: selectedGanado.caravana_id,
    });
    if (!res.ok) {
      infoAlert("Error", res.message || "Error eliminando el ganado");
      return;
    }

    setSessionData((prev) =>
      prev.filter((ganado: any) => ganado.id !== selectedGanado.id),
    );

    setActionsModalVisible(false);
    setSelectedGanado(null);
    setRefresh((prev: number) => prev + 1);
  };

  const handleEditData = async (data: any) => {
    if (selectedGanado === null) {
      infoAlert("Error", "Seleccione un ganado");
      return;
    }

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
                  setSelectedGanado(item);
                  setActionsModalVisible(true);
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
        </View>
      )}

      {selectedGanado && (
        <GanadoActions
          showGanadoModal={actionsModalVisible}
          onSave={updateGanadoData}
          onDelete={handleDelete}
          onClose={() => setActionsModalVisible(false)}
          data={selectedGanado}
          setData={handleEditData}
        />
      )}

      {exportModalVisible && (
        <ExportDataModal
          visible={exportModalVisible}
          onClose={() => setExportModalVisible(false)}
          data={sessionData.map((item) => ({
            caravana: item.caravana_id,
            sexo: item.sexo,
            observaciones: item.observaciones,
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
