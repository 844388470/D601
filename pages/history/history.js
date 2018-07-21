
// const app = getApp();
// Page({
//   data: {

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad() {

//   },
//   goMap(e) {
//     wx.navigateTo({
//       url: '../map/map?type=2&&n=' + e.target.dataset.type
//     })
//     // wx.navigateTo({
//     //   url: '../map/map'
//     // })
//   },
//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
//     console.log("下拉")
//   },
//   bindregionchange() {
//     console.log(9999)
//   },
//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
//     console.log("上拉")
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })


const app=getApp();
Page({
  data:{
    array:[],
    indexs: '',
    indexId:'',
    startDate: app.util.formatTime(new Date()).substring(0, 10),
    startTime: '00:00:00',
    endDate: app.util.formatTime(new Date()).substring(0, 10),
    endTime: '23:59:59'
  },
  onLoad() {
    this.setArray()
    // this.setSelectName()
    this.setData({
      indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'device_id', 'imei'),
      indexId: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'device_id', 'device_id')
    })
  },
  bindPickerChange(e) {                                          //切换设备
    if (!app.nowCodeList.length) {
      return
    }
    app.nowCodeId = app.nowCodeList[e.detail.value].device_id
    // app.nowCodeId = app.nowCodeList[e.detail.value].imei
    this.setData({
      indexs: app.nowCodeList[e.detail.value].imei,
      indexId: app.nowCodeList[e.detail.value].device_id
    })
    // this.setSelectName()
  },
  bindStartDate(e){
    this.setData({
      startDate: e.detail.value
    })
  },
  bindStartTime(e) {
    this.setData({
      startTime: `${e.detail.value}:00`
    })
  },
  bindEndDate(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  bindEndTime(e) {
    this.setData({
      endTime: `${e.detail.value}:59`
    })
  },
  setArray() {                                                   //设置设备
    this.setData({
      array: app.nowCodeList
    })
  },
  setSelectName() {                                                  //设置当前设备的名称
    // this.setData({
    //   indexs: app.util.filterIdName(app.nowCodeList, this.data.indexId, 'deviceId', 'imei')
    // })
  },
  goChaXun(){
    wx.navigateTo({
      url: `../map/mapHistory/mapHistory?type=3&start=${this.data.startDate}T${this.data.startTime}&end=${this.data.startDate}T${this.data.endTime}&id=${this.data.indexId}`
    })
  }
})