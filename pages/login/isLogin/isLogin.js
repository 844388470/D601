// pages/login/isLogin/isLogin.js
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRetry:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isLogin()
  },

  isLogin(){
    app.showLoading('验证中')
    wx.checkSession({
      success: () => {
        wx.hideLoading()
        const openid = wx.getStorageSync('openid');
        if (openid) {
          this.setInitial()
        } else {
          wx.reLaunch({
            url: `../signIn/signIn`
          })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.reLaunch({
          url: `../signIn/signIn`
        })
      }
    })
  },

  setInitial(){
    Promise.all([this.getList(), this.getUserInfo()]).then((arr) =>{
      wx.hideLoading()
      app.globalData.userInfo = arr[1];
      if (arr[0].length){
        app.nowCodeList = arr[0]
        app.nowCodeId = arr[0][0].id
        wx.reLaunch({
          url: '../../index/index'
        })
      }else{
        wx.reLaunch({
          url: '../../equipment/addEqu/addEqu'
        })
      }
    }).catch((err)=>{
      app.show('验证失败,请重试！')
      this.setData({
        isRetry:true
      })
    });
  },

  getList(){                            //获取设备列表
    return app.request({
      url: app.api.getEquList,
      method: 'GET'
    })
  },

  getUserInfo() {                       //获取账号详情
    return app.request({
      url: app.api.getUserDetails,
      method: 'GET'
    })
  }

})