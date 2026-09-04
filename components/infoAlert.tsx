import { Alert } from "react-native";

export const infoAlert = (title: string, message: string) => {
  Alert.alert(title, message);
};

export default infoAlert;