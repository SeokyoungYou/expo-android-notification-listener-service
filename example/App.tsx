import ExpoAndroidNotificationListenerService from "expo-android-notification-listener-service";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Alert,
  AppState,
} from "react-native";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  console.log(
    ExpoAndroidNotificationListenerService.isNotificationPermissionGranted()
  );

  // useEffect(() => {
  //   const checkPermission = async () => {
  //     try {
  //       const permission =
  //         ExpoAndroidNotificationListenerService.isNotificationPermissionGranted();
  //       setHasPermission(permission);

  //       if (!permission) {
  //         // 사용자에게 권한이 필요한 이유를 설명하는 Alert 표시
  //         Alert.alert(
  //           "Notification Permission Required",
  //           "This app requires notification access permission to function properly.",
  //           [
  //             {
  //               text: "Go to Settings",
  //               onPress: () =>
  //                 ExpoAndroidNotificationListenerService.openNotificationListenerSettings(),
  //             },
  //             {
  //               text: "Cancel",
  //               style: "cancel",
  //             },
  //           ]
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error checking permission:", error);
  //     }
  //   };

  //   checkPermission();

  //   // Check permission when app comes to foreground
  //   const subscription = AppState.addEventListener("change", (nextAppState) => {
  //     if (nextAppState === "active") {
  //       checkPermission();
  //     }
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>

        <Group name="Functions">
          <Text>
            {ExpoAndroidNotificationListenerService.isNotificationPermissionGranted()}
          </Text>
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  view: {
    flex: 1,
    height: 200,
  },
};
