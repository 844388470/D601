// pages/equipment/setEqu/setEqu.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'1',
    equData:[],
    models:'',
    sn:'',
    imei:'',
    positionName: '',
    positionId:'0',
    isEditMode:false,
    editData:[]
  },

  actChong(){
    this.setData({
      active: '1'
    })
  },

  actEqu() {
    if (this.data.isEditMode){
      return app.show('请退出编辑模式')
    }
    this.setData({
      active: '2'
    })
  },

  enterEdit(){
    let data = this.data.equData.map(res=>res)
    this.setData({
      editData: data,
      isEditMode:true
    })
  },

  confirmEdit() {
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      deviceNo: app.nowCodeList[app.equIndex].deviceNo,
      openid: wx.getStorageSync('openid'),
    }
    app.showLoading('修改中')
    app.request({
      url: app.api.editEquInfo,
      method: 'post',
      data: {
        ...data,
        fieldInfos: this.data.equData.map(res => `${res.fieldId}:${res.content}`).join('#'),
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      if(res.code===0){
        this.getList()
      }else{
        return Promise.reject()
      }
    }).catch((err) => {
      app.show('修改失败')
    })
  },

  cancelEdit(){
    let data = this.data.editData.map(res => res)
    this.setData({
      editData: [],
      equData: data,
      isEditMode: false
    })
  },

  getList() {                            //获取设备列表
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      openid: wx.getStorageSync('openid')
    }
    app.request({
      url: app.api.getEquList,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      app.hideLoading()
      if (res.code === 0) {
        if (res.deviceCount) {
          app.show('修改成功')
          app.nowCodeList = res.deviceList
          this.setData({
            isEditMode:false
          })
          this.setEquData()
        } else {
          wx.redirectTo({
            url: `../addEqu/addEqu`
          })
        }
      } else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.show('修改失败')
    })
  },

  setEquData(){
    this.setData({
      equData: app.nowCodeList[app.equIndex].customFieldList,
      models: app.nowCodeList[app.equIndex].deviceType,
      sn: app.nowCodeList[app.equIndex].iccid,
      imei: app.nowCodeList[app.equIndex].deviceNo,
    })
  },


  goPositionMode() {
    wx.navigateTo({
      url: '../positionMode/positionMode'
    })
  },
  
  goQrCode(){
    wx.navigateTo({
      url: '../qrCode/qrCode'
    })
  },

  goManage() {
    wx.navigateTo({
      url: '../manage/manage'
    })
  },

  goAround() {
    wx.navigateTo({
      url: '../around/around'
    })
  },

  getInput(e){
    this.data.equData[e.target.dataset.index].content=e.detail.value
    this.setData({ 
      equData: this.data.equData
    })
  },

  getVol(){
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      deviceNo: app.nowCodeList[app.equIndex].deviceNo
    }
    app.showLoading('获取电量')
    app.request({
      url: app.api.getEquVol,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      if (res.code === 0 && res.dataFields && res.dataFields.filter(res => res.fieldName === 'batteryLevel').length) {
        app.show(`剩余电量:${res.dataFields.filter(res => res.fieldName === 'batteryLevel')[0].content}%`)
      } else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.show('获取失败')
    })
  },

  relieve(){
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      openid: wx.getStorageSync('openid'),
      deviceNo: app.nowCodeList[app.equIndex].deviceNo
    }
    app.showLoading('解除绑定中')
    app.request({
      url: app.api.deleteEqu,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      app.hideLoading()
      if (res.code === 0) {
        if (app.nowCodeList.length>1){
          app.nowCodeList = app.nowCodeList.filter(res => res.deviceNo !== app.nowCodeList[app.equIndex].deviceNo)
          app.nowCodeId = app.nowCodeList[0].deviceNo
          wx.navigateBack({
            delta: 1
          })
        }else{
          app.nowCodeList=[]
          app.nowCodeId=0
          wx.reLaunch({
            url: `../addEqu/addEqu`
          })
        }
      } else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.show('解除失败')
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setEquData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.setName()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})