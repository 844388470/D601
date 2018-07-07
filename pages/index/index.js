// pages/find/find.js

const app = getApp();
Page({
  data: {
    markerDatas: [],
    latitude: 39.939944, 
    longitude: 116.389321,
    array: [],
    indexs: '',
    setTime: null,
    setInterTime:30000,
    text:{
      message:'未定位,请选择设备',
      date:'',
      address:'',
      timeFn:''
    }
  },
  onLoad(){
    
  },
  getIndex(){                                                   //获取位置
    app.request({
      url: app.api.getIndex,
      method: 'GET',
      data: {
        'deviceIdStr': '5da73384-e835-445a-a7a4-85ede4de1e9c',
      }
    }).then(res => {
      app.nowCodeList = res.responseData.rsList || []
      this.setArray()
      let list = app.nowCodeList.filter(res => res.imei===app.nowCodeId)
      if(list.length){
        app.mapApi([{ longitude:list[0].lng, latitude:list[0].lat}]).then(res => {
          this.setData({
            markerDatas: [{ latitude: list[0].lat, longitude: list[0].lng }],
            latitude: list[0].lat,
            longitude: list[0].lng,
            text: {
              message: '最后定位',
              date: app.util.formatTime(list[0].posTime),
              address: res[0],
              timeFn: app.util.timeFn(list[0].posTime, new Date())
            }
          })
        })
      }else{
        this.setData({
          markerDatas: [],
          latitude: 39.939944,
          longitude: 116.389321,
          text: {
            message: app.nowCodeId?'设备已移除,请重新选择':'未选择设备',
            date: '',
            address: '',
            timeFn: ''
          }
        })
        this.deleteTimeout()
        app.nowCodeId = ''
      }
      this.setSelectName()

    }).catch(err => {
      console.log(err)
    })
  },
  bindPickerChange(e){                                          //切换设备
    if (!app.nowCodeList.length){
      return
    }
    app.nowCodeId = app.nowCodeList[e.detail.value].imei
    this.deleteTimeout()
    this.getIndex()
    this.addTimeout()
  },
  setArray(){                                                   //设置设备
    this.setData({
      array: app.nowCodeList
    })
  },
  setSelectName(){                                                  //设置当前设备的名称
    this.setData({
      indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'imei','imei')
    })
  },
  addTimeout(log){
    this.data.settime = setInterval(()=>{
      this.getIndex()
    }, this.data.setInterTime)
  },
  deleteTimeout(){
    clearInterval(this.data.settime)
    this.data.settime = null
  },
  onPullDownRefresh: function () {
    console.log("下拉")
  },
  bindregionchange(){
    console.log(9999)
  },
  onReachBottom: function () {
    console.log("上拉")
  },
  onShareAppMessage: function () {

  },
  onShow(){
    this.getIndex()
    this.addTimeout()
  },
  onHide(){
    this.deleteTimeout()
  }
})