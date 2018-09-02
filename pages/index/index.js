// pages/find/find.js
import io from '../../socketIo/socket.io-mp.js'
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
      { time: '15min', second: '15' },
      { time: '30min', second: '30' },
      { time: '45min', second: '45' },
      { time: '60min', second: '60' },
      { time: '75min', second: '75' },
      { time: '90min', second: '90' },
      { time: '105min', second: '105' },
      { time: '120min', second: '120' }
    ],
    starttime:'',                     //开始追踪时间
    duration:'',                      //持续时长
    countdowns:'',                    //追踪模式倒计时显示
    sosState:false,
  },
  onLoad(){
    this.startSocket()
    this.getListTime()
  },
  getListTime(){
    setInterval(() => {
      this.getList()
    }, 60000)
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
              date: app.util.formatTime(list.eventTime),
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
        markerDatas:[],
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
        this.isDeltel()
      } else {
        app.nowCodeList = arr
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
    // this.getIndex()
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
      if (!app.nowCodeList.length){
        wx.reLaunch({
          url: '../equipment/addEqu/addEqu'
        })
      }
      app.nowCodeId=app.nowCodeList[0].id
      this.setSelectName()
      this.isSos()
    }else{
      this.setSelectName()
      this.isSos()
    }
  },
  isSos() {                         //判断当前设备是否处于什么模式
    // if(true){
    //   wx.switchTab({
    //     url: '/pages/index/index'
    //   })
    // }
    if (app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].sos_mode == 1) {
      this.endTrackMode()
      this.setData({
        sosState:true
      })
    } else if (app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].track_mode == 1) {
      this.startTrackMode()
      this.setData({
        sosState: false
      })
    }else {
      this.endTrackMode()
      this.setData({
        sosState: false
      })
    }
    this.getIndex()
  },
  countdownSelect(e){               //选择追踪时间
    // app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].startTime = new Date()
    // app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].duration = this.data.timeSelect[e.detail.value].second
    app.showLoading('启动中')
    app.request({
      url: `${app.api.setEqu}${app.nowCodeId}`,
      method: 'put',
      data: {
        track_mode: 1,
        track_mode_duration: this.data.timeSelect[e.detail.value].second
      }
    }).then(res => {
      wx.hideLoading()
      this.getList()
    }).catch(err => {
      wx.hideLoading()
      app.show('启动失败')
    })
  },
  startTrackMode(){                 //开始追踪模式
    this.setData({
      starttime: app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].track_mode_start_date,
      duration: app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].track_mode_duration
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
          app.showLoading('停止中')
          app.request({
            url: `${app.api.setEqu}${app.nowCodeId}`,
            method: 'put',
            data: {
              track_mode: 0,
              track_mode_duration: 0
            }
          }).then(res => {
            wx.hideLoading()
            this.getList()
          }).catch(err => {
            wx.hideLoading()
            app.show('停止失败')
          })
        }
      }
    })
  },
  endTrackMode() {                  //结束追踪模式
    this.setData({
      starttime: app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].track_mode_start_date,
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
    const time = parseInt((new Date().getTime() - new Date(this.data.starttime.replace(/-/g, "/")).getTime())/1000)
    const miao = Number(this.data.duration)*60
    // if (!this.data.starttime){
    //   app.show('无启动时间')
    //   return 
    // }
    if (time < miao){
      const timeFn = Number(miao-time)
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
  startSocket(){                        //开始监听Socket
    let socket = io(`${app.api.api}`)

    socket.on('connect', ()=> {
      console.log('已连接');
      this.getList()
    });

    socket.on('connecting', function () {
      console.log('连接中');
    });

    socket.on('connected', function () {
      console.log('connected');
    });

    socket.on('asd', function () {
      console.log('asd');
    });

    socket.on('disconnect', function () {
      console.log("已断开");
    });

    socket.on('connect_failed', function () {
      console.log('连接失败');
    });

    socket.on('error', function () {
      console.log('发生错误');
    });

    socket.on('reconnecting', function () {
      console.log('正在重连');
    });

    socket.on('reconnect', function () {
      console.log('重连成功');
    });

    socket.on('reconnect_failed', function () {
      console.log('重连失败');
    });

    socket.on('messages', (data) => {
      const  n  = data
      if (JSON.stringify(data) == "{}"){
        
      }else{
        if (app.nowCodeList.filter(obj => obj.id == data.did)){
          if (data.type == 2 || data.type == 3 || data.type == 4 || data.type == 5 ) {
            app.show(data.message)
          }else{
            // app.show(data.message)
          }
        }
      }
      // app.messageState=true
      // console.log(n)
      // this.getList()
    });

    socket.on('D606-Warning', (data) => {
      const n = JSON.parse(data)
      console.log(data)
      // console.log()
      app.show(`设备${n.data.imei.substr(-4)}被打开了`)
    });

    // wx.connectSocket({
    //   url: `${app.api.api}`
    // })
    // wx.onSocketMessage((res)=>{
    //   console.log(res)
    // })
  },
  onShow() {
    this.isReturnIndex()
  },
  onHide(){
    
  }
})