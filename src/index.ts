// Reexport the native module. On web, it will be resolved to ExpoAndroidNotificationListenerServiceModule.web.ts
// and on native platforms to ExpoAndroidNotificationListenerServiceModule.ts
export { default } from "./ExpoAndroidNotificationListenerServiceModule";

export type { NotificationData } from "./ExpoAndroidNotificationListenerServiceModule";
