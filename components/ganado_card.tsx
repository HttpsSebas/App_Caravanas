import { View, Text, StyleSheet } from "react-native";

export default function GanadoCard({
  caravana,
  sexo,
  observaciones,
}: {
  caravana: string;
  sexo: string;
  observaciones: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{caravana}</Text>
        <Text
          style={{
            ...styles.badge,
            ...(sexo == "macho" && styles.badgeMale),
            ...(sexo == "hembra" && styles.badgeFemale),
          }}
        >{`${sexo.charAt(0).toUpperCase()}${sexo.slice(1)}`}</Text>
      </View>
      <Text numberOfLines={2}>{observaciones || "Sin observaciones"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    marginBottom: 12,

    backgroundColor: "#FFF",
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    color: "#FFF",
  },
  badgeMale: {
    backgroundColor: "#3b82f6",
  },
  badgeFemale: {
    backgroundColor: "#ef4444",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
