const router = require("koa-router")();
const { setMail, getHtml } = require("./mail");
const { Base64 } = require("./secret");

router.post("/", async (ctx, next) => {
  const { data: reqBody } = ctx.request.body;
  const decodeStr = Base64.decode(reqBody);
  const { navigator, lngLat, data } = JSON.parse(decodeStr);

  let htmlList = "";
  for (const key in navigator) {
    if (navigator.hasOwnProperty(key)) {
      const text = navigator[key];
      htmlList += getHtml(key, text);
    }
  }

  const { lat, lng } = lngLat;
  htmlList += getHtml("lat", lat);
  htmlList += getHtml("lng", lng);

  const { address, content } = data;
  htmlList += getHtml("address", address);

  const { address: _address, address_detail } = content;
  htmlList += getHtml("address.content", _address);

  for (const key in address_detail) {
    if (address_detail.hasOwnProperty(key)) {
      const detail = address_detail[key];
      htmlList += getHtml(key, detail);
    }
  }
  await setMail(htmlList);

  ctx.status = 200;
  await next();
});

module.exports = router;
