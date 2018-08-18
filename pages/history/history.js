
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
    // array:[],
    indexs: '',
    model:'',
    startDate: app.util.formatTime(new Date()).substring(0, 10),
    startTime: '00:00',
    endDate: app.util.formatTime(new Date()).substring(0, 10),
    endTime: '23:59'
  },
  onShow(){
    this.isDeltel()
  },
  onLoad() {
    // this.setArray()
    // this.setSelectName()
    // this.setData({
    //   indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'id', 'name'),
    //   indexId: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'id', 'id')
    // })

    // wx.getSystemInfo({
    //   success: (res)=>{
    //     console.info(res.windowHeight);
    //     this.setData({
    //       scrollHeight: res.windowHeight
    //     });
    //   }
    // });

  },
  // bindPickerChange(e) {                                          //切换设备
  //   if (!app.nowCodeList.length) {
  //     return
  //   }
    // app.nowCodeId = app.nowCodeList[e.detail.value].id
    // app.nowCodeId = app.nowCodeList[e.detail.value].imei
    // this.setData({
    //   indexs: app.nowCodeList[e.detail.value].name,
    //   indexId: app.nowCodeList[e.detail.value].id
    // })
    // this.setSelectName()
  // },
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
  // setArray() {                                                   //设置设备
  //   this.setData({
  //     array: app.nowCodeList
  //   })
  // },
  setSelectName() {                                                  //设置当前设备的名称
    this.setData({
      indexs: app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].name,
      model: app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].model
    })
  },
  isDeltel() {                       //判断当前设备是否存在
    if (app.nowCodeList.filter(obj => obj.id == app.nowCodeId).length === 0) {
      if (!app.nowCodeList.length) {
        wx.reLaunch({
          url: '../equipment/addEqu/addEqu'
        })
      }
      app.nowCodeId = app.nowCodeList[0].id
      this.setSelectName()
      // this.getList()
    } else {
      this.setSelectName()
      // this.getList()
    }
  },
  goChaXun(){
    if (!app.nowCodeId){
      wx.showToast({
        title: '无设备',
        icon: 'none'
      })
      return 
    }
    wx.navigateTo({
      url: `../map/mapHistory/mapHistory?type=3&start=${this.data.startTime}&end=${this.data.endTime}&id=${app.nowCodeId}&date=${this.data.startDate}`
    })
  },
})