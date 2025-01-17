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
  testMessage(): string;
}

export default requireNativeModule<ExpoAndroidNotificationListenerServiceModule>(
  "ExpoAndroidNotificationListenerService"
);
