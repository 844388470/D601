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
    setTimeTrack: null,
    setTimeList:null,
    setInterTime:20000,
    text:{
      message:'未定位,请选择设备',
      date:'',
      address:'',
      timeFn:'',
      isWifi:'',
      batteryVol:'',
    },
    timeSelect:[
      { time: '持续15min', second: '15' },
      { time: '持续30min', second: '30' },
      { time: '持续45min', second: '45' },
      { time: '持续60min', second: '60' },
      { time: '持续75min', second: '75' },
      { time: '持续90min', second: '90' },
      { time: '持续105min', second: '105' },
      { time: '持续120min', second: '120' }
    ],
    starttime:'',                     //开始追踪时间
    duration:'',                      //持续时长
    countdowns:'',                    //追踪模式倒计时显示
    sosState:false,
    mode:'',
  },
  onLoad(){
    this.startSocket()
    
  },
  startListTime() {                                           //开启定时获取列表
    this.data.setTimeList = setInterval(() => {
      this.getList()
    }, 60000)
  },
  endListTime(){                                              //关闭定时获取列表
    clearInterval(this.data.setTimeList)
    this.data.setTimeList = null
  },
  getIndex(){                                                   //获取位置
    this.deleteTimeoutFn()
    app.showLoading('获取位置')
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
              timeFn: app.util.timeFn(list.eventTime, new Date()),
              isWifi: list.wifiGpsFlag == 1 ? 'GPS' : list.wifiGpsFlag == 2 ? 'WIFI' : list.wifiGpsFlag === 0 ? '基站':'',
              batteryVol: `剩余电量:${list.batteryVol || 0}%`
            }
          })
          this.addTimeoutFn()
          app.hideLoading()
        })
      }else{
        app.show('经纬度为空，获取地址失败')
        this.setData({
          markerDatas: [],
          text: {
            message: '获取地址失败',
            date: '',
            address: '',
            timeFn: '',
            isWifi: '',
            batteryVol: ''
          }
        })
      }
    }).catch(err => {
      if (err =='device is deleted from telecom'){
        app.show('该设备已在电信上被移除')
      } else if (err ='device not found or device_id is null'){
        app.show('该设备未在电信上注册成功')
      }
      this.setData({
        markerDatas:[],
        text: {
          message: '获取地址失败',
          date: '',
          address: '',
          timeFn: '',
          isWifi:'',
          batteryVol:''
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
        this.setArray()
        this.isDeltel()
      } else {
        app.nowCodeList = arr
        this.setArray()
        wx.reLaunch({
          url: '../equipment/addEqu/addEqu'
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
      this.getList()
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
    // if (app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].sos_mode == 1) {
    //   this.endTrackMode()
    //   this.setData({
    //     sosState:true
    //   })
    // } else 
    if (app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].track_mode == 1) {
      this.startTrackMode()
      this.setData({
        sosState: false,
        mode: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'id', 'model').substr(0, 4)
      })
    }else {
      this.endTrackMode()
      this.setData({
        sosState: false,
        mode: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'id', 'model').substr(0, 4)
      })
    }
    this.getIndex()
  },
  countdownSelect(e){               //选择追踪时间
    // app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].startTime = new Date()
    // app.nowCodeList.filter(obj => obj.id == app.nowCodeId)[0].duration = this.data.timeSelect[e.detail.value].second
    app.showLoading('启动中')
    app.request({
      url: `${app.api.setEqu}${app.nowCodeId}/commands`,
      method: 'post',
      data: {
        f:'6',
        d: `1,${this.data.timeSelect[e.detail.value].second}`
      }
    }).then(res => {
      app.show('指令已下发,等待设备响应')
      this.getList()
    }).catch(err => {
      if (err && (err == 'Can not send same command twice')) {
        app.show('等待设备响应中')
      } else {
        app.show('启动失败')
      }
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
            url: `${app.api.setEqu}${app.nowCodeId}/commands`,
            method: 'POST',
            data: {
              f:'6',
              d:'0,0'
            }
          }).then(res => {
            app.show('指令已下发,等待设备响应')
            this.getList()
          }).catch(err => {
            if (err && (err == 'Can not send same command twice')) {
              app.show('等待设备响应中')
            } else {
              app.show('停止失败')
            }
          })
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
  setmode(){
    // const state = app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'id', 'model').substr(0, 4)
    // let clas=''
    // if (state !== 'D603' && state !== 'd603'){
    //   clas = true
    // }else{
    //   clas = false
    // }
    // this.setData({
    //   mode: clas
    // })
    // console.log(this.data.mode)
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
      console.log('已连接',new Date());
      // this.getList()
    });

    socket.on('connecting', function () {
      console.log('连接中', new Date());
    });

    socket.on('connected', function () {
      console.log('connected');
    });
    
    socket.on('disconnect', function () {
      console.log("已断开", new Date());
    });

    socket.on('connect_failed', function () {
      console.log('连接失败', new Date());
    });

    socket.on('error', function () {
      console.log('发生错误', new Date());
    });

    socket.on('reconnecting', function () {
      console.log('正在重连', new Date());
    });

    socket.on('reconnect', function () {
      console.log('重连成功', new Date());
    });

    socket.on('reconnect_failed', function () {
      console.log('重连失败', new Date());
    });

    socket.on('messages', (data) => {
      const  n  = data
      if (JSON.stringify(data) !== "{}"){
        if (app.nowCodeList.filter(obj => obj.id == data.did).length){
          if ([0,1,2,3,4,5,6,7,8,9,10].indexOf(data.type)!==-1) {
            try{
              wx.showToast({
                title: JSON.parse(data.message).content,
                icon: 'none',
                duration: 3000
              })
            }catch(err){
              wx.showToast({
                title: data.message,
                icon: 'none',
                duration: 3000
              })
            }
            
          }
        }
      }
      // app.messageState=true
      // console.log(n)
      // this.getList()
    });

    // socket.on('D606-Warning', (data) => {
    //   const n = JSON.parse(data)
    //   console.log(data)
    //   // console.log()
    //   app.show(`设备${n.data.imei.substr(-4)}被打开了`)
    // });

    // wx.connectSocket({
    //   url: `${app.api.api}`
    // })
    // wx.onSocketMessage((res)=>{
    //   console.log(res)
    // })
  },
  onShow() {
    this.isReturnIndex()
    this.startListTime()
  },
  onHide(){
    this.endListTime()
  }
})