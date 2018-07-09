
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
    // if (wx.getStorageSync("token")){
    //   wx.switchTab({
    //     url: '../../index/index'
    //   })
    // }
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
      wx.setStorageSync('token','6666')
      app.request({
        url: app.api.getIndex,
        method: 'GET',
        data: {
          'deviceIdStr': 'e8597428-b723-4d93-af1b-bf0aa5fc5f74,ac601dce-d023-4f31-b33b-2040880a0494,5da73384-e835-445a-a7a4-85ede4de1e9c,5562fc76-fec6-44d0-b6c9-9fab16e5393f',
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        let list = res.responseData.rsList || []
        app.nowCodeList = list
        app.nowCodeId = list.length !== 0 ? res.responseData.rsList[0].imei:''
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