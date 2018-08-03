// pages/find/find.js

const app = getApp();
Page({
  data: {
    isFirst:true,
    markerDatas: [],
    latitude: 39.939944, 
    longitude: 116.389321,
    array: [],
    indexs: '',
    setTime: null,
    setTimeFn:null,
    setTimeTrack:null,
    setInterTime:20000,
    text:{
      message:'未定位,请选择设备',
      date:'',
      address:'',
      timeFn:''
    },
    timeSelect:[
      { time: '15min', second: '900' },
      { time: '30min', second: '1800' },
      { time: '45min', second: '2700' },
      { time: '60min', second: '3600' },
      { time: '75min', second: '4500' },
      { time: '90min', second: '5400' },
      { time: '105min', second: '6300' },
      { time: '120min', second: '7200' }
    ],
    starttime:'',                     //开始追踪时间
    duration:'',                      //持续时长
    countdowns:'',                    //追踪模式倒计时显示
    sosState:false,
  },
  onLoad(){
    this.isDeltel()
    this.setSelectName()
  },
  getIndex(){                                                   //获取位置
    this.deleteTimeoutFn()
    app.request({
      url: `${app.api.getIndex}${app.nowCodeId}/latest`,
      method: 'GET'
    }).then(data => {
      let list = data
      if (list.longitude && list.latitude){
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
          this.addTimeoutFn()
        })
      }else{
        app.show('电信返回为空')
        return Promise.reject()
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
  getList() {                                                   //获取设备列表
    app.request({
      url: app.api.getEquList,
      method: 'GET'
    }).then((arr) => {
      if (arr.length) {
        app.nowCodeList = arr

      } else {
        wx.reLaunch({
          url: '../../equipment/addEqu/addEqu'
        })
      }
    }).catch((err) => {

    })
  },
  bindPickerChange(e){                                          //切换设备
    if (!app.nowCodeList.length){
      return
    }
    this.endTrackMode()
    app.nowCodeId = app.nowCodeList[e.detail.value].id
    this.isDeltel()
  },
  setArray(){                                                   //设置设备列表
    this.setData({
      array: app.nowCodeList
    })
  },
  setSelectName(){                                              //设置当前设备的名称
    this.setData({
      indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'id','name')
    })
  },
  addTimeout(){                                                 //启动自动刷新位置
    this.getIndex()
    this.data.settime = setInterval(()=>{
      this.getIndex()
    }, this.data.setInterTime)
  },
  deleteTimeout() {                                             //停止自动刷新位置
    clearInterval(this.data.settime)
    this.data.settime = null
  },
  addTimeoutFn() {                  //时差 开始定时器
    this.data.settimeFn = setInterval(() => {
      this.setTimeFn()
    }, 10000)
  },
  deleteTimeoutFn() {               //时差 取消定时器
    clearInterval(this.data.settimeFn)
    this.data.settimeFn = null
  },
  setTimeFn(){                      //时差 设置时差
    this.setData({
      text:{
        ...this.data.text,
        timeFn: app.util.timeFn(this.data.text.date, new Date())
      }
    })
  },
  isDeltel(){                       //判断当前设备是否存在
    this.endTrackMode()
    if (app.nowCodeList.filter(obj => obj.id == app.nowCodeId).length===0){
      app.nowCodeId=app.nowCodeList[0].id
      this.setSelectName()
      this.isSos()
      this.isCurrentEquIsTrack()
      // this.getIndex()
    }else{
      this.setSelectName()
      this.isSos()
      this.isCurrentEquIsTrack()
    }
  },
  isSos() {                         //判断当前设备是否处于SOS模式
    // if(true){
    //   wx.switchTab({
    //     url: '/pages/index/index'
    //   })
    // }
    if (app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].local_mode == 3) {
      this.setData({
        sosState:true
      })
    }else{
      this.setData({
        sosState: false
      })
    }
    this.getIndex()
  },
  isCurrentEquIsTrack(){            //判断当前设备是否处于追踪模式
    if (app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].startTime){
      this.startTrackMode()
    }else{
      this.getIndex()
      this.endTrackMode()
    }
  },
  countdownSelect(e){               //选择追踪时间
    app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].startTime = new Date()
    app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].duration = this.data.timeSelect[e.detail.value].second
    this.startTrackMode()
  },
  startTrackMode(){                 //开始追踪模式
    this.setData({
      starttime: app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].startTime,
      duration: app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].duration
    })
    this.startCountdown()
    this.addTimeout()
  },
  isEndTrackMode(){                 //是否确认停止追踪模式
    wx.showModal({
      title: '警告',
      content: '确认停止追踪模式吗？',
      success: (res) => {
        if (res.confirm) {
          this.endTrackMode()
        }
      }
    })
  },
  endTrackMode() {                  //结束追踪模式
    this.setData({
      starttime: '',
      duration: '',
      countdowns: '',
    })
    this.endCountdown()
    this.deleteTimeout()
  },
  startCountdown(){                     //开启倒计时
    this.countdownEvent()
    this.data.setTimeTrack = setInterval(() => {
      this.countdownEvent()
    },1000)
  },
  countdownEvent(){                     //倒计时事件
    let name=''
    const time = parseInt((new Date().getTime() - new Date(this.data.starttime).getTime())/1000)
    if (!this.data.starttime){
      app.show('无启动时间')
      return 
    }
    if (time == this.data.duration || time < this.data.duration){
      const timeFn = Number(this.data.duration-time)
      if (timeFn / 60 > 1) {
        name = `${parseInt(timeFn / 60)}min`
      } else {
        name = `${timeFn}s`
      }
      this.setData({
        countdowns: name
      })
    }else{
      this.endTrackMode()
    }
  },
  endCountdown(){                       //结束倒计时
    clearInterval(this.data.setTimeTrack)
    this.data.setTimeTrack = null
    this.setData({
      countdowns:''
    })
  },
  onPullDownRefresh: function () {
    console.log("下拉")
  },
  onReachBottom: function () {
    console.log("上拉")
  },
  isReturnIndex(){                      //返回位置页判断
    if (app.nowCodeList.filter(obj => obj.id == app.nowCodeId).length === 0) {
      this.isDeltel()
    }else{
      if (app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].name!==this.data.indexs){
        this.isDeltel()
      }
    }
    this.setArray()
  },
  onShow() {
    this.isReturnIndex()
  },
  onHide(){
    
  }
})