import { requireNativeModule, EventEmitter } from "expo-modules-core";

export interface NotificationData {
  packageName: string;
  id: number;
  title: string | null;
  text: string | null;
  bigText: string | null;
  subText: string | null;
  summaryText: string | null;
  postTime: number;
  key: string;
  appName: string | null;
  appIconPath: string | null;
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
