import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import Navigator from "./src/nav/Navigator";
import { getUserFromStorage } from "./src/services/storage";

export default function App() {
  // Track loading state and stored GitHub user
  const [initializing, setInitializing] = useState(true); // Loading from storage?
  const [githubUser, setGithubUser] = useState<string | null>(null);

  // On app load, check if user is stored and update
  useEffect(() => {
    (async () => {
      const stored = await getUserFromStorage();
      setGithubUser(stored);
      setInitializing(false);
    })();
  }, []);

  // Show loading spinner while fetching storage
  if (initializing) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  // Render navigator, passing user state and sign-out callback
  return <Navigator initialUser={githubUser} onSignIn={setGithubUser} onSignOut={() => setGithubUser(null)} />;
}
