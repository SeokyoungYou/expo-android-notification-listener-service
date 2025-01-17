import * as React from 'react';

import { ExpoAndroidNotificationListenerServiceViewProps } from './ExpoAndroidNotificationListenerService.types';

export default function ExpoAndroidNotificationListenerServiceView(props: ExpoAndroidNotificationListenerServiceViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
