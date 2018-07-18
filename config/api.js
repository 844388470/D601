let env = "dev";
const config = {
  dev: "https://api.rinlink.com/",
  zs:'http://restapi.amap.com/v3/geocode/regeo'
};
const api = config[env];

export default {
  // 获取坐标
  getCoor: api + 'api/v1/devices',
  getIndex: api + 'onenet/livedata/getData',
  getHistory: api + 'onenet/livedata/getDataposition'
}
