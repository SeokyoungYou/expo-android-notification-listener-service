import { NativeModule, requireNativeModule } from 'expo';

import { ExpoAndroidNotificationListenerServiceModuleEvents } from './ExpoAndroidNotificationListenerService.types';

declare class ExpoAndroidNotificationListenerServiceModule extends NativeModule<ExpoAndroidNotificationListenerServiceModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoAndroidNotificationListenerServiceModule>('ExpoAndroidNotificationListenerService');
