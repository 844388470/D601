// pages/equipment/setEqu/setEqu.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'1',
    equData:[],
    models:'',
    sn:'',
    imei:'',
    positionName: '',
    positionId:'0',
    ismode:''
  },

  actChong(){
    this.setData({
      active: '1'
    })
  },

  actEqu() {
    this.setData({
      active: '2'
    })
  },

  setEquData(){
    this.setData({
      equData: app.nowCodeList[app.equIndex].customFieldList,
      models: app.nowCodeList[app.equIndex].deviceType,
      sn: app.nowCodeList[app.equIndex].iccid,
      imei: app.nowCodeList[app.equIndex].deviceNo,
    })
  },


  goPositionMode() {
    wx.navigateTo({
      url: '../positionMode/positionMode'
    })
  },
  
  goQrCode(){
    wx.navigateTo({
      url: '../qrCode/qrCode'
    })
  },

  goManage() {
    wx.navigateTo({
      url: '../manage/manage'
    })
  },

  goAround() {
    wx.navigateTo({
      url: '../around/around'
    })
  },


  // deleteEvent(){
  //   app.showLoading('解除绑定中')
  //   app.request({
  //     url: `${app.api.setUserDevices}${app.nowCodeList[app.equIndex].id}`,
  //     method: 'DELETE'
  //   }).then(res => {
  //     wx.hideLoading()
  //     app.nowCodeList.splice(app.equIndex,1)
  //     if (app.nowCodeList.length) {
  //       wx.navigateBack({
  //         delta: 1
  //       })
  //     }else{
  //       wx.reLaunch({
  //         url: '../addEqu/addEqu'
  //       })
  //     }
  //   }).catch(err => {
  //     wx.hideLoading()
  //     app.show('解除失败')
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setEquData()
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
    // this.setName()
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