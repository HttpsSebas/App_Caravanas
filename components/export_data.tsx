import { Modal, View, Pressable, Text, StyleSheet } from "react-native";
import { export_excel } from "../Services/export_to_excel"
import { useSheetName } from "../context/sheetNameContext";
 

export default function ExportDataModal({
  visible,
  onClose,
  data,
}: {
  visible: boolean;
  onClose: () => void;
  data: object[];
}) {
  const { sheetName } = useSheetName();
  const handleExport = async () => {
    try {
        await export_excel({data, sheetName, fileName: "Lecturas"});
    } catch (error) {
        throw error;
    } finally {
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Exportar Lecturas</Text>
          <Pressable style={styles.modalButton} onPress={handleExport}>
            <Text style={styles.modalButtonText}>Exportar</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    },
    modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    },
    modalButton: {
    backgroundColor: "#16a34a",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    },
    modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    },
});