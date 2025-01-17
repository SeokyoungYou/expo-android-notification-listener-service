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
}

type EventsMap = {
  onNotificationReceived: (event: NotificationData) => void;
};

declare class ExpoAndroidNotificationListenerServiceModule extends EventEmitter<EventsMap> {
  isNotificationPermissionGranted(): boolean;
  openNotificationListenerSettings(): void;
}

export default requireNativeModule<ExpoAndroidNotificationListenerServiceModule>(
  "ExpoAndroidNotificationListenerService"
);
