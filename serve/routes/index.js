const router = require("koa-router")();
const nodemailer = require("nodemailer");

async function setMail(html) {
  let mailTransport = nodemailer.createTransport({
    host: "smtp.163.com",
    auth: {
      user: "gongjie0422@163.com",
      pass: "gongjie0422"
    }
  });
  let options = {
    from: ' "gongjie0422',
    to: "514979324@qq.com",
    bcc: "密送",
    subject: "Gj Home",
    html
  };
  mailTransport.sendMail(options, function(err, msg) {
    console.log(msg, "msg");
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
}

function getHtml(label, content) {
  const con = `<div style="margin: 5px;color: #666;"><span>${label}:: == >>${content}</span></div>`;
  return con;
}

router.post("/", async (ctx, next) => {
  const { navigator, lngLat, data } = ctx.request.body;

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
  await setMail(htmlList)

  ctx.status = 200;
  await next();
});

module.exports = router;
