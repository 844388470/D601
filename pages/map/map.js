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
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      openid: wx.getStorageSync('openid'),
      deviceNo: app.nowCodeId,
    }
    app.showLoading('获取轨迹')
    app.request({
      url: app.api.getHistory,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase(),
        startTime: Number(options.start),
        endTime: Number(options.end)
      }
    }).then(res => {
      let list = res.locationList || []
      list = list.filter(ress => ress.longitude)
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
        list[i] = {
          id: i, latitude: list[i].latitude, 
          longitude: list[i].longitude, 
          iconPath: '../../image/yuan.png', 
          width: 12, 
          height: 12, 
          anchor: { x: 0.5, y: 0.5 }, 
          eventTime: list[i].updateTime, 
          // wifiGpsFlag: list[i].wifiGpsFlag
        }
      }
      this.setData({
        list: list
      })
      this.setIndex(0)
      wx.hideLoading()
    }).catch(err => {
      app.show('获取轨迹失败')
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
        // isWifi: list[index].wifiGpsFlag,
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