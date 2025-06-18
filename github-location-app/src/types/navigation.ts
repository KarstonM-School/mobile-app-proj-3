import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  SignUp: undefined;
  Map: undefined;
};

export type NavProps = {
  initialUser: string | null;
  onSignIn: (user: string) => void;
  onSignOut: () => void;
};

// Nav props and callback to Map page
export type MapPageProps = NativeStackScreenProps<RootStackParamList, "Map"> & {
  username: string; // Username passed from signup
  onSignOut: () => void; // Sign out handler
};

// Nav props and callback to SignUp page
export type SignUpPageProps = NativeStackScreenProps<RootStackParamList, "SignUp"> & {
  onSuccess: (user: string) => void;
};
