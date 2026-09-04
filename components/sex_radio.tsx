import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function SexRadio({
    sex,
    setSex
}: {
  sex: string;
  setSex: (sex: string) => void;
}) {

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.option}
        onPress={() => setSex("macho")}
      >
        <View style={styles.radio}>
          {sex === "macho" && <View style={styles.selected} />}
        </View>
        <Text style={styles.text}>Macho</Text>
      </Pressable>

      <Pressable
        style={styles.option}
        onPress={() => setSex("hembra")}
      >
        <View style={styles.radio}>
          {sex === "hembra" && <View style={styles.selected} />}
        </View>
        <Text style={styles.text}>Hembra</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  text: {
    fontSize: 16,
  },
});