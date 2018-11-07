// pages/equipment/positionMode/positionMode.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin:false,
    active:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
      active: app.nowCodeList[app.equIndex].locate_mode
    })
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

  editMode(value){
    app.showLoading('修改中')
    app.request({
      url: `${app.api.setEqu}${app.nowCodeList[app.equIndex].id}/commands`,
      method: 'POST',
      data: {
        f:'5',
        d: `${value}`
      }
    }).then(res => {
      app.show('指令已下发,等待设备响应')
      // wx.hideLoading()
      // if(){

      // }
      // app.nowCodeList[app.equIndex].locate_mode = Number(value)
      // this.setActive()
    }).catch(err => {
      if (err && (err =='Can not send same command twice')){
        app.show('等待设备响应中')
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