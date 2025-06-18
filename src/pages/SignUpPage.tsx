import React, { useState } from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { saveUserToStorage } from "../services/storage";
import { validateGithubUser } from "../services/github";
import { SignUpPageProps as Props } from "../types/navigation";

export default function SignUpPage({ onSuccess }: Props) {
  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);

  // Validate and sign up
  const submit = async () => {
    const name = username.trim();
    if (!name) {
      Alert.alert("Please enter a GitHub username");
      return;
    }
    setChecking(true);

    const valid = await validateGithubUser(name);
    setChecking(false);

    if (valid) {
      await saveUserToStorage(name);
      onSuccess(name);
    } else {
      Alert.alert("Invalid or non‑existent GitHub account");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Sign up with your GitHub username</Text>
      <TextInput
        placeholder="Please enter your GitHub username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={styles.input}
      />
      <Button title={checking ? "Validating…" : "Sign Up"} onPress={submit} disabled={checking} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    marginBottom: 24,
    textAlign: "center",
    color: "#FFFFFF",
    backgroundColor: "#0000FF",
    borderRadius: 4,
  },
  container: { flex: 1, justifyContent: "center", padding: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 16, borderRadius: 4 },
});
