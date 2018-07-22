// pages/equipment/positionMode/positionMode.js
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setActive()
  },

  setActive(){
    this.setData({
      active: app.nowCodeList[app.equIndex].locate_mode
    })
  },

  setOneMode(){
    wx.showLoading({
      title: '修改中...',
      mask: true
    })
    app.request({
      url: `${app.api.getIndex}${app.nowCodeList[app.equIndex].id}`,
      method: 'put',
      data: {
        locate_mode: '0'
      }
    }).then(res => {
      wx.hideLoading()
      app.nowCodeList[app.equIndex].locate_mode = '0'
      this.setActive()
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '修改失败',
        icon: 'none',
        duration: 2000
      })
    })
  },


  setTwoMode() {
    wx.showLoading({
      title: '修改中...',
      mask: true
    })
    app.request({
      url: `${app.api.getIndex}${app.nowCodeList[app.equIndex].id}`,
      method: 'put',
      data: {
        locate_mode: '1'
      }
    }).then(res => {
      wx.hideLoading()
      app.nowCodeList[app.equIndex].locate_mode = '1'
      this.setActive()
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '修改失败',
        icon: 'none',
        duration: 2000
      })
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