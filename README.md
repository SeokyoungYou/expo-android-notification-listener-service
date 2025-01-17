# Expo Android NotificationListenerService

<img width="1192" alt="image" src="https://github.com/user-attachments/assets/da45f890-fac7-44ef-91b5-54d62e556110" />


An [Expo module](https://docs.expo.dev/modules/overview/) library that allows Expo app to monitor and interact with notifications from other apps using [NotificationListenerService](https://developer.android.com/reference/android/service/notification/NotificationListenerService).

- Support only Android
- Compatible with Expo SDK 52 and above

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
