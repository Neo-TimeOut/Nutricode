import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Slot, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LayoutTelas() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Slot />
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => router.push('/telas/telaHome/page')}
        >
          <Ionicons
            name="home"
            size={26}
            color={pathname === '/telas/telaHome/page' ? Colors.green : Colors.white}
          />
          <Text
            style={[
              styles.iconLabel,
              { color: pathname === '/telas/telaHome/page' ? Colors.green : Colors.white },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => router.push('/telas/telaDieta/page')}
        >
          <Ionicons
            name="restaurant"
            size={26}
            color={pathname === '/telas/telaDieta/page' ? Colors.green : Colors.white}
          />
          <Text
            style={[
              styles.iconLabel,
              { color: pathname === '/telas/telaDieta/page' ? Colors.green : Colors.white },
            ]}
          >
            Dieta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => router.push('/telas/telaTreino/page')}
        >
          <Ionicons
            name="barbell"
            size={26}
            color={pathname === '/telas/telaTreino/page' ? Colors.green : Colors.white}
          />
          <Text
            style={[
              styles.iconLabel,
              { color: pathname === '/telas/telaTreino/page' ? Colors.green : Colors.white },
            ]}
          >
            Treino
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => router.push('/telas/telaConfig/page')}
        >
          <Ionicons
            name="settings"
            size={26}
            color={pathname === '/telas/telaConfig/page' ? Colors.green : Colors.white}
          />
          <Text
            style={[
              styles.iconLabel,
              { color: pathname === '/telas/telaConfig/page' ? Colors.green : Colors.white },
            ]}
          >
            Config
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  content: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#111',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    color: Colors.white,
    fontSize: 12,
    marginTop: 3,
  },
});
