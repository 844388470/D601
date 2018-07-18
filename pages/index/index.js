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
    if (!app.nowCodeList.length || !app.nowCodeId){
      this.deleteTimeout()
      this.setData({
        text: {
          message: '无设备',
          date: '',
          address: '',
          timeFn: ''
        }
      })
      return 
    }
    app.request({
      url: app.api.getIndex,
      method: 'GET',
      data: {
        'deviceIdStr': app.nowCodeId,
      }
    }).then(data => {
      let list = data.responseData.rsList
      if(list.length){
        app.mapApi([{ longitude: list[0].longitude, latitude: list[0].latitude}]).then(res => {
          console.log(res)
          this.setData({
            markerDatas: [{ latitude: list[0].latitude, longitude: list[0].longitude }],
            latitude: list[0].latitude,
            longitude: list[0].longitude,
            text: {
              message: '最后定位',
              date: app.util.formatTime(list[0].eventTime),
              address: list[0].latitude == '0' && list[0].longitude=='0'?'无法解析地址' : res[0],
              timeFn: app.util.timeFn(list[0].eventTime, new Date())
            }
          })
        })
      }else{
        this.setData({
          text: {
            message: '获取地址失败',
            date: '',
            address: '',
            timeFn: ''
          }
        })
      }
    }).catch(err => {
      this.setData({
        text: {
          message: '获取地址失败',
          date: '',
          address: '',
          timeFn: ''
        }
      })
    })
  },
  bindPickerChange(e){                                          //切换设备
    if (!app.nowCodeList.length){
      return
    }
    app.nowCodeId = app.nowCodeList[e.detail.value].device_id
    this.setSelectName()
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
      indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'device_id','imei')
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
    this.setSelectName()
    this.setArray()
    this.getIndex()
    this.addTimeout()
  },
  onHide(){
    this.deleteTimeout()
  }
})