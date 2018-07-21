
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputPhone: '',
    inputCode: '',
    canLogin: false,
    phoneActive: false,
    codeActive: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getUserInfo: function (res) {
    if (res.detail.userInfo){
      let userInfo = res.detail.userInfo;
      wx.showLoading({
        title: '登录中...',
        mask: true
      })
      app.request({
        url: app.api.getUserInfo,
        method: 'put',
        data: {
          nickname: userInfo.nickName,
          country: userInfo.country,
          city: userInfo.city,
          province: userInfo.province,
          headimgurl: userInfo.avatarUrl,
        }
      }).then(data => {
        wx.hideLoading()
        app.globalData.userInfo = userInfo;
        this.getCoor()
      }).catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 2000
        })
      })
    }else{
      wx.showToast({
        title: '请授权',
        icon: 'none',
        duration: 2000
      })
    }
  },

  getCoor(){
    app.request({
      url: app.api.getCoor,
      method: 'GET'
    }).then(res => {
      let list = []
      if (res instanceof Array) {
        list = res
      }
      app.nowCodeList = list
      app.nowCodeId = list.length !== 0 ? list[0].device_id : ''
      wx.switchTab({
        url: '../../index/index'
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '登录失败',
        icon: 'none',
        duration: 2000
      })
    })
  },

  inputPhoneBlur: function (options) {
    this.setData({ phoneActive: false })
  },

  inputPhoneFocus: function (options) {
    this.setData({ phoneActive: true })
  },

  inputCodeBlur: function (options) {
    this.setData({ codeActive: false })
  },

  inputCodeFocus: function (options) {
    this.setData({ codeActive: true })
  },

  goForgetPassword: function () {
    wx.navigateTo({
      url: '../forgetPassword/forgetPassword',
    });
  },

  goRegister: function () {
    wx.navigateTo({
      url: '../register/register',
    });
  },

  getInputPhone: function (e) {
    this.setData({ inputPhone: e.detail.value });
    if (this.data.inputPhone.length >= 11 && this.data.inputPhone && this.data.inputCode) {
      this.checkExist();
    } else {
      this.setData({ canLogin: false });
    }
  },

  getInputCode: function (e) {
    this.setData({ inputCode: e.detail.value });
    if (this.data.inputPhone && this.data.inputCode) {
      this.setData({ canLogin: true })
    } else {
      this.setData({ canLogin: false })
    }
  },

  
  goLogin(){
    if (!this.data.inputPhone && !this.data.inputCode){
      return
    }
    wx.showLoading({
      title: '登录中...',
      mask:true
    })
    setTimeout(()=>{
      app.request({
        url: app.api.getCoor,
        method: 'GET',
        data: {
          
        }
      }).then(res => {
        let list =  []
        if (res instanceof Array){
          list=res
        }
        app.nowCodeList = list
        app.nowCodeId = list.length !== 0 ? list[0].device_id:''
        wx.switchTab({
          url: '../../index/index'
        })
        wx.hideLoading()
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 2000
        })
      })
    },2000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //生命周期函数--监听页面显示
  onShow: function () {
    
  },

  //生命周期函数--监听页面隐藏
  onHide: function () {
  },

  //生命周期函数--监听页面卸载
  onUnload: function () {
  },

  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
  },

  //页面上拉触底事件的处理函数
  onReachBottom: function () {
  },

  //用户点击右上角分享
  onShareAppMessage: function () {
  }
})