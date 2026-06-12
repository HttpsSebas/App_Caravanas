import { View, StyleSheet, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen(){
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Settings Screen</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
