
const api = 'https://api.cmpyun.com';

export default {
  // 获取坐标zszs
    api,
    getOpenId: `${api}/api/serviceAccept/wxSessionKey`,            //获取openid
    getUserInfo: `${api}/api/serviceAccept/queryWxUserInfo`,       //获取用户详情
    setUserInfo: `${api}/api/serviceAccept/updateWxUser`,          //设置用户详情
    getPhoneCode: `${api}/api/business/sendVerificationCode`,      //获取手机验证码
    getRegister: `${api}/api/serviceAccept/registerWxUser`,        //注册用户
    addEqu: `${api}/api/serviceAccept/bindWxDevice`,               //设备绑定用户
    deleteEqu: `${api}/api/serviceAccept/unBindDevice`,               //用户解除绑定
    getEquList: `${api}/api/serviceAccept/findWxDeviceList`,       //获取用户设备列表
    getEquInfo: `${api}/api/deviceSet/findSingleDeviceInfo`,       //获取设备详情
    editEquInfo: `${api}/api/serviceAccept/updateDeviceInfo`,       //修改设备详情
    getEquSerect: `${api}/api/deviceSet/findDeviceSetDetail`,      //获取绑定秘钥
    getHistory: `${api}/api/serviceAccept/findWxDeviceTimeLocation`,      //获取轨迹
    getIndex: `${api}/api/serviceAccept/findWxDeviceLocation`,      //获取位置
    getEquVol: `${api}/api/deviceSet/findDeviceRealTimeInfo`,      //获取设备即时消息
    getMessage: `${api}/api/serviceAccept/findWxDeviceTimeLocation`,      //获取消息
    getFence: `${api}/api/serviceAccept/queryWxFence`,      //获取围栏
    addFence: `${api}/api/serviceAccept/saveWxFence`,       //新建围栏
    editFence: `${api}/api/serviceAccept/updateWxFence`,    //修改围栏
    deleteFence: `${api}/api/serviceAccept/deleteWxFence`,  //删除围栏
    isRegister: `${api}/api/serviceAccept/queryIDcardIsRegister`,      //验证身份证
    
}
