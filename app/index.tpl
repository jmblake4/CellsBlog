<!doctype html>

<html lang="es">

<head>
  <meta charset="utf-8">
  <meta name="description" content="">
  <meta name="format-detection" content="telephone=no">
  <meta name="msapplication-tap-highlight" content="no">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title></title>
  <!-- Place favicon.ico in the `app/` directory -->

  <!-- Chrome for Android theme color -->
  <meta name="theme-color" content="#303F9F">

  <!-- Web Application Manifest -->
  <link rel="manifest" href="manifest.json">

  <!-- Tile color for Win8 -->
  <meta name="msapplication-TileColor" content="#3372DF">

  <!-- Add to homescreen for Chrome on Android -->
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="application-name" content="PSK">
  <link rel="icon" sizes="192x192" href="images/touch/chrome-touch-icon-192x192.png">

  <!-- Add to homescreen for Safari on iOS -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="Polymer Starter Kit">
  <link rel="apple-touch-icon" href="images/touch/apple-touch-icon.png">

  <!-- Tile icon for Win8 (144x144) -->
  <meta name="msapplication-TileImage" content="images/touch/ms-touch-icon-144x144-precomposed.png">

  <!-- build:css styles/main.css -->
  <link rel="stylesheet" href="styles/main.css">
  <!-- endbuild-->

</head>

<body class="fullbleed layout vertical loading">
  <div id="splash"><div>Loading...</div></div>
  <cells-core app-name="" config-file="config/configFile.json"></cells-core>
  
  <!-- Uncomment next block to enable Service Worker support -->
  <!--
  <platinum-sw-register auto-register
                      clients-claim
                      skip-waiting>

    <platinum-sw-cache default-cache-strategy="fastest"
                      cache-config-file="precache.json">
    </platinum-sw-cache>
    
  </platinum-sw-register>
    
  --> 
    
  <!-- build:js scripts/app-dist.js -->
  <script src="scripts/app.js" async></script>
  <!-- endbuild-->

</body>


</html>
