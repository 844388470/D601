// pages/equipment/equInfo/equInfo.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imei:'',
    setId:'',
    screct:'',
    isSuccess:true,
    list: [
      { content: "", fieldName: "昵称" },
      { content: "", fieldName: "宠物性别" },
      { content: "", fieldName: "宠物类别" },
      { content: "", fieldName: "宠物毛色" },
      { content: "", fieldName: "宠物主姓名" },
      { content: "", fieldName: "宠物主性别" },
      { content: "", fieldName: "宠物主电话" },
      { content: "", fieldName: "宠物主地址" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(JSON.stringify(options)!=="{}"){
      this.setData({
        imei: options.imei,
        screct: options.screct
      })
      this.getEquInfo(options.imei)
    }else{
      app.show('设备码或者密钥有误')
    }
    
  },

  bindEqu(){
    if(!this.data.setId){
      app.show('设备码或者密钥有误，设备无效')
      return
    }
    wx.navigateTo({
      url: `../isIdCard/isIdCard?imei=${this.data.imei}&setId=${this.data.setId}&screct=${this.data.screct}`
    })
  },

  retry(){
    this.getEquInfo(this.data.imei)
  },

  getEquInfo(id){
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      deviceNo: id,
    }
    app.showLoading('获取宠物信息')
    app.request({
      url: app.api.getEquInfo,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      app.hideLoading()
      if (res.code === 0) {
        this.setData({
          isSuccess: true,
          setId: res.deviceSetNo,
          list: res.customerFields
        })
      }else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.hideLoading()
      app.show('获取失败,设备码或者密钥有误')
      // this.setData({
      //   isSuccess: false
      // })
    })
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