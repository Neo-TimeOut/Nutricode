import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

const USERS_KEY = "USERS_V1";
const CURRENT_USER_KEY = "CURRENT_USER_V1";

// Hash da senha
export async function hashPassword(password: string) {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
}

// Usuários
export async function getUsers() {
  const json = await AsyncStorage.getItem(USERS_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveUsers(users: any[]) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function addUser(user: { nome: string; email: string; senhaHash: string }) {
  const users = await getUsers();
  const exists = users.some((u: any) => u.email.toLowerCase() === user.email.toLowerCase());
  if (exists) throw new Error("Email já cadastrado!");
  const id = Date.now().toString();
  users.push({ id, ...user });
  await saveUsers(users);
}

export async function saveCurrentUser(user: any) {
  await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export async function getCurrentUser() {
  const json = await AsyncStorage.getItem(CURRENT_USER_KEY);
  return json ? JSON.parse(json) : null;
}

export async function clearCurrentUser() {
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
}

export async function deleteUser(email: string) {
  const users = await getUsers();
  const filtered = users.filter((u: any) => u.email.toLowerCase() !== email.toLowerCase());
  await saveUsers(filtered);
}

export async function deleteAllUsers() {
  await AsyncStorage.removeItem(USERS_KEY);
}
