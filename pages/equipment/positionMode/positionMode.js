// pages/equipment/positionMode/positionMode.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin:false,
    active:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setActive()
    this.isAdmin()
  },

  isAdmin() {
    if (app.nowCodeList[app.equIndex].admin_id == app.globalData.userInfo.id) {
      this.setData({
        isAdmin: true
      })
    }
  },

  setActive(){
    this.setData({
      active: app.nowCodeList[app.equIndex].locate_mode
    })
  },

  setOneMode(){
    if (!this.data.isAdmin) {
      app.show('无权限')
      return
    }
    if (app.nowCodeList[app.equIndex].locate_mode===0){
      return
    }
    this.editMode(0)
  },

  editMode(value){
    app.showLoading('修改中')
    app.request({
      url: `${app.api.setEqu}${app.nowCodeList[app.equIndex].id}`,
      method: 'put',
      data: {
        locate_mode: value
      }
    }).then(res => {
      wx.hideLoading()
      app.nowCodeList[app.equIndex].locate_mode = Number(value)
      this.setActive()
    }).catch(err => {
      wx.hideLoading()
      app.show('修改失败')
    })
  },

  setTwoMode() {
    if (!this.data.isAdmin) {
      app.show('无权限')
      return
    }
    if (app.nowCodeList[app.equIndex].locate_mode === 1) {
      return
    }
    this.editMode(1)
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