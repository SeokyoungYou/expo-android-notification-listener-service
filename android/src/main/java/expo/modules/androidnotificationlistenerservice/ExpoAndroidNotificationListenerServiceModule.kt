package expo.modules.androidnotificationlistenerservice

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

class ExpoAndroidNotificationListenerServiceModule : Module() {
  override fun definition() = ModuleDefinition {

    Name("ExpoAndroidNotificationListenerService")
    Function("getNotification") {
      "Hello world! 👋"
    } 
  }
}
