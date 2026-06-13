import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsScreen from "../../components/settings";

export default function Settings(){
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SettingsScreen />
    </SafeAreaView>
  )
}
