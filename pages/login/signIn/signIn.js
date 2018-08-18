
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginMode:'weixin',
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

  weixinLogin(res){
    if (res.detail.userInfo){
      const userInfo = res.detail.userInfo;
      this.getToken(userInfo)
    }else{
      app.show('请授权')
    }
  },

  getToken(user){
    app.showLoading('登陆中')
    wx.login({
      success: res => {
        app.request({ 
          url: app.api.getLoginCode,
          data: { code: res.code },
          method:'post'  
        }).then(data=>{
          wx.setStorageSync('id', data.id);
          wx.setStorageSync('openid', data.openid);
          wx.setStorageSync('token', data.token);
          app.refapi()
          this.getUserInfo(user)
        }).catch((err)=>{
          app.hideLoading()
          app.show('登陆失败')
        })
      }
    })
  },

  getList() {                            //获取设备列表
    app.request({
      url: app.api.getEquList,
      method: 'GET'
    }).then((arr)=>{
      if (arr.length) {
        app.nowCodeList = arr
        app.nowCodeId = arr[0].id
        wx.reLaunch({
          url: '../../index/index'
        })
      } else {
        wx.reLaunch({
          url: '../../equipment/addEqu/addEqu'
        })
      }
    }).catch((err)=>{
      app.hideLoading()
      app.show('登陆失败')
    })
  },

  setUserInfo(data){                         //微信登录更新用户数据
    app.request({
      url: app.api.getUserDetails,
      method: 'put',
      data: {
        nickname: data.nickName,
        country: data.country,
        city: data.city,
        province: data.province,
        headimgurl: data.avatarUrl,
      }
    }).then(res => {
      app.globalData.userInfo = data;
      this.getList()
    }).catch(err => {
      app.hideLoading()
      app.show('登陆失败')
    })
  },

  getUserInfo(data){                      //获取用户信息
    app.request({
      url: app.api.getUserDetails,
      method: 'get'
    }).then(res => {
      if (res.nickname){
        this.getList()
        app.globalData.userInfo = res;
      }else{
        this.setUserInfo(data)
      }
    }).catch(err => {
      app.hideLoading()
      app.show('登陆失败')
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

  changeWeixin(){
    this.setData({
      loginMode:'weixin'
    })
  },

  changPhone(){
    this.setData({
      loginMode: 'phone'
    })
  },
  
  goLogin(){
    return
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
        app.nowCodeId = list.length !== 0 ? list[0].id:''
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