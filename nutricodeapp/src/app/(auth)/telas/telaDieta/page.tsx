import Colors from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TelaDieta() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.webContainer}>
            <Text style={styles.mensagemInicialPC}>Tela de Dieta</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  webContainer: {
    maxWidth: 420,
    width: '90%',
    backgroundColor: '#fff2',
    padding: 20,
    borderRadius: 20,
  },
  mensagemInicialPC: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
