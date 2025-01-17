import { requireNativeModule } from "expo-modules-core";

export interface NotificationData {
  packageName: string;
  title: string;
  text: string;
  postTime: number;
  key: string;
}

declare class ExpoAndroidNotificationListenerServiceModule {
  isNotificationPermissionGranted(): boolean;
  openNotificationListenerSettings(): void;
}

export default requireNativeModule<ExpoAndroidNotificationListenerServiceModule>(
  "ExpoAndroidNotificationListenerService"
);
