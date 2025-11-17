import Colors from '@/constants/Colors';
import { getUsers, hashPassword, saveCurrentUser } from '@/src/utils/storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Logar() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState<{ texto: string; tipo: 'erro' | 'sucesso' | '' }>({ texto: '', tipo: '' });

  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';

  async function VerificaLogin() {
    setMensagem({ texto: '', tipo: '' });

    if (!email || !senha) {
      setMensagem({ texto: 'Preencha todos os campos.', tipo: 'erro' });
      return;
    }

    try {
      const users = await getUsers();
      const senhaHash = await hashPassword(senha); 

      const foundUser = users.find(
        (u: any) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.senhaHash === senhaHash);

      if (!foundUser) {
        setMensagem({ texto: 'Email ou senha incorretos.', tipo: 'erro' });
        return;
      }

      await saveCurrentUser(foundUser); 
      setMensagem({ texto: 'Login realizado com sucesso!', tipo: 'sucesso' });

      setTimeout(() => router.push('/(auth)/telas/telaHome/page'), 1000);
    } catch (err) {
      console.error(err);
      setMensagem({ texto: 'Erro ao tentar logar. Tente novamente.', tipo: 'erro' });
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            isWeb && { justifyContent: 'flex-start', paddingTop: 60 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={[styles.container, isWeb && styles.webContainer]}>
            <Image
              source={require('@/assets/images/mascoteLogin.png')}
              style={[styles.logoImage, isWeb && styles.webLogo]}
            />
            <Text style={[styles.logoText, isWeb && styles.webLogoText]}>
              Nutri<Text style={{ color: Colors.white }}>Code</Text>
            </Text>

            <Text style={[styles.mensagemInicialCel, isWeb && styles.mensagemInicialPC]}>
              Bem-vindo!
            </Text>

            <View style={[styles.form, isWeb && styles.webForm]}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.black}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  placeholder="Senha"
                  placeholderTextColor={Colors.black}
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!mostrarSenha}
                />
                <TouchableOpacity
                  onPress={() => setMostrarSenha(!mostrarSenha)}
                  style={styles.eyeButton}>
                  <Ionicons
                    name={mostrarSenha ? 'eye-off' : 'eye'}
                    size={22}
                    color={Colors.black}
                  />
                </TouchableOpacity>
              </View>

              {mensagem.texto ? (
                <Text
                  style={{
                    color: mensagem.tipo === 'erro' ? 'red' : 'lightgreen',
                    textAlign: 'center',
                    marginBottom: 10,
                  }}>
                  {mensagem.texto}
                </Text>
              ) : null}

              <TouchableOpacity style={styles.button} onPress={VerificaLogin}>
                <Text style={styles.buttonText}>Logar</Text>
              </TouchableOpacity>

              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  paddingTop: 20,
                }}
                onPress={() => router.push('/(auth)/signup/page')}>
                Não possui uma conta?
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.black },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  container: { width: '100%', alignItems: 'center', marginBottom: 100 },
  webContainer: {
    maxWidth: 420,
    width: '90%',
    backgroundColor: '#fff2',
    padding: 20,
    borderRadius: 20,
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.green,
    marginBottom: 30,
  },
  webLogoText: { fontSize: 36, textAlign: 'center', marginBottom: 40 },
  logoImage: { width: 150, height: 150, resizeMode: 'contain', marginBottom: 10 },
  webLogo: { width: 180, height: 180 },
  form: { width: '100%' },
  webForm: { marginTop: 20 },
  input: {
    width: '100%',
    backgroundColor: Colors.green,
    color: Colors.black,
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green,
    borderRadius: 10,
    marginBottom: 14,
    paddingRight: 10,
  },
  eyeButton: { padding: 4 },
  button: {
    width: '100%',
    backgroundColor: Colors.orange,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: Colors.black, fontSize: 16, fontWeight: 'bold' },
  mensagemInicialPC: { color: Colors.white, fontSize: 26, fontWeight: 'bold' },
  mensagemInicialCel: { color: Colors.white, fontSize: 20, fontWeight: 'bold', marginBottom: 30 },
});
