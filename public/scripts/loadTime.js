window.onload = function () {
  var loadTime =
    window.performance.timing.domContentLoadedEventEnd -
    window.performance.timing.navigationStart;
  document.getElementById('loadTime').innerHTML =
    'Total load time: ' + loadTime + ' ms (client)';
};
