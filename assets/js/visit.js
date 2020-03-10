$(document).ready(function() {
  const {
    userAgent,
    appCodeName,
    appName,
    appVersion,
    buildID,
    cookieEnabled,
    doNotTrack,
    hardwareConcurrency,
    language,
    maxTouchPoints,
    onLine,
    oscpu,
    platform,
    product,
    productSub,
    vendor,
    vendorSub,
    webdriver
  } = navigator;
  //获取城市ajax
  $.ajax({
    url:
      "http://api.map.baidu.com/location/ip?ak=RD3fQS8GA1UeR4Ig10ejdEkTg1OfwuV3",
    type: "POST",
    dataType: "jsonp",
    success: function(data) {
      const { x, y } = data.content.point;
      var lngLat = new BMap.MercatorProjection().pointToLngLat(
        new BMap.Pixel(x, y)
      );
      send({
        navigator: {
          userAgent,
          appCodeName,
          appName,
          appVersion,
          buildID,
          cookieEnabled,
          doNotTrack,
          hardwareConcurrency,
          language,
          maxTouchPoints,
          onLine,
          oscpu,
          platform,
          product,
          productSub,
          vendor,
          vendorSub,
          webdriver
        },
        lngLat,
        data
      });
    }
  });

  function send(data) {
    $.ajax({
      url: "http://47.103.75.3:12345",
      type: "POST",
      data
    });
  }
});
