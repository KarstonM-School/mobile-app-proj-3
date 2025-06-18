import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { LatLng } from "react-native-maps";

// Calgary coords
export const CALGARY_COORD: LatLng = {
  latitude: 51.0447,
  longitude: -114.0719,
};

// Function to obtain users current gps location and return a Lat and Lng
export async function getPos(): Promise<LatLng> {
  const { status } = await requestForegroundPermissionsAsync();

  if (status === "granted") {
    const { coords } = await getCurrentPositionAsync();
    const { latitude, longitude } = coords;
    return { latitude, longitude };
  } else {
    throw Error("Permission has not been granted.");
  }
}
