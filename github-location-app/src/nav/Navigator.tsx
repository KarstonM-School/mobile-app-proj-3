import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpPage from "../pages/SignUpPage";
import MapPage from "../pages/MapPage";
import { RootStackParamList, NavProps as Props } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator({ initialUser, onSignIn, onSignOut }: Props) {
  return (
    // Nav environment container
    <NavigationContainer>
      {/* If user is signed in, display map page, otherwise display signup page */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {initialUser ? (
          <Stack.Screen name="Map">
            {(props) => <MapPage {...props} username={initialUser} onSignOut={onSignOut} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="SignUp">{(props) => <SignUpPage {...props} onSuccess={onSignIn} />}</Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
