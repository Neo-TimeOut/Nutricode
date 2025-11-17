import Colors from '@/constants/Colors';
import { addUser, hashPassword } from '@/src/utils/storage';
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

export default function Registrar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);
  const [mensagem, setMensagem] = useState<{ texto: string; tipo: 'erro' | 'sucesso' | '' }>({ texto: '', tipo: '' });

  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';

  async function VerificaRegistro() {
  setMensagem({ texto: '', tipo: '' });


  if (!nome || !email || !senha || !confirmarSenha) {
    setMensagem({ texto: 'Preencha todos os campos.', tipo: 'erro' });
    return;
  }


  if (nome.trim().length < 3) {
    setMensagem({ texto: 'O nome deve ter pelo menos 3 caracteres.', tipo: 'erro' });
    return;
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setMensagem({ texto: 'Digite um email válido (ex: usuario@gmail.com).', tipo: 'erro' });
    return;
  }


  if (senha.length < 8) {
    setMensagem({ texto: 'A senha deve ter pelo menos 8 caracteres.', tipo: 'erro' });
    return;
  }


  if (!/\d/.test(senha)) {
    setMensagem({ texto: 'A senha deve conter pelo menos um número.', tipo: 'erro' });
    return;
  }

  
  if (senha !== confirmarSenha) {
    setMensagem({ texto: 'As senhas não coincidem.', tipo: 'erro' });
    return;
  }

  try {
    const senhaHash = await hashPassword(senha);

    await addUser({ nome, email, senhaHash });

    setMensagem({ texto: 'Conta criada com sucesso! Redirecionando...', tipo: 'sucesso' });

  
    setNome('');
    setEmail('');
    setSenha('');
    setConfirmarSenha('');

    setTimeout(() => router.replace('/(auth)/signin/page'), 2000);
  } catch (err: any) {
    console.error('Erro ao registrar:', err);
    setMensagem({
      texto: err.message || 'Erro ao salvar usuário. Tente novamente.',
      tipo: 'erro',
    });
  }
}

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            isWeb && { justifyContent: 'flex-start', paddingTop: 60 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.container, isWeb && styles.webContainer]}>
            <Image
              source={require('@/assets/images/mascoteLogin.png')}
              style={[styles.logoImage, isWeb && styles.webLogo]}
            />

            <Text style={[styles.logoText, isWeb && styles.webLogoText]}>
              Nutri<Text style={{ color: Colors.white }}>Code</Text>
            </Text>

            <View style={[styles.form, isWeb && styles.webForm]}>
              <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                placeholderTextColor={Colors.black}
                value={nome}
                onChangeText={setNome}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.black}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Campo Senha */}
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  placeholder="Senha"
                  placeholderTextColor={Colors.black}
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!verSenha}
                />
                <TouchableOpacity
                  onPress={() => setVerSenha(!verSenha)}
                  style={styles.showButton}
                >
                  <Ionicons
                    name={verSenha ? 'eye-off' : 'eye'}
                    size={22}
                    color={Colors.black}
                  />
                </TouchableOpacity>
              </View>

              {/* Campo Confirmar Senha */}
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  placeholder="Confirmar senha"
                  placeholderTextColor={Colors.black}
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                  secureTextEntry={!verConfirmarSenha}
                />
                <TouchableOpacity
                  onPress={() => setVerConfirmarSenha(!verConfirmarSenha)}
                  style={styles.showButton}
                >
                  <Ionicons
                    name={verConfirmarSenha ? 'eye-off' : 'eye'}
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
                  }}
                >
                  {mensagem.texto}
                </Text>
              ) : null}

              <TouchableOpacity style={styles.button} onPress={VerificaRegistro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/(auth)/signin/page')}>
                <Text style={{ color: 'white', textAlign: 'center', marginTop: 16 }}>
                  Já possui uma conta? <Text style={{ color: Colors.orange }}>Entrar</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.green,
    marginBottom: 0,
  },
  webLogoText: {
    fontSize: 36,
    textAlign: 'center',
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  webLogo: {
    width: 180,
    height: 180,
  },
  form: {
    width: '100%',
  },
  webForm: {
    marginTop: 20,
  },
  input: {
    width: '100%',
    backgroundColor: Colors.green,
    color: Colors.black,
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green,
    borderRadius: 10,
    marginBottom: 14,
    paddingRight: 10,
  },
  showButton: {
    padding: 6,
  },
  button: {
    width: '100%',
    backgroundColor: Colors.orange,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
