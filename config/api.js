let env = "dev";
const config = {
  dev: "https://api.rinlink.com/onenet",
  zs:'http://restapi.amap.com/v3/geocode/regeo'
};
const api = config[env];

export default {
  // 获取坐标
  getCoor: api + '/device/getDevices',
  getIndex: api + '/livedata/getData',
}
