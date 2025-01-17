import { registerWebModule, NativeModule } from 'expo';

import { ExpoAndroidNotificationListenerServiceModuleEvents } from './ExpoAndroidNotificationListenerService.types';

class ExpoAndroidNotificationListenerServiceModule extends NativeModule<ExpoAndroidNotificationListenerServiceModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoAndroidNotificationListenerServiceModule);
