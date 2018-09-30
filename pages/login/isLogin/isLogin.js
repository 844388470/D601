// pages/login/isLogin/isLogin.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRetry:false,
    imei:'',
    setId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(JSON.stringify(options)!=="{}"){
      this.setData({
        imei: options.imei,
        setId: options.setId,
      })
    }
    this.isLogin()
    // wx.checkSession({
    //   success: () => {
    //     app.hideLoading()
    //     this.isLogin()
    //   },
    //   fail: () => {
    //     app.hideLoading()
    //     app.show('错误')
    //   }
    // })
  },

  isLogin(){
    const openid = wx.getStorageSync('openid');
    const id = wx.getStorageSync('id');
    if (!openid) {
      this.getOpenId()
    } else if (!id) {
      this.getUserId()
    } else if (this.data.imei&&this.data.setId) {
      wx.redirectTo({
        url: `../../equipment/addEqu/addEqu?imei=${this.data.imei}&setId=${this.data.setId}`
      })
    } else{
      this.getList()
    }
  },

  

  getUserId(){
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      openid: wx.getStorageSync('openid'),
    }
    app.showLoading('获取用户信息')
    app.request({
      url: app.api.getUserInfo,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      app.hideLoading()
      if(res.code===0){
        wx.setStorageSync('id', res.wxUserId)
        wx.setStorageSync('userInfo', { ...res, wxName: decodeURIComponent(decodeURIComponent(res.wxName)), nickName: decodeURIComponent(decodeURIComponent(res.wxName))})
        this.isLogin()
      }else if(res.code===2){
        if (this.data.imei && this.data.setId){
          wx.redirectTo({
            url: `../register/register?imei=${this.data.imei}&setId=${this.data.setId}`
          })
        }else{
          wx.redirectTo({
            url: `../register/register`
          })
        }
      }else{
        return Promise.reject()
      }
    }).catch((err) => {
      app.hideLoading()
      app.show('获取失败')
    })
  },

  // setInitial(){
  //   Promise.all([this.getList(), this.getUserInfo()]).then((arr) =>{
  //     wx.hideLoading()
  //     app.globalData.userInfo = arr[1];
  //     if (arr[0].length){
  //       app.nowCodeList = arr[0]
  //       app.nowCodeId = arr[0][0].id
  //       wx.reLaunch({
  //         url: '../../index/index'
  //       })
  //     }else{
  //       wx.reLaunch({
  //         url: '../../equipment/addEqu/addEqu'
  //       })
  //     }
  //   }).catch((err)=>{
  //     wx.hideLoading()
  //     app.show('验证失败,请重试！')
  //     this.setData({
  //       isRetry:true
  //     })
  //   });
  // },

  setIsRetry(){
    this.setData({
      isRetry:true
    })
  },

  getList(){                            //获取设备列表
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
        if (res.deviceCount){
          app.nowCodeList = res.deviceList
          app.nowCodeId = res.deviceList[0].deviceNo
          wx.reLaunch({
            url: `../../my/my`
          })
        }else{
          wx.redirectTo({
            url: `../../equipment/addEqu/addEqu`
          })
        }
      } else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.hideLoading()
      app.show('获取失败')
    })
  },

  setUserInfo(user) {                       //获取账号详情
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      openid: wx.getStorageSync('openid')
    }
    app.showLoading('修改中...')
    app.request({
      url: app.api.setUserInfo,
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
        app.show('修改成功')
        
      } else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.hideLoading()
      app.show('修改失败')
    })
  },

  getOpenId(){
    app.showLoading('获取openId')
    wx.login({
      success: res => {
        const data = {
          appid: app.appid,
          dt: parseInt(new Date().getTime() / 1000),
          secret: app.secret
        }
        app.request({
          url: app.api.getOpenId,
          method: 'post',
          data: {
            ...data,
            code:res.code,
            sign: app.md5(app.util.getsign(data)).toUpperCase()
          }
        }).then(response => {
          app.hideLoading()
          wx.setStorageSync('openid', response.openid);
          this.isLogin()
        }).catch((err) => {
          app.hideLoading()
          app.show('获取openid失败')
          this.setIsRetry()
        })
      }
    })
  },

  retry(n){
    
  },

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