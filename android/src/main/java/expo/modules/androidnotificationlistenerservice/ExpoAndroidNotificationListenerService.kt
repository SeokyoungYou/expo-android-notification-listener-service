package expo.modules.androidnotificationlistenerservice

import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification

class ExpoNotificationListenerService : NotificationListenerService() {
    override fun onNotificationPosted(sbn: StatusBarNotification) {
        val notification = sbn.notification
        val extras = notification.extras
        
        val notificationData = mapOf(
            "packageName" to sbn.packageName,
            "title" to (extras.getString("android.title") ?: ""),
            "text" to (extras.getString("android.text") ?: ""),
            "postTime" to sbn.postTime,
            "key" to sbn.key
        )

        ExpoAndroidNotificationListenerServiceModule.getInstance()?.emitNotificationEvent(notificationData)
    }
}