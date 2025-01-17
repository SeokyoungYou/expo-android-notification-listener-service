import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoAndroidNotificationListenerServiceViewProps } from './ExpoAndroidNotificationListenerService.types';

const NativeView: React.ComponentType<ExpoAndroidNotificationListenerServiceViewProps> =
  requireNativeView('ExpoAndroidNotificationListenerService');

export default function ExpoAndroidNotificationListenerServiceView(props: ExpoAndroidNotificationListenerServiceViewProps) {
  return <NativeView {...props} />;
}
