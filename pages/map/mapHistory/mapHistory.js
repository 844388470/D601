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
      app.request({
        url: `${app.api.getHistory}${options.id}/positions`,
        method: 'GET',
        data: {
          startTime: `${options.date}T${options.start}:00`,
          endTime: `${options.date}T${options.end}:59`
        }
      }).then(res => {
        let list = res || []
        let start, end;
        if (!list.length) {
          wx.hideLoading()
          wx.showToast({
            title: '无路径,请重新选择时间',
            icon: 'none',
            duration: 2000
          })
          return
        }
        app.mapApi([list[0], list[list.length - 1]]).then(ress => {
          this.setData({
            optionType: 3,
            time: `${options.date}`,
            longitude: list[0].longitude,
            latitude: list[0].latitude,
            timeFnNumber: `${options.start}-${options.end}`,
            polyline: [{
              points: list,
              color: '#02ad00',
              width: 3,
              arrowLine: true
            }],
            startName: ress[0],
            endName: ress[1],
            markerDatas: [{ latitude: list[0].latitude, longitude: list[0].longitude, iconPath: '../../../image/map_index.png', width: 40, height: 50, anchor: { x: 0.5, y: 0.7 } }, { latitude: list[list.length - 1].latitude, longitude: list[list.length - 1].longitude, iconPath: '../../../image/map_index_h.png', width: 40, height: 50, anchor: { x: 0.5, y: 0.7 } }],
          })
        })
        wx.hideLoading()
      }).catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: '获取失败,请重试',
          icon: 'none',
          duration: 2000
        })
      })
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