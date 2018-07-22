
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
    startTime: '00:00',
    endDate: app.util.formatTime(new Date()).substring(0, 10),
    endTime: '23:59'
  },
  onShow(){
    this.setArray()
    this.isDeltel()
  },
  onLoad() {
    this.setArray()
    // this.setSelectName()
    this.setData({
      indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'id', 'name'),
      indexId: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'id', 'id')
    })
  },
  bindPickerChange(e) {                                          //切换设备
    if (!app.nowCodeList.length) {
      return
    }
    // app.nowCodeId = app.nowCodeList[e.detail.value].id
    // app.nowCodeId = app.nowCodeList[e.detail.value].imei
    this.setData({
      indexs: app.nowCodeList[e.detail.value].imei,
      indexId: app.nowCodeList[e.detail.value].id
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
      startTime: `${e.detail.value}`
    })
  },
  bindEndDate(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  bindEndTime(e) {
    this.setData({
      endTime: `${e.detail.value}`
    })
  },
  setArray() {                                                   //设置设备
    this.setData({
      array: app.nowCodeList
    })
  },
  setSelectName() {                                                  //设置当前设备的名称

  },
  isDeltel() {                       //当前设备被删除后
    if (app.nowCodeId == '-1') {
      this.setData({
        indexs: '',
        indexId:''
      })
    }
  },
  goChaXun(){
    if (!this.data.indexId){
      wx.showToast({
        title: '请选择设备',
        icon: 'none'
      })
      return 
    }
    wx.navigateTo({
      url: `../map/mapHistory/mapHistory?type=3&start=${this.data.startTime}&end=${this.data.endTime}&id=${this.data.indexId}&date=${this.data.startDate}`
    })
  }
})