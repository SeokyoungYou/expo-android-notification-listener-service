package expo.modules.androidnotificationlistenerservice

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.content.Intent
import android.provider.Settings
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.events.EventEmitter

class ExpoAndroidNotificationListenerServiceModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoAndroidNotificationListenerService")

    Events("onNotificationReceived")

    Function("getNotification") {
      "Hello world From Native! 👋"
    } 

    Function("isNotificationPermissionGranted") { context: android.content.Context ->
      val packageName = context.packageName
      val flat = Settings.Secure.getString(context.contentResolver, "enabled_notification_listeners")
      flat?.contains(packageName) ?: false
    }

    Function("openNotificationListenerSettings") { context: android.content.Context ->
      val intent = Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS)
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      context.startActivity(intent)
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
    sendEvent("onNotificationReceived", notification)
  }
}


