import { View, Modal, Text, Pressable, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import SexRadio from "./sex_radio";

export default function GanadoActionsModal({
  showGanadoModal,
  onSave,
  onDelete,
  onClose,
  data,
  setData,
}: {
  showGanadoModal: boolean;
  onSave: (observation: string) => void;
  onDelete: () => void;
  onClose: () => void;
  data: any;
  setData: (data: any) => void;
}) {
  return (
    <View>
      <Modal visible={showGanadoModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Observaciones</Text>

            <TextInput
              placeholder="Caravana"
              value={data.caravana_id}
              onChangeText={(text) => setData({ ...data, caravana_id: text })}
              style={styles.input}
              maxLength={20}
            />

            <TextInput
              placeholder="Observaciones"
              value={data.observaciones}
              onChangeText={(text) => setData({ ...data, observaciones: text })}
              style={styles.input}
              multiline
              maxLength={200}
            />

            <SexRadio
              sex={data.sexo}
              setSex={(sex) => setData({ ...data, sexo: sex })}
            />

            <Pressable onPress={onDelete}>
              <Text style={styles.deleteButton}>Eliminar</Text>
            </Pressable>

            <Pressable onPress={() => onSave(data.observaciones)}>
              <Text style={styles.saveButton}>Guardar</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                onClose();
                setData({ ...data, observaciones: "" });
              }}
            >
              <Text style={styles.cancelButton}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  modalText: {
    fontWeight: "bold",
    color: "#3b82f6",
    marginBottom: 15,
    fontSize: 16,
  },

  saveButton: {
    color: "#fff",
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    textAlign: "center",
  },

  cancelButton: {
    color: "#ffffff",
    backgroundColor: "#7b7b7b",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    textAlign: "center",
  },

  deleteButton: {
    color: "#fff",
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
});
