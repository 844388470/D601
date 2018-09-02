// pages/map/map.js
import util from '../../../utils/util.js'
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
    optionType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        
        this.getList(options.did)
  },

  getList(id){
    app.showLoading('获取中')
    app.request({
      url: `${app.api.getIndex}${id}/fences`,
      method: 'GET'
    }).then(res => {
      app.hideLoading()
      if (res.length) {
        const list=[]
        for (let i in res){
          list.push({
            longitude: res[i].longitude,
            latitude: res[i].latitude,
            radius: res[i].radius,
            fillColor: '#99cc9955'
          })
        }
        console.log(list)
        this.setMap(list)
      }
    }).catch(res => {
      app.hideLoading()
      app.show('获取失败')
    })
  },

  setMap(list,dian){
    this.setData({
      optionType: 1,
      time: '2018-06-04 16:55',
      timeFn: app.util.timeFn('2018-06-24 16:55', new Date),
      longitude: '121.363156',
      latitude: '31.124131',
      circles: list,
      markerDatas: [{ longitude: '121.4106', latitude: '31.190658', iconPath: '../../../image/message_index.png', width: 22, height: 32, anchor: { x: 0.5, y: 1 } }],
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