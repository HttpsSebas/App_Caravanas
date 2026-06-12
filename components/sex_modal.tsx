import { View, Modal, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";

export default function SexModal({
  showSexModal,
  saveReading,
}: {
  showSexModal: boolean;
  saveReading: (sexo: string) => void;
}) {
  return (
    <View>
      <Modal visible={showSexModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccione el sexo</Text>

            <Pressable onPress={() => saveReading("Macho")}>
              <Text style={styles.machoButton}>Macho</Text>
            </Pressable>

            <Pressable onPress={() => saveReading("Hembra")}>
              <Text style={styles.hembraButton}>Hembra</Text>
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

  machoButton: {
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    textAlign: "center",
  },
  hembraButton: {
    backgroundColor: "#ec4899",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    textAlign: "center",
  },
});
