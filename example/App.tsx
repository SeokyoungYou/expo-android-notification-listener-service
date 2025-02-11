import ExpoAndroidNotificationListenerService, {
  NotificationData,
} from "expo-android-notification-listener-service";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";

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
              <View style={styles.notificationHeader}>
                {notification.appIconPath && (
                  <Image
                    source={{ uri: `file://${notification.appIconPath}` }}
                    style={styles.appIcon}
                  />
                )}
                {notification.appName && (
                  <Text style={styles.notificationAppName}>
                    {notification.appName}
                  </Text>
                )}
              </View>

              {notification.title && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Title</Text>
                  <Text style={styles.notificationText}>
                    {notification.title}
                  </Text>
                </View>
              )}

              {notification.text && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Text</Text>
                  <Text style={styles.notificationText}>
                    {notification.text}
                  </Text>
                </View>
              )}

              {notification.bigText && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Big Text</Text>
                  <Text style={styles.notificationBigText}>
                    {notification.bigText}
                  </Text>
                </View>
              )}

              {notification.subText && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Sub Text</Text>
                  <Text style={styles.notificationText}>
                    {notification.subText}
                  </Text>
                </View>
              )}

              {notification.summaryText && (
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Summary Text</Text>
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
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
  appIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  notificationAppName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});
