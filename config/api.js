let env = "dev";
const config = {
  dev: "https://api.rinlink.com",
  zs:'http://restapi.amap.com/v3/geocode/regeo'
};
const api = config[env];

export default function(){
  // 获取坐标
  return {
    nnn: wx.getStorageSync('ccc'),
    getEquList: `${api}/api/users/${wx.getStorageSync('id')}/devices`,       //获取设备列表
    getUserDetails: `${api}/api/users/${wx.getStorageSync('id')}`,           //获取(修改)用户信息
    addCoor: `${api}/api/devices/bind`,                                      //添加设备
    getLoginCode: `${api}/api/users/loginmini`,                              //获取token
    setEqu: `${api}/api/devices/`,                                           //获取(修改)设备信息 (需+ 设备id)
    setUserDevices: `${api}/api/users/${wx.getStorageSync('id')}/devices/`,  //解除用户与设备绑定 (需+ 设备id)
    getIndex: `${api}/api/devices/`,                                         //获取设备最新的数据 实际加上+ 设备id/latest


    getUserInfo: `${api}/api/users/`,   //获取更新用户数据
    getCoor: `${api}/api/users/${wx.getStorageSync('id')}/devices`,//获取用户设备列表(展示用)
    getHistory: `${api}/api/devices/`    //获取轨迹  实际加上+ 设备id/position
  }
}
