// pages/authentication/authentication.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputPhone: '',
    inputCode: '',
    times: 0,
    tips: '获取验证码',
    isInput: true
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

  changeAuthen: function (e) {

  },

  getInputPhone: function (e) {

  },

  getInputCode: function (e) {

  },

  getCode: function () {
    if (!this.data.isInput) {
      return
    }
    this.setData({ times: 60, tips: '60秒后重发', isInput: false });
    this.countDown()
  },

  countDown: function () {
    let that = this;
    if (that.data.times > 0) {
      setTimeout(() => {
        that.data.times--;
        that.setData({ tips: that.data.times + '秒后重发' });
        that.countDown();
      }, 1000);
    } else {
      that.setData({ tips: '获取验证码', isInput: true });
    }
  },

  registPerson: function () {

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