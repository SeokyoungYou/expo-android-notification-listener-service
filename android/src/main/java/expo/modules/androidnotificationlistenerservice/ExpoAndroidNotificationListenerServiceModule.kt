package expo.modules.androidnotificationlistenerservice

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.content.Intent
import android.provider.Settings
import expo.modules.kotlin.Promise
import android.os.Handler
import android.os.Looper
import java.util.concurrent.atomic.AtomicBoolean

class ExpoAndroidNotificationListenerServiceModule : Module() {
    private val mainHandler = Handler(Looper.getMainLooper())
    private val isReady = AtomicBoolean(false)
    private val pendingNotifications = mutableListOf<Map<String, Any>>()
    
    override fun definition() = ModuleDefinition {
        Name("ExpoAndroidNotificationListenerService")

        Events("onNotificationReceived")

        OnCreate {
            isReady.set(true)
            synchronized(pendingNotifications) {
                pendingNotifications.forEach { notification ->
                    sendEvent("onNotificationReceived", notification)
                }
                pendingNotifications.clear()
            }
        }

        OnDestroy {
            isReady.set(false)
        }

        Function("testMessage") {
            "Hello world From Android! 👋"
        } 

        Function("isNotificationPermissionGranted") {
            val context = appContext.reactContext ?: return@Function false
            val packageName = context.packageName
            val flat = Settings.Secure.getString(context.contentResolver, "enabled_notification_listeners")
            flat?.contains(packageName) ?: false
        }

        Function("openNotificationListenerSettings") {
            val context = appContext.reactContext ?: return@Function Unit
            val intent = Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS)
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(intent)
            Unit
        }
    }

    companion object {
        private var moduleInstance: ExpoAndroidNotificationListenerServiceModule? = null
        
        fun getInstance(): ExpoAndroidNotificationListenerServiceModule? {
            return moduleInstance
        }
    }

    init {
        moduleInstance = this
    }

    fun emitNotificationEvent(notification: Map<String, Any>) {
        mainHandler.post {
            try {
                if (isReady.get()) {
                    sendEvent("onNotificationReceived", notification)
                } else {
                    synchronized(pendingNotifications) {
                        pendingNotifications.add(notification)
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}


