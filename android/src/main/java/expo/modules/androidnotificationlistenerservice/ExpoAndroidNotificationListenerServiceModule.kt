package expo.modules.androidnotificationlistenerservice

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification

class ExpoAndroidNotificationListenerServiceModule : Module() {
  override fun definition() = ModuleDefinition {

    Name("ExpoAndroidNotificationListenerService")
    Function("getNotification") {
      "Hello world From Native! 👋"
    } 
  }
}


class ExpoNotificationListenerService : NotificationListenerService() {
  override fun onNotificationPosted(sbn: StatusBarNotification) {
      // 새 알림이 왔을 때 처리
  }

  override fun onNotificationRemoved(sbn: StatusBarNotification) {
      // 알림이 제거됐을 때 처리
  }
}