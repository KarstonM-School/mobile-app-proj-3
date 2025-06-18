import React, { useState, useEffect, useRef } from "react";
import { View, Modal, StyleSheet, TouchableOpacity, Text, BackHandler, StatusBar } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, type LatLng } from "react-native-maps";
import { WebView } from "react-native-webview";
import { MapPageProps as Props } from "../types/navigation";
import { CALGARY_COORD, getPos } from "../services/gps-location";
import { getUsers } from "../services/users";

export default function MapPage({ username, onSignOut }: Props) {
  // Static list of GitHub users with coords
  const [markers, setMarkers] = useState<{ username: string; coord: LatLng }[]>([]);

  // Stores the currently opened GitHub URL
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  // Reference to WebView for back handling
  const webviewRef = useRef<any>(null);

  // Initialize the static list of markers once on load
  useEffect(() => {
    const setupMarkers = async () => {
      try {
        // Get current GPS location of logged-in user
        const [currPos, users] = await Promise.all([getPos(), getUsers()]);
        const selfMarker = { username, coord: currPos };

        // Fetch other GitHub users from mock API
        const apiMarkers = users.map((user) => ({
          username: user.username,
          coord: {
            latitude: user.coord.latitude,
            longitude: user.coord.longitude,
          },
        }));

        // Add current user to the top of the marker list
        setMarkers([selfMarker, ...apiMarkers]);
      } catch (err) {
        console.error("Failed to set up markers:", err);
      }
    };

    setupMarkers();
  }, []);

  // Handle hardware back button within WebView modal
  useEffect(() => {
    if (!modalUrl) return;

    const backAction = () => {
      if (webviewRef.current?.canGoBack) {
        webviewRef.current.goBack(); // Navigate back within WebView
      } else {
        setModalUrl(null); // Exit WebView modal
      }
      return true;
    };

    const listener = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => listener.remove(); // Clean up on unmount
  }, [modalUrl]);

  // Opens a GitHub profile in the WebView modal
  const openProfile = (user: string) => setModalUrl(`https://github.com/${user}`);

  return (
    <View style={{ flex: 1 }}>
      {/* Main map displaying static GitHub markers */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: CALGARY_COORD.latitude,
          longitude: CALGARY_COORD.longitude,
          // Zoom Level
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {markers.map((m, index) => (
          <Marker
            key={`${m.username}-${index}`}
            coordinate={m.coord}
            title={m.username}
            onPress={() => openProfile(m.username)}
          />
        ))}
      </MapView>

      {/* Sign out button overlayed on map */}
      <TouchableOpacity style={styles.logoutBtn} onPress={onSignOut}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      {/* WebView modal that opens GitHub profiles */}
      {modalUrl && (
        <Modal visible animationType="slide" statusBarTranslucent={true} onRequestClose={() => setModalUrl(null)}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.backBtn} onPress={() => setModalUrl(null)}>
              <Text style={styles.backText}>← Back to Map</Text>
            </TouchableOpacity>
            <WebView
              ref={webviewRef}
              source={{ uri: modalUrl }}
              startInLoadingState
              style={styles.webview}
              onNavigationStateChange={(nav) => {
                webviewRef.current.canGoBack = nav.canGoBack;
              }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}

// Styles for UI elements
const styles = StyleSheet.create({
  logoutBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#0000FF",
    padding: 8,
    borderRadius: 4,
    elevation: 4,
  },
  logoutText: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  modalContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 24, // Prevents back button from hiding under status bar
  },
  backBtn: {
    padding: 12,
    backgroundColor: "#0000FF",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  backText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  webview: {
    flex: 1,
  },
});
