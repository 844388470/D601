
const app = getApp();
Page({
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  goMap(e) {
    wx.navigateTo({
      url: '../map/map?type=2&&n=' + e.target.dataset.type
    })
    // wx.navigateTo({
    //   url: '../map/map'
    // })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("下拉")
  },
  bindregionchange() {
    console.log(9999)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})