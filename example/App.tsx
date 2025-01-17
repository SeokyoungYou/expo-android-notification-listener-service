import ExpoAndroidNotificationListenerService, {
  NotificationData,
} from "expo-android-notification-listener-service";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";

import { useCheckNotificationPermission } from "./useChecknotificationPermission";

const ALLOWED_PACKAGES = [
  "com.kakao.talk",
  "com.google.android.apps.messaging",
  "com.mand.notitest",
];

export default function App() {
  const { hasPermission } = useCheckNotificationPermission();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    ExpoAndroidNotificationListenerService.setAllowedPackages(ALLOWED_PACKAGES);

    const subscription = ExpoAndroidNotificationListenerService.addListener(
      "onNotificationReceived",
      (event: NotificationData) => {
        console.log("onNotificationReceived", event);
        setNotifications((prev) => [...prev, event]);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>

        <Group name="Notification Permission">
          <Text>hasPermission: {String(hasPermission)}</Text>
        </Group>

        <Group name="Notifications">
          {notifications.map((notification, index) => (
            <View key={index} style={styles.notification}>
              <Text>Package: {notification.packageName}</Text>
              <Text>Title: {notification.title}</Text>
              <Text>Text: {notification.text}</Text>
              <Text>
                Time: {new Date(notification.postTime).toLocaleString()}
              </Text>
            </View>
          ))}
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

const styles = StyleSheet.create({
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
  notification: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
