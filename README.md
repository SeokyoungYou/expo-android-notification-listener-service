# Expo Android NotificationListenerService

An [Expo module](https://docs.expo.dev/modules/overview/) library that allows Expo app to monitor and interact with notifications from other apps using [NotificationListenerService](https://developer.android.com/reference/android/service/notification/NotificationListenerService).

- Support only Android
- Compatible with Expo SDK 52 and above

## Installation

```bash
npm install expo-android-notification-listener-service
```

## Usage

```tsx
import { NotificationListenerService } from "expo-android-notification-listener-service";

NotificationListenerService.start();
```

## Start Project to contribute

1. Build the library

```bash
npx run build
```

2. Create a development environment to run the example in Android Studio.

```bash
cd example
npx expo run:android
```

3. Run the example in Android Studio.

Open expo-android-notification-listener-service/example/android in Android Studio.
