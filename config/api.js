import env from '../config.js'
const config = {
  dev: "https://tapi.rinlink.com",
  zs:'https://api.rinlink.com'
};
const api = config[env];

export default function(){
  // 获取坐标zszs
  return {
    api,
    getEquList: `${api}/api/users/${wx.getStorageSync('id')}/devices`,       //获取设备列表
    getUserDetails: `${api}/api/users/${wx.getStorageSync('id')}`,           //获取(修改)用户信息
    addCoor: `${api}/api/devices/bind`,                                      //添加设备
    getLoginCode: `${api}/api/users/loginmini`,                              //获取token
    setEqu: `${api}/api/devices/`,                                           //获取(修改)设备信息 (需+ 设备id)   (按设备查用户+设备id+/users)
    setUserDevices: `${api}/api/users/${wx.getStorageSync('id')}/devices/`,  //解除用户与设备绑定 (需+ 设备id)
    adminDeleteUser: `${api}/api/users/`,                                    //管理员解除用户与设备绑定 (需+ 用户id+/devices+设备id)
    getIndex: `${api}/api/devices/`,            //获取设备最新的数据 实际加上+ 设备id/latest  + 获取围栏+设备id/fe 获取设备的绑定请求+设备id/requests
    getBindRecord: `${api}/api/users/${wx.getStorageSync('id')}/requests`,   //获取用户绑定记录列表           
    deleteBind: `${api}/api/requests/`,                                      //删除用户绑定记录的某一条（+记录id）  修改绑定设备的状态（+请求记录的id）
    getMessageList: `${api}/api/devices/`,                                   //获取消息列表       (+ 设备id+/messages)
    getHistory: `${api}/api/devices/`,    //获取轨迹  实际加上+ 设备id/positions
    
    getUserInfo: `${api}/api/users/`,   //获取更新用户数据
    getCoor: `${api}/api/users/${wx.getStorageSync('id')}/devices`,//获取用户设备列表(展示用)
  }
}
