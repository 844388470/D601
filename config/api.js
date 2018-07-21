let env = "dev";
const config = {
  dev: "https://api.rinlink.com",
  zs:'http://restapi.amap.com/v3/geocode/regeo'
};
const api = config[env];

export default {
  // 获取坐标
  getLoginCode: `${api}/api/users/loginmini`,                   //获取token
  getUserInfo: `${api}/api/users/${wx.getStorageSync('id')}`,   //获取更新用户数据
  getCoor: `${api}/api/devices`,       //获取用户设备列表
  getIndex: api + 'onenet/livedata/getData',                    //获取设备当前位置
  getHistory: api + 'onenet/livedata/getDataposition'           //获取轨迹
}
