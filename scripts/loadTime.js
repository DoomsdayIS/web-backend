window.onload = function () {
    var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;
    document.getElementById("loadTime").innerHTML = ('Page load time is '+ loadTime + 'ms');
}