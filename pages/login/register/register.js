// pages/authentication/authentication.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imei:'',
    setId:'',
    inputPhone: '',
    inputVerCode: '',
    inputName: '',
    inputHeight: '',
    inputWidth:'',
    times: 0,
    tips: '获取验证码',
    isInput:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (JSON.stringify(options) !== "{}") {
      this.setData({
        imei: options.imei,
        setId: options.setId,
      })
    }
    if (!wx.getStorageSync('openid')){
      this.getOpenId()
    }
  },

  getOpenId() {
    app.showLoading('获取openId')
    wx.login({
      success: res => {
        app.request({
          url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx7df1eccc6b4dbb56&secret=3d9914e0f20b0d502b36dd9c2047e64c&js_code=${res.code}&grant_type=authorization_code`,
          method: 'get'
        }).then(data => {
          app.hideLoading()
          wx.setStorageSync('openid', data.openid);
        }).catch((err) => {
          app.hideLoading()
          app.show('获取openid失败')
          this.getOpenId()
        })
      }
    })
  },

  getInputPhone: function (e) {
    this.setData({
      inputPhone: e.detail.value
    })
  },
  
  getInputVerCode: function (e) {
    this.setData({
      inputVerCode: e.detail.value
    })
  },

  getInputName: function (e) {
    this.setData({
      inputName: e.detail.value
    })
  },

  getInputHeight: function (e) {
    this.setData({
      inputHeight: e.detail.value
    })
  },

  getInputWidth: function (e) {
    this.setData({
      inputWidth: e.detail.value
    })
  },

  getCode() {
    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.data.inputPhone))){
      app.show('请输入正确手机号')
      return
    }
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      phone: this.data.inputPhone,
      openid: wx.getStorageSync('openid'),
    }
    app.showLoading('获取验证码...')
    app.request({
      url: app.api.getPhoneCode,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      app.hideLoading()
      if (res.code === 0) {
        app.show('获取成功')
        this.setData({ times: 60, tips: '60s重新获取', isInput: false });
        this.countDown()
      } else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.hideLoading()
      app.show('获取失败')
    })
  },
  

  countDown() {
    let that = this;
    if (that.data.times > 0) {
      setTimeout(() => {
        that.data.times--;
        that.setData({ tips: that.data.times + 's重新获取' });
        that.countDown();
      }, 1000);
    } else {
      that.setData({ tips: '获取验证码',isInput:true});
    }
  },

  register(user){
    if(!user.detail.iv){
      app.show('请授权')
      return 
    }
    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.data.inputPhone))) {
      app.show('请输入正确手机号')
      return
    } else if (this.data.inputVerCode==''){
      app.show('请输入验证码')
      return
    } else if (this.data.inputName == ''){
      app.show('请输入真实姓名')
      return
    }
    //  else if (this.data.inputHeight == ''){
    //   app.show('请输入身高')
    //   return
    // } else if (this.data.inputWidth == ''){
    //   app.show('请输入体重')
    //   return
    // }
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      phone: this.data.inputPhone,
      openid: wx.getStorageSync('openid')
    }
    app.showLoading('注册中...')
    app.request({
      url: app.api.getRegister,
      method: 'post',
      data: {
        ...data,
        wxName: encodeURIComponent(encodeURIComponent(user.detail.userInfo.nickName)),
        imgAdress: user.detail.userInfo.avatarUrl,
        cityName: user.detail.userInfo.city,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      app.hideLoading()
      if (res.code === 0 && res.wxUserId) {
        app.show('注册成功')
        if (this.data.imei && this.data.setId) {
          wx.redirectTo({
            url: `../isLogin/isLogin?imei=${this.data.imei}&setId=${this.data.setId}`
          })
        } else {
          wx.redirectTo({
            url: `../isLogin/isLogin`
          })
        }
      } else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.hideLoading()
      app.show('注册失败')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }
})