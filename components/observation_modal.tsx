import { View, Modal, Text, Pressable, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";

export default function ObservationModal({
  showObservationModal,
  onSave,
  observation,
  setObservation,
}: {
  showObservationModal: boolean;
  onSave: (observation: string) => void;
  observation: string;
  setObservation: (observation: string) => void;
}) {
  return (
    <View>
      <Modal visible={showObservationModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Observaciones</Text>

            <TextInput
              placeholder="Observaciones"
              value={observation}
              onChangeText={setObservation}
              style={styles.input}
              multiline
              maxLength={200}
            />

            <Pressable onPress={() => onSave(observation)}>
              <Text style={styles.saveButton}>Guardar</Text>
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

  saveButton: {
    color: "#fff",
    backgroundColor: "#3b82f6",
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
