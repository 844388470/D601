// pages/map/map.js
import util from '../../../utils/util.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    timeFn: '',
    timeFnNumber: '',
    startName: '',
    endName: '',
    longitude: '',
    latitude: '',
    circles: [],
    markerDatas: [],
    polyline: [],
    optionType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.type == 1) {
      if (options.n == 1) {
        this.setData({
          optionType: 1,
          time: '2018-06-04 16:55',
          timeFn: app.util.timeFn('2018-06-24 16:55', new Date),
          longitude: '121.4106',
          latitude: '31.190658',
          circles: [{ longitude: '121.4116', latitude: '31.191658', radius: 100, fillColor: '#99cc9955' }],
          markerDatas: [{ longitude: '121.4106', latitude: '31.190658', iconPath: '../../../image/message_index.png', width: 30, height: 40, anchor: { x: 0.5, y: 1 } }],
        })
      } else if (options.n == 2) {
        this.setData({
          optionType: 1,
          time: '2018-06-04 16:55',
          timeFn: app.util.timeFn('2018-06-23 16:55', new Date),
          longitude: '121.4106',
          latitude: '31.190658',
          circles: [{ longitude: '121.4116', latitude: '31.191658', radius: 100, fillColor: '#99cc9955' }],
          markerDatas: [{ longitude: '121.4106', latitude: '31.191658', iconPath: '../../../image/message_index.png', width: 30, height: 40, anchor: { x: 0.5, y: 1 } }],
        })
      } else if (options.n == 3) {
        this.setData({
          optionType: 1,
          time: '2018-06-04 16:55',
          timeFn: app.util.timeFn('2018-06-22 16:55', new Date),
          longitude: '121.4106',
          latitude: '31.190658',
          circles: [{ longitude: '121.4116', latitude: '31.191658', radius: 100, fillColor: '#99cc9955' }],
          markerDatas: [{ longitude: '121.4106', latitude: '31.194658', iconPath: '../../../image/message_index.png', width: 30, height: 40, anchor: { x: 0.5, y: 1 } }],
        })
      }
    }
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