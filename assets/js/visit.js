
$(document).ready(function () {

    console.log(navigator.userAgent, 'navigator.userAgent')
    document.write("userAgent: " + navigator.userAgent + "<br><br>");

    document.write("appName: " + navigator.appName + "<br><br>");

    document.write("appCodeName: " + navigator.appCodeName + "<br><br>");

    document.write("appVersion: " + navigator.appVersion + "<br><br>");

    document.write("appMinorVersion: " + navigator.appMinorVersion + "<br><br>");

    document.write("platform: " + navigator.platform + "<br><br>");

    document.write("cookieEnabled: " + navigator.cookieEnabled + "<br><br>");

    document.write("onLine: " + navigator.onLine + "<br><br>");

    document.write("userLanguage: " + navigator.language + "<br><br>");

    console.log(navigator, 'navigator')

    document.write("plugins.description: " + navigator + '' + "<br><br>");
    
    document.write("plugins.description: " + navigator.plugins + "<br><br>");
    
    document.write("mimeTypes: " + navigator.mimeTypes + "<br><br>");



})