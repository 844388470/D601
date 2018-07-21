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
      app.request({
        url: app.api.getHistory,
        method: 'GET',
        data: {
          // deviceIdStr: options.id,
          deviceIdStr: app.nowCodeId,
          startTime: options.start,
          endTime: options.end
        }
      }).then(res => {
        // let res={
        //   responseData:{
        //     rsList: [{ longitude: 121.363090, latitude: 31.124060 }, { longitude: 121.363268, latitude: 31.124365 }, { longitude: 121.363204, latitude: 31.124549 }, { longitude: 121.363590, latitude: 31.124691 }, { longitude: 121.364615, latitude: 31.122583 }, { longitude: 121.365591, latitude: 31.122840 }, { longitude: 121.366401, latitude: 31.123433 }, { longitude: 121.367002, latitude: 31.124209 }, { longitude: 121.368510, latitude: 31.125201 }, { longitude: 121.370977, latitude: 31.121564 }]
        //   }
        // }
        let list = res.responseData.rsList || []
        let start, end;
        if (!res.responseData.rsList || res.responseData.rsList.length == 0) {
          wx.hideLoading()
          wx.showToast({
            title: '无路径,请重试',
            icon: 'none',
            duration: 2000
          })
          return
        }
        app.mapApi([list[0], list[list.length - 1]]).then(ress => {
          this.setData({
            optionType: 3,
            time: `${options.start.substring(5)}---${options.end.substring(5)}`,
            longitude: list[0].longitude,
            latitude: list[0].latitude,
            timeFnNumber: '',
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
        console.log(err)
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