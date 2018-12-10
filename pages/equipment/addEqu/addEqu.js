// pages/equipment/addEqu/addEqu.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imei:'',
    setId:'',
    inputCode: '',
    inputKey: '',
    inputName:'',
    list:[],
    bindList:[],
    time:null,
    isRepeat:false,
  },


  onLoad: function (options) {
    if (JSON.stringify(options) !== "{}") {
      this.getEquSerect(options.imei, options.setId)
    }
  },

  query(){
    if (this.data.inputCode==''){
      app.show('设备码不得为空')
      return 
    }
    wx.navigateTo({
      url: `../equInfo/equInfo?imei=${this.data.inputCode}&screct=${this.data.inputKey}`
    })
  },

  getEquSerect(imei,id){
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      deviceSetNo: id,
    }
    app.showLoading('获取设备绑定密钥')
    app.request({
      url: app.api.getEquSerect,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      app.hideLoading()
      if (res.code === 0) {
        this.setData({
          inputCode: imei,
          inputKey: res.secert
        })
      }else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.hideLoading()
      app.show('获取失败')
    })
  },

  getInputCode(e){
    this.setData({
      inputCode:e.detail.value
    })
  },

  getInputKey(e) {
    this.setData({
      inputKey: e.detail.value
    })
  },

  getInputName(e) {
    this.setData({
      inputName: e.detail.value
    })
  },

  saoma(){
    let that=this
    wx.scanCode({
      success:function(res){
        console.log(res.result)
        if (typeof res.result =='string'){
          try {
            const obj = res.result.split(',')
            that.setData({
              inputCode: obj[0],
              inputKey: obj[1] || ''
            })
          } catch (e) {
            app.show('无法解析')
          }
        }
      }
    })
  },

  addEqu(){
    if (!this.data.inputCode){
      app.show('设备码不得为空')
      return 
    } else if (!this.data.inputKey){
      app.show('密钥不得为空')
      return
    } else if (!this.data.inputName) {
      app.show('设备昵称不得为空')
      return
    }
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      openid: wx.getStorageSync('openid'),
      deviceNo: this.data.inputCode,
      deviceSerect: this.data.inputKey,
    }
    app.showLoading('绑定中')
    app.request({
      url: app.api.addEqu,
      method: 'post',
      data: {
        ...data,
        deviceNickname: this.data.inputName,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      app.hideLoading()
      if (res.code === 0) {
        this.getList()
      }else if (res.code === 4) {
        this.setData({
          isRepeat: true
        })
        app.show('该设备已绑定过本用户，请进入更多查看')
      } else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.hideLoading()
      app.show('绑定失败，请确认设备码或密钥是否正确。')
    })
  },

  getList() {                            //获取设备列表
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      openid: wx.getStorageSync('openid')
    }
    app.showLoading('获取设备列表中...')
    app.request({
      url: app.api.getEquList,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      app.hideLoading()
      if (res.code === 0) {
        app.show('获取成功')
        // if (res.deviceCount) {
          app.nowCodeList = res.deviceList
          app.nowCodeId = res.deviceList[0].deviceNo
          wx.reLaunch({
            url: `../../my/my`
          })
        // }
      } else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.hideLoading()
      app.show('获取失败')
    })
  },

  goBindRecord(){
    wx.navigateTo({
      url: '../../login/bindRecord/bindRecord'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
 
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})