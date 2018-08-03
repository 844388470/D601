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
        // let list = [
          // { longitude: 121.3406087, latitude: 31.1499699 },
          // { longitude: 121.3330688, latitude: 31.1612538 },
          // { longitude: 121.3293156, latitude: 31.166917 },
          // { longitude: 121.3268593, latitude: 31.1690175 },
          // { longitude: 121.3268943, latitude: 31.1689271 },
          // { longitude: 121.3265427, latitude: 31.1691976 },
          // { longitude: 121.3267516, latitude: 31.168909 },
          // { longitude: 121.3259663, latitude: 31.1695755 },
          // { longitude: 121.3264309, latitude: 31.1701394 },
          // { longitude: 121.3247445, latitude: 31.1717025 },
          // { longitude: 121.319554, latitude: 31.1755317 },
          // { longitude: 121.3189646, latitude: 31.1758857 },
          // { longitude: 121.3157018, latitude: 31.1810881 },
          // { longitude: 121.3142169, latitude: 31.1804959 },
          // { longitude: 121.3079582, latitude: 31.1885761 },
          // { longitude: 121.3070961, latitude: 31.1899618 },
          // { longitude: 121.3087381, latitude: 31.1927941 },
          // { longitude: 121.3036681, latitude: 31.1940063 },
        // ]
        // let list = [{ longitude: 121.363090, latitude: 31.124060 }, { longitude: 121.363268, latitude: 31.124365 }, { longitude: 121.363204, latitude: 31.124549 }, { longitude: 121.363590, latitude: 31.124691 }, { longitude: 121.364615, latitude: 31.122583 }, { longitude: 121.365591, latitude: 31.122840 }, { longitude: 121.366401, latitude: 31.123433 }, { longitude: 121.367002, latitude: 31.124209 }, { longitude: 121.367018, latitude: 31.124213 }, { longitude: 121.364996, latitude: 31.125844 }, { longitude: 121.364878, latitude: 31.125664 }, { longitude: 121.364545, latitude: 31.125343 }, { longitude: 121.363896, latitude: 31.124810 }, { longitude: 121.363596, latitude: 31.124686 }]
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