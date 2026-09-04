import { SafeAreaView } from "react-native-safe-area-context"; 
import HistorialScreen from "../../components/HistorialScreen";

export default function Historial() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HistorialScreen />
        </SafeAreaView>
    );
}