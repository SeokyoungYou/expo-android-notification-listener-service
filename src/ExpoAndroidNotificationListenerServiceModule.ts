import { requireNativeModule } from "expo-modules-core";

declare class ExpoAndroidNotificationListenerServiceModule {
  getNotification(): string;
}

// This call loads the native module object from the JSI.

// It loads the native module object from the JSI or falls back to
// the bridge module (from NativeModulesProxy) if the remote debugger is on.
export default requireNativeModule<ExpoAndroidNotificationListenerServiceModule>(
  "ExpoAndroidNotificationListenerService"
);
