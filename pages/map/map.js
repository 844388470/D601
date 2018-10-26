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
    kalu: '',
    index: 0,
    isWifi: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.showLoading('获取轨迹')
    app.request({
      url: `${app.api.getHistory}${options.id}/positions`,
      method: 'GET',
      data: {
        startTime: options.start,
        endTime: options.end
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
      list.sort((a, b) => new Date(a.eventTime).getTime() - new Date(b.eventTime).getTime())
      for (let i = 0; i < list.length; i++) {
        list[i] = {
          id: i, latitude: list[i].latitude, longitude: list[i].longitude, iconPath: '../../image/yuan.png', width: 12, height: 12, anchor: { x: 0.5, y: 0.5 }, eventTime: list[i].eventTime, wifiGpsFlag: list[i].wifiGpsFlag
        }
      }
      this.setData({
        list: list
      })
      this.setIndex(0)
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

  lastStep() {
    if (this.data.index === 0) {
      app.show('已最早')
      return
    }
    this.setIndex(this.data.index - 1)
  },

  nextStep() {
    if (this.data.index === this.data.list.length - 1) {
      app.show('已最迟')
      return
    }
    this.setIndex(this.data.index + 1)
  },

  setIndex(index) {
    let list = this.data.list.map(res => {
      return {
        ...res
      }
    })
    app.showLoading('请稍后')
    list[index] = {
      ...list[index],
      iconPath: '../../image/message_index.png',
      width: 22,
      height: 30,
      anchor: { x: 0.5, y: 1 }
    }
    app.mapApi([list[index]]).then(ress => {
      app.hideLoading()
      this.setData({
        index,
        time: list[index].eventTime,
        longitude: list[index].longitude,
        latitude: list[index].latitude,
        isWifi: list[index].wifiGpsFlag,
        polyline: [{
          points: list.slice(0, index + 1),
          color: '#02ad00',
          arrowLine: true,
          width: 3,
        },
        {
          points: list.slice(index),
          color: '#25321C',
          arrowLine: true,
          width: 3,
        }],
        startName: ress[0],
        markerDatas: list
      })
    })
  },

  markertap(e) {
    this.setIndex(e.markerId)
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