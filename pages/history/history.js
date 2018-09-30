
const app=getApp();
Page({
  data:{
    array:[],
    indexs: '',
    model:'',
    startDate: app.util.formatTime(new Date()).substring(0, 10),
    startTime: '00:00',
    endDate: app.util.formatTime(new Date()).substring(0, 10),
    endTime: '23:59',
    setTime:null,
    page:1,
  },
  onShow() {
    this.setSelectName()
    // this.isReturnIndex()
    // this.startTime()
  },
  onHide() {
    // this.endTime()
  },
  onLoad() {
    // this.getList()
    // this.startSocket()
  },

  bindPickerChange(e) {                                          //切换设备
    if (!app.nowCodeList.length) {
      return
    }
    app.nowCodeId = app.nowCodeList[e.detail.value].deviceNo
    this.setSelectName()
  },

  bindStartDate(e){
    this.setData({
      startDate: app.util.formatTime(e.detail.value).substring(0, 10)
    })
  },

  bindStartTime(e) {
    this.setData({
      startTime: `${e.detail.value}`
    })
  },

  bindEndDate(e) {
    this.setData({
      endDate: app.util.formatTime(e.detail.value).substring(0, 10)
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
      array: app.nowCodeList,
      indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'deviceNo', 'deviceNickname'),
      // model: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'id', 'model').substr(0, 4),
      // list: [],
      // page: 1
    })
  },

  // isDeltel() {                       //判断当前设备是否存在
  //   if (app.nowCodeList.filter(obj => obj.id == app.nowCodeId).length === 0) {
  //     if (!app.nowCodeList.length) {
  //       wx.reLaunch({
  //         url: '../equipment/addEqu/addEqu'
  //       })
  //     }
  //     app.nowCodeId = app.nowCodeList[0].id
  //     this.setSelectName()
  //     if (this.data.model !== 'd603' && this.data.model !== 'D603' && this.data.model !== 'd606' && this.data.model !== 'D606'){
  //       this.getList()
  //     }
  //   } else {
  //     this.setSelectName()
  //     if (this.data.model !== 'd603' && this.data.model !== 'D603' && this.data.model !== 'd606' && this.data.model !== 'D606') {
  //       this.getList()
  //     }
  //   }
  // },

  // isReturnIndex() {                      //返回位置页判断
  //   let filterList = app.nowCodeList.filter(obj => obj.id == app.nowCodeId)
  //   if (filterList.length === 0) {
  //     this.isDeltel()
  //   } else {
  //     if (filterList[0].name !== this.data.indexs) {
  //       this.isDeltel()
  //     }
  //   }
  //   this.setArray()
  // },

  // getList(){
  //   const time = new Date(new Date().getTime()-(this.data.page*2-2)*1000*60*60*24)
  //   const timeOut = new Date(new Date().getTime() - (this.data.page*2-1) * 1000 * 60 * 60 * 24)
  //   const startTime = [timeOut.getFullYear(), timeOut.getMonth() + 1, timeOut.getDate()].map(_ => _.toString()[1] ? _.toString() : '0' + _.toString()).join('-')
  //   const endTime = [time.getFullYear(), time.getMonth() + 1, time.getDate()].map(_ => _.toString()[1] ? _.toString() : '0' + _.toString()).join('-')
  //   app.showLoading('加载中')
  //   app.request({
  //     url: `${app.api.getHistory}${app.nowCodeId}/positions`,
  //     method: 'GET',
  //     data: {
  //       startTime: startTime + ' 00:00:01',
  //       endTime: endTime + ' 23:59:59',
  //       type:'group'
  //     }
  //   }).then(res => {
  //     let list=[]
  //     let lalong=[]
  //     list.push( {
  //         time: endTime + ' ' +  app.util.timeWeek(endTime),
  //         list:[]
  //       },{
  //         time: startTime + ' ' + app.util.timeWeek(startTime),
  //         list: []
  //       })
  //     for(let i in res){
  //       // res[i].start.eventTime = res[i].end.eventTime='2018-08-31 13:15:15'
  //       const filterL = list.filter(obj => obj.time.substr(0, 10) == res[i].start.eventTime.substr(0, 10))
  //       const obj=res[i]
  //       if (filterL.length){
  //         const juli = this.distances([{ latitude: obj.start.latitude, longitude: obj.start.longitude }, { latitude: obj.end.latitude, longitude: obj.end.longitude }])
  //         filterL[0].list.push({
  //           ...obj,
  //           startAddress: '',
  //           endAddress:'',
  //           juli: (juli / 1000).toFixed(2),
  //           bushu:(juli / 0.75 / 1000).toFixed(2),
  //           kalu: (juli / 0.75 / 1000 / 2 ).toFixed(2),
  //           time: obj.start.eventTime.substr(11,8) + '-' + obj.end.eventTime.substr(11,8)
  //         })
  //         lalong.push({
  //           longitude: obj.start.longitude,
  //           latitude: obj.start.latitude,
  //         })
  //         lalong.push({
  //           longitude: obj.end.longitude,
  //           latitude: obj.end.latitude,
  //         })
  //       }
  //     }

  //     app.mapApi(lalong).then(ress => {
  //       for (let i in list[0].list){
  //         list[0].list[i].startAddress=ress[i*2]
  //         list[0].list[i].endAddress = ress[i*2+1]
  //       }
  //       for (let i in list[1].list) {
  //         list[1].list[i].startAddress = ress[list[0].list.length*2+i*2]
  //         list[1].list[i].endAddress = ress[list[0].list.length * 2+i*2+1]
  //       }
  //       if(this.data.page==1){
  //         this.setData({
  //           list:list
  //         })
  //       }else{
  //         this.setData({
  //           list: [
  //             ...this.data.list,
  //             ...list
  //           ]
  //         })
  //       }
  //       app.historyState = false
  //       wx.hideLoading()
  //     })
  //   }).catch(err=>{
  //     // if(this.data.page!==1){
  //       this.setData({
  //         page:this.data.page-1
  //       })
  //     // }
  //     wx.hideLoading()
  //   })
  // },

  // goMap(e){
  //   const obj = this.data.list[e.target.dataset.i].list[e.target.dataset.j]
  //   wx.navigateTo({
  //     url: `../map/mapHistory/mapHistory?data=${JSON.stringify([obj.start, ...obj.positions,obj.end])}`
  //   })
  // },

  // nextMore(){
  //   this.setData({
  //     page: this.data.page + 1
  //   })
  //   this.getList()
  // },

  goChaXun(){
    if (!app.nowCodeId){
      wx.showToast({
        title: '无设备',
        icon: 'none'
      })
      return 
    }
    if (new Date(`${this.data.startDate} ${this.data.startTime}:00`).getTime() > new Date(`${this.data.endDate} ${this.data.endTime}:59`).getTime()){
      wx.showToast({
        title: '开始时间不得大于结束时间',
        icon: 'none'
      })
      return 
    }
    wx.navigateTo({
      url: `../map/map?startDate=${this.data.startDate}&endDate=${this.data.endDate}&startTime=${this.data.startTime}&endTime=${this.data.endTime}&id=${app.nowCodeId}`
    })
  },

  // distances(list) {
  //   if (!list[0].latitude || !list[0].longitude || !list[1].latitude || !list[1].longitude){
  //     return 0
  //   } 
  //   var lat = [list[0].latitude, list[1].latitude]
  //   var lng = [list[0].longitude, list[1].longitude]
  //   var R = 6378137;
  //   var dLat = (lat[1] - lat[0]) * Math.PI / 180;
  //   var dLng = (lng[1] - lng[0]) * Math.PI / 180;
  //   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat[0] * Math.PI / 180) * Math.cos(lat[1] * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   var d = R * c;
  //   return Math.round(d);
  // },

  // startTime() {                        //监听改变
  //   this.data.setTime = setInterval(() => {
  //     if (app.historyState) {
  //       this.isDeltel()
  //     }
  //   }, 3000)
  // },

  // endTime() {
  //   clearInterval(this.data.setTime)
  //   this.data.setTime = null
  // }
})