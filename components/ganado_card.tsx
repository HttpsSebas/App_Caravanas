import { View, Text, StyleSheet } from "react-native";

export default function GanadoCard({ caravana, sexo }: { caravana: string; sexo: string }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{caravana}</Text>
            <Text style={styles.subtitle}>{sexo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'normal',
    },
});