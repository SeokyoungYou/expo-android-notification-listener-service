package expo.modules.androidnotificationlistenerservice

import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.app.Notification
import android.graphics.drawable.Drawable
import android.graphics.Bitmap
import android.graphics.Canvas
import java.io.File
import java.io.FileOutputStream

class ExpoNotificationListenerService : NotificationListenerService() {
    private var lastNotificationKey: String? = null
    private var lastNotificationTime: Long = 0

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        val moduleInstance = ExpoAndroidNotificationListenerServiceModule.getInstance() ?: return
        
        val packageManager = applicationContext.packageManager
        try {
            val applicationInfo = packageManager.getApplicationInfo(sbn.packageName, 0)
            
            val iconPath = try {
                val appIcon = applicationInfo.loadIcon(packageManager)
                if (appIcon != null) {
                    saveAppIconToStorage(appIcon, sbn.packageName)
                } else {
                    null
                }
            } catch (e: Exception) {
                e.printStackTrace()
                null
            }
            
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
                "title" to (extras.getCharSequence(Notification.EXTRA_TITLE)?.toString()),
                "text" to (extras.getCharSequence(Notification.EXTRA_TEXT)?.toString()),
                "bigText" to (extras.getCharSequence(Notification.EXTRA_BIG_TEXT)?.toString()),
                "subText" to (extras.getCharSequence(Notification.EXTRA_SUB_TEXT)?.toString()),
                "summaryText" to (extras.getCharSequence(Notification.EXTRA_SUMMARY_TEXT)?.toString()),
                "postTime" to sbn.postTime,
                "key" to sbn.key,
                "appName" to packageManager.getApplicationLabel(applicationInfo)?.toString(),
                "appIconPath" to iconPath
            )
            
            ExpoAndroidNotificationListenerServiceModule.getInstance()?.emitNotificationEvent(notificationData)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun saveAppIconToStorage(drawable: Drawable?, packageName: String): String? {
        if (drawable == null) return null
        
        try {
            // Create icons directory if it doesn't exist
            val iconsDir = File(applicationContext.filesDir, "icons").apply { 
                if (!exists()) mkdirs() 
            }
            
            // Generate a unique filename based on the package name
            val fileName = "app_icon_${packageName}.png"
            val file = File(iconsDir, fileName)
            
            // Return the path if the icon is already saved
            if (file.exists()) {
                return "file://${file.absolutePath}"
            }

            // Convert Drawable to a Bitmap of appropriate size
            val size = 256  // Icon size (256x256)
            val bitmap = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888)
            val canvas = Canvas(bitmap)
            drawable.setBounds(0, 0, size, size)
            drawable.draw(canvas)

            // Save to file
            FileOutputStream(file).use { out ->
                bitmap.compress(Bitmap.CompressFormat.PNG, 100, out)
            }
            
            return "file://${file.absolutePath}"
        } catch (e: Exception) {
            e.printStackTrace()
            return null
        }
    }

    // Function to update icon when app is updated
    private fun shouldUpdateIcon(packageName: String): Boolean {
        val iconFile = File(applicationContext.filesDir, "icons/app_icon_${packageName}.png")
        if (!iconFile.exists()) return true
        
        // Update icon if last modified time is more than a week ago
        val weekInMillis = 7 * 24 * 60 * 60 * 1000L
        return System.currentTimeMillis() - iconFile.lastModified() > weekInMillis
    }
}