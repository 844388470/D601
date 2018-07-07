// pages/equipment/around/around.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { name: '公司', distance: '200', adressName: '上海闵行区莘庄镇西子国际中心', markers: [{ longitude: '121.4106', latitude: '31.191658' }], circles: [{ longitude: '121.4106', latitude: '31.191658', radius: 100, fillColor: '#99cc9955' }]},
      { name: '公司', distance: '200', adressName: '上海闵行区莘庄镇西子国际中心', markers: [{ longitude: '121.4106', latitude: '31.191658' }], circles: [{ longitude: '121.4106', latitude: '31.191658', radius: 100, fillColor: '#99cc9955' }] },
      { name: '公司', distance: '200', adressName: '上海闵行区莘庄镇西子国际中心', markers: [{ longitude: '121.4106', latitude: '31.191658' }], circles: [{ longitude: '121.4106', latitude: '31.191658', radius: 100, fillColor: '#99cc9955' }] },
      { name: '公司', distance: '200', adressName: '上海闵行区莘庄镇西子国际中心', markers: [{ longitude: '121.4106', latitude: '31.191658' }], circles: [{ longitude: '121.4106', latitude: '31.191658', radius: 100, fillColor: '#99cc9955' }] }
      ]
  },

  goAddAround(){
    wx.navigateTo({
      url: '../addAround/addAround'
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