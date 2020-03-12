const schedule = require("node-schedule");
const { Base64 } = require("./secret");
const fs = require("fs");
const { setMail, getHtml } = require("./mail");

let cache = {};

/* exec schedule */
exports.execSchedule = () => {
  schedule.scheduleJob("1 1 * * * *", () => {
    launchMail();
  });
};

/**
 * schedule mail
 */
async function launchMail() {
  let htmlList = "";
  for (const key in cache) {
    if (cache.hasOwnProperty(key)) {
      const item = cache[key];
      for (const label in item) {
        if (item.hasOwnProperty(label)) {
          const content = item[label];
          htmlList += getHtml(label, content);
        }
      }
    }
  }
  if (htmlList) await setMail(htmlList);
  cache = {};
}

/**
 * data format
 * @param {*} reqBody
 * @returns {Object}
 */
function fmtData(reqBody) {
  const decodeStr = Base64.decode(reqBody);
  const { navigator, lngLat, data } = JSON.parse(decodeStr);
  const {
    userAgent, //由客户机发送服务器的 user-agent 头部的值
    appName, //浏览器的名称
    appVersion, //浏览器的平台和版本信息
    hardwareConcurrency, //cpu核心数
    platform //运行浏览器的操作系统平台
  } = navigator;
  const { lat, lng } = lngLat;
  const { address, content } = data;
  const { address: _address, address_detail } = content;
  const { province, city, district, street } = address_detail;
  return {
    userAgent,
    appName,
    appVersion,
    hardwareConcurrency,
    platform,
    lat,
    lng,
    address,
    _address,
    province,
    city,
    district,
    street
  };
}

/**
 * date format
 * @returns
 */
function getDateObj() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const ymd = `${year}-${month}-${day}`;
  return {
    full: `${ymd} ${hour}:${minute}:${second}`,
    ymd
  };
}

/**
 * log
 * @param {Object} log
 */
function logs(log) {
  const _now = getDateObj().full;
  const log_file = getDateObj().ymd + "-log";
  const _strJson = `${_now} >> ${JSON.stringify(log)}\n`;
  fs.appendFile(`./logs/${log_file}`, _strJson, err => {
    if (!err) console.log(">> :: insert logs ::");
  });
}

/**
 * add cache
 * @param {Object} data
 */
exports.addCache = async data => {
  const _data = fmtData(data);
  const { platform, lat, lng } = _data;
  const _id = `${platform}_${lat}_${lng}`;
  const exist = cache[_id];
  if (exist) {
    const { count } = exist;
    cache[_id] = { ...exist, count: count + 1 };
  } else {
    cache[_id] = { ..._data, count: 1 };
  }
  logs(_data);

  launchMail();
};
