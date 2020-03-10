const Base64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode: function(e) {
    let t = "";
    let n, r, i, s, o, u, a;
    let f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = ((n & 3) << 4) | (r >> 4);
      u = ((r & 15) << 2) | (i >> 6);
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64;
      } else if (isNaN(i)) {
        a = 64;
      }
      t =
        t +
        this._keyStr.charAt(s) +
        this._keyStr.charAt(o) +
        this._keyStr.charAt(u) +
        this._keyStr.charAt(a);
    }
    return t;
  },
  _utf8_encode: function(e) {
    e = e.replace(/rn/g, "n");
    let t = "";
    for (let n = 0; n < e.length; n++) {
      let r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode((r >> 6) | 192);
        t += String.fromCharCode((r & 63) | 128);
      } else {
        t += String.fromCharCode((r >> 12) | 224);
        t += String.fromCharCode(((r >> 6) & 63) | 128);
        t += String.fromCharCode((r & 63) | 128);
      }
    }
    return t;
  }
};

$(document).ready(function() {
  const API = "http://gjhome.ivday.fun";
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

      const formData = {
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
      };
      const encodedString = Base64.encode(JSON.stringify(formData));
      send({ data: encodedString });
    }
  });

  function send(data) {
    $.ajax({
      url: API,
      type: "POST",
      data
    });
  }
});
