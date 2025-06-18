import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "github_user";

// Retrieves stored GitHub username (if any)
export async function getUserFromStorage(): Promise<string | null> {
  return await AsyncStorage.getItem(KEY);
}

// Saves given GitHub username for session persistence
export async function saveUserToStorage(username: string): Promise<void> {
  await AsyncStorage.setItem(KEY, username);
}
