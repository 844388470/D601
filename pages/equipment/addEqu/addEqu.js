// pages/equipment/addEqu/addEqu.js
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputCode:''
  },

  getInputCode(e){
    this.setData({
      inputCode:e.detail.value
    })
  },
  saoma(){
    let that=this
    wx.scanCode({
      success:function(res){
        if (typeof res.result =='string'){
          that.setData({
            inputCode: res.result
          })
        }
        
      }
    })
  },
  addEqu(){
    wx.showLoading({
      title: '添加中...',
      mask: true
    })
    app.request({
      url: `${app.api.addCoor}`,
      method: 'post',
      data:{
        imei: this.data.inputCode
      }
    }).then(res => {
      this.getCoor()
    }).catch(err => {
      
    })
  },

  getCoor() {
    app.request({
      url: `${app.api.getUserInfo}${wx.getStorageSync('id')}/devices`,
      method: 'GET'
    }).then(res => {
      let list = []
      if (res instanceof Array) {
        list = res
        if (list.length && list.filter(res => res.imei == this.data.inputCode).length) {
          app.nowCodeList = list
          app.nowCodeId = list[0].id
          wx.reLaunch({
            url: '../../index/index'
          })
        } else {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        wx.showToast({
          title: '添加失败',
          icon: 'none',
          duration: 2000
        })
      }
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '添加失败',
        icon: 'none',
        duration: 2000
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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