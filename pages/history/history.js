
const app=getApp();
Page({
  data:{
    array:[],
    indexs: '',
    model:'',
    startDate: app.util.formatTime(new Date()).substring(0, 10),
    startTime: '00:00',
    endDate: app.util.formatTime(new Date()).substring(0, 10),
    endTime: '23:59'
  },
  onShow(){
    this.isReturnIndex()
  },
  onLoad() {
    this.getList()
  },
  bindPickerChange(e) {                                          //切换设备
    if (!app.nowCodeList.length) {
      return
    }
    app.nowCodeId = app.nowCodeList[e.detail.value].id
    this.isDeltel()
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
    this.setData({
      indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'id', 'name'),
      model: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'id', 'model')
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
  isReturnIndex() {                      //返回位置页判断
    let filterList = app.nowCodeList.filter(obj => obj.id == app.nowCodeId)
    if (filterList.length === 0) {
      this.isDeltel()
    } else {
      if (filterList[0].name !== this.data.indexs) {
        this.isDeltel()
      }
    }
    this.setArray()
  },
  getList(){
    app.request({
      url: `${app.api.getHistory}${app.nowCodeId}/positions`,
      method: 'GET',
      data: {
        type:'group'
      }
    }).then(res => {
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
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