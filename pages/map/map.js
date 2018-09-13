// pages/map/map.js
import util from '../../utils/util.js'
const app = getApp()
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
    optionType: 0,
    distance: '',
    bushu: '',
    kalu: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.request({
      url: `${app.api.getHistory}${options.id}/positions`,
      method: 'GET',
      data: {
        startTime: options.start+' 00:00:01',
        endTime: options.end+' 23:59:59'
      }
    }).then(res => {
      // let list = res || []
      // let res = JSON.parse(options.data)
      let list = [...res]
      list = list.filter(res => res.longitude)
      if (!list.length) {
        wx.hideLoading()
        wx.showToast({
          title: '无路径,请重新选择时间',
          icon: 'none',
          duration: 2000
        })
        return
      }
      for (let i = 0; i < list.length; i++) {
        if (i == 0) {
          list[i] = {
            latitude: list[0].latitude, longitude: list[0].longitude, iconPath: '../../image/map_index.png', width: 40, height: 50, anchor: { x: 0.5, y: 0.7 }
          }
        } else if (i == list.length - 1) {
          list[i] = {
            latitude: list[i].latitude, longitude: list[i].longitude, iconPath: '../../image/map_index_h.png', width: 40, height: 50, anchor: { x: 0.5, y: 0.7 }
          }
        } else {
          list[i] = {
            latitude: list[i].latitude, longitude: list[i].longitude, iconPath: '../../image/yuan.png', width: 12, height: 12, anchor: { x: 0.5, y: 0.5 }
          }
        }
      }
      app.mapApi([list[0], list[list.length - 1]]).then(ress => {
        this.setData({
          optionType: 3,
          // time: `${res[0].eventTime.substr(0, 10)}`,
          time: ``,
          longitude: list[0].longitude,
          latitude: list[0].latitude,
          timeFnNumber: `${res[0].eventTime.substr(5)}  ---  ${res[res.length - 1].eventTime.substr(5)}`,
          polyline: [{
            points: list,
            color: '#02ad00',
            arrowLine: true,
            width: 3,
          }],
          startName: ress[0],
          endName: ress[1],
          markerDatas: list,
        })
      })
      this.getdistance(list)
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

  getdistance(list) {
    const res = this.getDistanceList(list)
    const bushu = res / (1.7 * 0.45)
    this.setData({
      distance: (res / 1000).toFixed(2),
      kalu: (bushu * 0.5 / 1000).toFixed(2),
      bushu: (Number(bushu) / 1000).toFixed(2)
    })
  },

  getDistanceList(list) {
    let arr = []
    let num = 0
    for (let i = 0; i < list.length - 1; i++) {
      arr.push([list[i], list[i + 1]])
    }
    for (let i = 0; i < arr.length; i++) {
      const mi = this.distances(arr[i])
      num = num + mi
    }
    return num
  },

  distances(list) {
    var lat = [list[0].latitude, list[1].latitude]
    var lng = [list[0].longitude, list[1].longitude]
    var R = 6378137;
    var dLat = (lat[1] - lat[0]) * Math.PI / 180;
    var dLng = (lng[1] - lng[0]) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat[0] * Math.PI / 180) * Math.cos(lat[1] * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.round(d);
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