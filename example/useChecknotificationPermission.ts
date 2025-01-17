import ExpoAndroidNotificationListenerService from "expo-android-notification-listener-service";
import { useEffect, useState } from "react";
import { Alert, AppState } from "react-native";

export const useCheckNotificationPermission = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const permission =
          ExpoAndroidNotificationListenerService.isNotificationPermissionGranted();
        setHasPermission(permission);

        if (!permission) {
          Alert.alert(
            "Notification Permission Required",
            "This app requires notification access permission to function properly.",
            [
              {
                text: "Go to Settings",
                onPress: () =>
                  ExpoAndroidNotificationListenerService.openNotificationListenerSettings(),
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ]
          );
        }
      } catch (error) {
        console.error("Error checking permission:", error);
      }
    };

    checkPermission();

    // Check permission when app comes to foreground
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        checkPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return { hasPermission };
};
