
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

  bindregionchange() {
    
  },

  onShow(){
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  // onHide(){

  // }
})