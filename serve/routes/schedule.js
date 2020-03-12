const schedule = require("node-schedule");
const { Base64 } = require("./secret");
const { setMail, getHtml } = require("./mail");
const { logInfo } = require("./logs");

let cache = {};

/* exec schedule */
exports.execSchedule = () => {
  schedule.scheduleJob("1 1 22 * * *", () => {
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
  logInfo(_data);
};
