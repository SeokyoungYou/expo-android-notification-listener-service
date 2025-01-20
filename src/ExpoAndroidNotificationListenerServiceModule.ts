import { requireNativeModule, EventEmitter } from "expo-modules-core";

export interface NotificationData {
  packageName: string;
  id: number;
  title: string;
  text: string;
  bigText: string;
  subText: string;
  summaryText: string;
  postTime: number;
  key: string;
  appName: string;
  appIconPath: string;
}

type EventsMap = {
  onNotificationReceived: (event: NotificationData) => void;
};

declare class ExpoAndroidNotificationListenerServiceModule extends EventEmitter<EventsMap> {
  isNotificationPermissionGranted(): boolean;
  openNotificationListenerSettings(): void;
  setAllowedPackages(packages: string[]): void;
}

export default requireNativeModule<ExpoAndroidNotificationListenerServiceModule>(
  "ExpoAndroidNotificationListenerService"
);
