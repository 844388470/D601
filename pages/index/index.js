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
    setTimeFn: null,
    setInterTime:30000,
    text:{
      message:'未定位,请选择设备',
      date:'',
      address:'',
      timeFn:''
    }
  },
  onLoad(){
    this.getIndex()
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
      url: `${app.api.getIndex}${app.nowCodeId}/latest`,
      method: 'GET'
    }).then(data => {
      let list = data
      if (list.longitude){
        app.mapApi([{ longitude: list.longitude, latitude: list.latitude}]).then(res => {
          this.setData({
            markerDatas: [{ latitude: list.latitude, longitude: list.longitude, iconPath: '../../image/map_index.png', width: 40, height: 50, anchor: { x: 0.5, y: 0.7 } }],
            latitude: list.latitude,
            longitude: list.longitude,
            text: {
              message: '最后定位',
              date: list.eventTime,
              address: list.latitude == '0' && list.longitude=='0'?'无法解析地址' : res[0],
              timeFn: app.util.timeFn(list.eventTime, new Date())
            }
          })
        })
      }else{
        wx.showToast({ title: '电信返回为空', icon: 'none', duration: 2000 })
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
    app.nowCodeId = app.nowCodeList[e.detail.value].id
    this.setSelectName()
    this.getIndex()
  },
  setArray(){                                                   //设置设备
    this.setData({
      array: app.nowCodeList
    })
  },
  setSelectName(){                                                  //设置当前设备的名称
    this.setData({
      indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'id','name')
    })
  },
  addTimeout(){
    this.data.settime = setInterval(()=>{
      this.getIndex()
    }, this.data.setInterTime)
  },
  deleteTimeout(){
    clearInterval(this.data.settime)
    this.data.settime = null
  },
  addTimeoutFn() {                  //时差 开始定时器
    this.data.settimeFn = setInterval(() => {
      this.setTimeFn()
    }, this.data.setInterTime)
  },
  deleteTimeoutFn() {               //时差 取消定时器
    this.data.settimeFn = null
  },
  setTimeFn(){                      //时差 设置时差
    this.setData({
      timeFn: app.util.timeFn(this.data.text.date, new Date())
    })
  },
  isDeltel(){                       //当前设备被删除后
    if (app.nowCodeId=='-1'){
      app.nowCodeId=app.nowCodeList[0].id
      this.setSelectName()
      this.getIndex()
      // this.setData({
      //   indexs: '',
      //   markerDatas:[],
      //   text: {
      //     message: '设备已删除',
      //     date: '',
      //     address: '',
      //     timeFn: ''
      //   }
      // })

    }
  },
  onPullDownRefresh: function () {
    console.log("下拉")
  },
  bindregionchange(){
   
  },
  onReachBottom: function () {
    console.log("上拉")
  },
  
  onShow() {
    this.setArray()
    this.setSelectName()
    this.isDeltel()
  },
  onHide(){
    this.deleteTimeout()
  }
})