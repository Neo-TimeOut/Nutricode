"use client";
import Colors from "@/constants/Colors";
import {
  clearCurrentUser,
  deleteAllUsers,
  deleteUser,
  getCurrentUser,
} from "@/src/utils/storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TelaConfig() {
  const [usuario, setUsuario] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [acao, setAcao] = useState<"conta" | "todos" | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const current = await getCurrentUser();
      setUsuario(current);
    })();
  }, []);

  async function handleExcluirConta() {
    if (!usuario) return;
    await deleteUser(usuario.email);
    await clearCurrentUser();
    setModalVisible(false);
    router.replace("/signin/page");
  }

  async function handleExcluirTodos() {
    await deleteAllUsers();
    await clearCurrentUser();
    setModalVisible(false);
    router.replace("/signin/page");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      {usuario && (
        <Text style={styles.infoText}>
          Usuário logado: <Text style={styles.loggedUser}>{usuario.email}</Text>
        </Text>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#e53935" }]}
        onPress={() => {
          setAcao("conta");
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Excluir minha conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#757575" }]}
        onPress={() => {
          setAcao("todos");
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Excluir todos os usuários</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Confirmar ação</Text>
            <Text style={styles.modalMessage}>
              {acao === "conta"
                ? "Tem certeza que deseja excluir sua conta?"
                : "Tem certeza que deseja excluir todos os usuários?"}
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#ccc" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalBtn,
                  { backgroundColor: acao === "conta" ? "#e53935" : "#616161" },
                ]}
                onPress={acao === "conta" ? handleExcluirConta : handleExcluirTodos}
              >
                <Text style={[styles.modalBtnText, { color: "#fff" }]}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: Colors.white, 
  },

  infoText: {
    fontSize: 16,
    color: Colors.white, 
    marginBottom: 20,
  },

  loggedUser: {
    fontWeight: "bold",
    color: Colors.white, 
  },

  button: {
    width: "80%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  modalMessage: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 4,
  },

  modalBtnText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
