// pages/equipment/positionMode/positionMode.js
const app=getApp();
let list=[[],[],[],[]]
for(let i=0;i<31;i++){
  list[0].push({
    id:i,
    name:i+'天'
  })
}
for (let i = 0; i < 24; i++) {
  list[1].push({
    id: i,
    name: i + '小时'
  })
}
for (let i = 0; i < 59; i++) {
  list[2].push({
    id: i,
    name: i + '分钟'
  })
}
for (let i = 0; i < 59; i++) {
  list[3].push({
    id: i,
    name: i + '秒'
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin:false,
    active:'',
    time:'',
    timeValue:'',
    listValue:[0,0,0,0],
    list: list,
  },

  bindMultiPickerChange: function (e) {
    if (!this.data.isAdmin) {
      app.show('无修改权限')
      this.setData({
        listValue: this.data.listValue,
        timeValue: this.filterTime(this.data.listValue, 'arrFilStr'),
      })
      return
    }
    if (this.data.active=='2'){
      this.editMode(2, e.detail.value)
    }else{
      this.setData({
        listValue: e.detail.value,
        timeValue: this.filterTime(e.detail.value,'arrFilStr'),
      })
    }
    
  },

  onLoad: function (options) {
    this.setActive()
    this.isAdmin()
  },

  isAdmin() {
    if (app.nowCodeList[app.equIndex].admin_id == app.globalData.userInfo.id) {
      this.setData({
        isAdmin: true
      })
    }
  },

  setActive(){
    this.setData({
      active: app.nowCodeList[app.equIndex].locate_mode,
      time: this.filterTime(app.nowCodeList[app.equIndex].locate_time,'numFilStr'),
      timeValue: this.filterTime(app.nowCodeList[app.equIndex].locate_time, 'numFilStr'),
      listValue: this.filterTime(app.nowCodeList[app.equIndex].locate_time, 'numFilArr')
    })
  },

  filterTime(data,types='str'){
    if(types=='arrFilStr'){
      if (data[0] + data[1] + data[2] + data[3]==0){
        return '不上传'
      }
      return `${data[0]}天${data[1]}小时${data[2]}分钟${data[3]}秒/次`
    } else if (types == 'arrFilNum'){
      return data[0] * 86400 + data[1] *3600  + data[2] * 60 + data[3]
    } else if(types == 'numFilArr'){
      if(!data){
        return [0,0,0,0]
      }
      let d,h,m,s
      d = Math.floor(data / 86400)
      h = Math.floor(data % 86400 / 3600)
      m = Math.floor(data % 3600  / 60)
      s = data % 60
      return [Number(d), Number(h), Number(m), Number(s)]
    } else if (types == 'numFilStr') {
      if (!data) {
        return '不上传'
      }
      let d, h, m, s
      d = Math.floor(data / 86400)
      h = Math.floor(data % 86400 / 3600)
      m = Math.floor(data % 3600 / 60)
      s = data % 60
      return `${d}天${h}小时${m}分钟${s}秒/次`
    }
  },

  setThreeMode(){
    if (!this.data.isAdmin) {
      app.show('无权限')
      return
    }
    if (app.nowCodeList[app.equIndex].locate_mode === 2) {
      return
    }
    this.editMode(2)
  },

  setOneMode(){
    if (!this.data.isAdmin) {
      app.show('无权限')
      return
    }
    if (app.nowCodeList[app.equIndex].locate_mode===0){
      return
    }
    this.editMode(0)
  },

  editMode(value,listValue){
    app.showLoading('修改中')
    app.request({
      url: `${app.api.setEqu}${app.nowCodeList[app.equIndex].id}/commands`,
      method: 'POST',
      data: {
        f:'5',
        d: value == 2 ? `${value},${this.filterTime(listValue || this.data.listValue, 'arrFilNum')}`:`${value}`
      }
    }).then(res => {
      app.show('指令已下发,等待设备响应')
      if (listValue){
        this.setData({
          listValue: listValue,
          timeValue: this.filterTime(listValue, 'arrFilStr'),
        })
      }
    }).catch(err => {
      if (err && (err =='Can not send same command twice')){
        app.show('需等待上一次指令下发至设备后才可继续下发')
        if (listValue) {
          this.setData({
            listValue: this.data.listValue,
            timeValue: this.filterTime(this.data.listValue, 'arrFilStr'),
          })
          app.show('需等待上一次指令下发至设备后才可继续下发,修改无效')
        }
      }else{
        app.show('修改失败')
      }
    })
  },

  setTwoMode() {
    if (!this.data.isAdmin) {
      app.show('无权限')
      return
    }
    if (app.nowCodeList[app.equIndex].locate_mode === 1) {
      return
    }
    this.editMode(1)
  }
  
})