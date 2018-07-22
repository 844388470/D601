
const app = getApp();
Page({
  data: {
    equArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  goSetting(e) {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  
  goAddEqu(e) {
    wx.navigateTo({
      url: '../equipment/addEqu/addEqu'
    })
  },

  goUserInfo(){
    wx.navigateTo({
      url: '../userInfo/userInfo'
    })
  },

  goMotion() {
    wx.navigateTo({
      url: '../motion/motion'
    })
  },

  goSetEqu(e) {
    app.equIndex = e.target.dataset.index
    wx.navigateTo({
      url: '../equipment/setEqu/setEqu'
    })
  },

  setArray(){
    this.setData({
      equArray: app.nowCodeList
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },
  bindregionchange() {
    
  },

  onShow(){
    this.setArray()
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