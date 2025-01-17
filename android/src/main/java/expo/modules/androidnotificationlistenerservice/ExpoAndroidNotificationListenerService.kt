package expo.modules.androidnotificationlistenerservice

import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.app.Notification

class ExpoNotificationListenerService : NotificationListenerService() {
    private var lastNotificationKey: String? = null
    private var lastNotificationTime: Long = 0

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        val moduleInstance = ExpoAndroidNotificationListenerServiceModule.getInstance() ?: return
        
    
        if (!moduleInstance.isPackageAllowed(sbn.packageName)) {
            return
        }

        // Delete duplicate notification
        val currentTime = System.currentTimeMillis()
        if (sbn.key == lastNotificationKey && currentTime - lastNotificationTime < 500) {
            return
        }
        
        lastNotificationKey = sbn.key
        lastNotificationTime = currentTime

        val notification = sbn.notification
        val extras = notification.extras

        val notificationData = mapOf(
            "packageName" to sbn.packageName,
            "id" to sbn.id,
            "title" to (extras.getCharSequence(Notification.EXTRA_TITLE)?.toString() ?: ""),
            "text" to (extras.getCharSequence(Notification.EXTRA_TEXT)?.toString() ?: ""),
            "bigText" to (extras.getCharSequence(Notification.EXTRA_BIG_TEXT)?.toString() ?: ""),
            "subText" to (extras.getCharSequence(Notification.EXTRA_SUB_TEXT)?.toString() ?: ""),
            "summaryText" to (extras.getCharSequence(Notification.EXTRA_SUMMARY_TEXT)?.toString() ?: ""),
            "postTime" to sbn.postTime,
            "key" to sbn.key
        )

        ExpoAndroidNotificationListenerServiceModule.getInstance()?.emitNotificationEvent(notificationData)
    }
}