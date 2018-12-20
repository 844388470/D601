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
    setInterTime:60000,
    text:{
      message:'获取失败',
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
    mode:'',
  },
  onLoad(){
    
  },

  getIndex(){                                                   //获取位置
    this.deleteTimeoutFn()
    this.deleteTimeout()
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      openid: wx.getStorageSync('openid'),
      deviceNo: app.nowCodeId,
    }
    app.showLoading('获取位置')
    app.request({
      url: app.api.getIndex,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      app.hideLoading()
      if (!res.longitude){
        res.longitude = res.lontitude
      }
      if (res.code === 0 && res.longitude && res.latitude) {
        app.mapApi([{ longitude: res.longitude, latitude: res.latitude }]).then(ress => {
          this.deleteTimeoutFn()
          this.deleteTimeout()
          this.setData({
            markerDatas: [{ latitude: res.latitude, longitude: res.longitude, iconPath: '../../image/map_index.png', width: 40, height: 50, anchor: { x: 0.5, y: 0.7 } }],
            latitude: res.latitude,
            longitude: res.longitude,
            text: {
              message: '最后定位',
              date: res.updateTime,
              address: res.latitude == '0' && res.longitude == '0' ? '无法解析地址' : ress[0],
              timeFn: app.util.timeFn(res.updateTime, new Date())
            }
          })
          this.addTimeoutFn()
          this.addTimeout()
        })
      } else {
        return Promise.reject(666)
      }
    }).catch((err) => {
      app.hideLoading()
      if(err==666){
        app.show('GPS定位中...  请确保设备开机并放置在无遮挡区域')
      }else{
        app.show('获取失败,请重试')
      }
      this.setData({
        markerDatas: [],
        latitude: 39.939944,
        longitude: 116.389321,
        text: {
          message: '获取失败',
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
    app.nowCodeId = app.nowCodeList[e.detail.value].deviceNo
    this.setSelectName()
    this.getIndex()
  },
  setArray(){                                                   //设置设备列表
    this.setData({
      array: app.nowCodeList
    })
  },
  setSelectName(){                                              //设置当前设备的名称
    this.setData({
      indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'deviceNo', 'deviceNo').substr(-4),
      array: app.nowCodeList
    })
  },
  addTimeout(){                                                 //启动自动刷新位置
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
  onShow() {
    this.getIndex()
    this.setSelectName()
  },
  onHide(){
    this.deleteTimeoutFn()
    this.deleteTimeout()
  }
})