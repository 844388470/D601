
const app = getApp();
Page({
  data: {
    equArray:[],
    setTimeTrack:null,
    userInfo: app.globalData.userInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.startArrayTime()
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

  startArrayTime() {                     //开启倒计时
    this.setArray()
    this.data.setTimeTrack = setInterval(() => {
      this.setArray()
    }, 1000)
  },

  setArray(){
    this.setData({
      equArray: app.nowCodeList
    })
  },

  endArrayTime() {                       //结束倒计时
    clearInterval(this.data.setTimeTrack)
    this.data.setTimeTrack = null
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },
  bindregionchange() {
    
  },

  onShow(){
    this.setData({
      userInfo: app.globalData.userInfo
    })
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