import { Alert } from "react-native";

export const infoAlert = (title: string, message: string, buttons?: any[]) => {
  Alert.alert(title, message, buttons);
};

export default infoAlert;