# Expo Android NotificationListenerService
![Jan-21-2025 00-44-56](https://github.com/user-attachments/assets/fcbfac3c-01a2-4777-abcc-b4d1de24aab5)

![npm](https://img.shields.io/npm/v/expo-android-notification-listener-service)
![License](https://img.shields.io/npm/l/expo-android-notification-listener-service)
![npm](https://img.shields.io/npm/dm/expo-android-notification-listener-service)
![Expo SDK](https://img.shields.io/badge/Expo%20SDK-52%2B-blue)
![Android](https://img.shields.io/badge/Platform-Android-green)

An [Expo module](https://docs.expo.dev/modules/overview/) library that allows Expo app to monitor and interact with notifications from other apps using [NotificationListenerService](https://developer.android.com/reference/android/service/notification/NotificationListenerService).

- Support only Android
- Compatible with Expo SDK 52 and above
- Type-safed NotificationData

## Installation

```bash
npm install expo-android-notification-listener-service
```

## Usage

```tsx
import ExpoAndroidNotificationListenerService, {
  NotificationData,
} from "expo-android-notification-listener-service";

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
```

Refer to the [example](./example/App.tsx) for more details.

## Start Project in local

1. Terminal 1: Build the library

```bash
npx run build
```

2. Terminal 2: Run the example in Android Studio.

Development build app will run in emulator.

```bash
cd example
npx expo run:android
```

3. Run the example in Android Studio.

Open expo-android-notification-listener-service/example/android in Android Studio.
