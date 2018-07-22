let env = "dev";
const config = {
  dev: "https://api.rinlink.com",
  zs:'http://restapi.amap.com/v3/geocode/regeo'
};
const api = config[env];

export default {
  // 获取坐标
  getLoginCode: `${api}/api/users/loginmini`,                   //获取token
  getUserInfo: `${api}/api/users/`,   //获取更新用户数据
  getCoor: `${api}/api/users/${wx.getStorageSync('id')}/devices`,//获取用户设备列表(展示用)
  addCoor: `${api}/api/devices/bind`,       //添加设备
  getIndex: `${api}/api/devices/`,      //获取设备最新的数据 实际加上+ 设备id/latest
  getHistory: `${api}/api/devices/`    //获取轨迹  实际加上+ 设备id/position
}
