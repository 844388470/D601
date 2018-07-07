// pages/equipment/setEqu/setEqu.js
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'设备一',
    model:'D601',
    imei:'xxxxxxxxxxxxxx',
    positionName: '标准模式',
    positionId:'1',
    modeArray:[
      { name: '标准模式', id: '1' }, { name: '性能模式', id: '2' }
    ]
  },

  blurData(){

  },

  bindPickerChange(e){
    if (e.detail.value !== '0' || this.data.modeArray.length!==0){
      this.setData({
        positionId: this.data.modeArray[e.detail.value].id
      })
      this.setPositionName()
    }
  },

  setPositionName(){
    this.setData({
      positionName: app.util.filterIdName(this.data.modeArray, this.data.positionId)
    })
  },

  goEquUpdate() {
    wx.navigateTo({
      url: '../equUpdate/equUpdate'
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