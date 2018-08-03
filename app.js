//app.js
import util from './utils/util.js'
import api from './config/api.js'
import request from './utils/request.js'
import filterCooName from './utils/mapApi.js'
App({
  onLaunch: function (options) {
    // wx.checkSession({
    //   success: () => {
    //     const openid = wx.getStorageSync('openid');
    //     if (openid) {
    //       wx.reLaunch({
    //         url: `../../login/signIn/signIn`
    //       })
    //     } else {
    //       this.getLoginCode();
    //     }
    //   },
    //   fail: () => {
    //     this.getLoginCode(); //重新登录
    //   }
    // })
  },
  getLoginCode: function () {
    // wx.login({
    //   success: res => {
    //     request({ 
    //       url: `${api.getLoginCode}`,
    //       data: { code: res.code },
    //       method:'post'  
    //     }).then(data=>{
    //       wx.setStorageSync('id', data.id);
    //       wx.setStorageSync('openid', data.openid);
    //       wx.setStorageSync('token', data.token);
    //       wx.reLaunch({
    //         url: `../../login/signIn/signIn`
    //       })
    //     })
    //   }
    // })
  },


  onShow: function (options) {
    console.log('show')
  },

  onHide: function () {
    console.log('hide')
  },

  onError: function (msg) {
    console.log(msg)
  },

  show(msg){
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },

  showLoading(msg){
    wx.showLoading({
      title: `${msg}...`,
      mask: true
    })
  },

  hideLoading() {
    wx.hideLoading()
  },

  refapi:function(){
    this.api=api()
  },
  api:api(),
  mapApi: filterCooName,
  util:util,
  request: request,
  nowCodeId:'',                   //选中设备id
  nowCodeList: [],                //设备列表
  positionModeId: '1',            //当前定位模式
  bindSettingId:'1',              //当前绑定设置
  equIndex:'',                    //进入设置设备的顺序号
  aroundList: [],                 
  aroundAddObj:{                  
    state:'add',
    name:'',
    longitude:'',
    latitude:'',
    radius:''
  },
  globalData: {
    userInfo:{}
  },
  nav: '"pagePath": "pages/message/message",        "text": "消息",  "iconPath": "image/message.png",  "selectedIconPath": image/message-select.png"'
})