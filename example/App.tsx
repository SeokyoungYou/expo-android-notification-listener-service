import ExpoAndroidNotificationListenerService, {
  NotificationData,
} from "expo-android-notification-listener-service";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";

import { useCheckNotificationPermission } from "./useChecknotificationPermission";

const ALLOWED_PACKAGES = ["com.mand.notitest"];

export default function App() {
  const { hasPermission } = useCheckNotificationPermission();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    ExpoAndroidNotificationListenerService.setAllowedPackages(ALLOWED_PACKAGES);

    const subscription = ExpoAndroidNotificationListenerService.addListener(
      "onNotificationReceived",
      (event: NotificationData) => {
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

        <Group name="How to test">
          <Text>
            1. Install "Notification Test" app from Play Store on your emulator
            {"\n"}
            2. Open the app and send test notifications{"\n"}
            3. Notifications will appear here when received
          </Text>
        </Group>

        <Group name="Notifications">
          {notifications.map((notification, index) => (
            <View key={index} style={styles.notification}>
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>title</Text>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>text</Text>
                <Text style={styles.notificationText}>{notification.text}</Text>
              </View>

              {notification.bigText && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>bigText</Text>
                  <Text style={styles.notificationBigText}>
                    {notification.bigText}
                  </Text>
                </View>
              )}

              {notification.subText && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>subText</Text>
                  <Text style={styles.notificationText}>
                    {notification.subText}
                  </Text>
                </View>
              )}

              {notification.summaryText && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>summaryText</Text>
                  <Text style={styles.notificationText}>
                    {notification.summaryText}
                  </Text>
                </View>
              )}

              <View style={styles.notificationMeta}>
                <Text style={styles.notificationMetaText}>
                  {new Date(notification.postTime).toLocaleString()}
                </Text>
                <Text style={styles.notificationMetaText}>
                  {notification.packageName}
                </Text>
              </View>
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
    padding: 15,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },
  notificationBigText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  notificationMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  notificationMetaText: {
    fontSize: 12,
    color: "#888",
  },
  fieldContainer: {
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 11,
    color: "#666",
    textTransform: "uppercase",
    marginBottom: 2,
  },
});
