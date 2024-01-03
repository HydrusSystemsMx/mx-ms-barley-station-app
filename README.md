# mx-ms-barley-station-app
# Agregar en config.xml para debugear:
    dentro de platform...
    <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application" xmlns:android="http://schemas.android.com/apk/res/android">
        <application android:usesCleartextTraffic="true" />
        <application android:networkSecurityConfig="@xml/network_security_config" />
    </edit-config>
# filtro de busqueda en index.html