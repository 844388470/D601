// pages/equipment/setEqu/setEqu.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    orgName:'',
    models:'',
    sn:'',
    imei:'',
    positionName: '',
    positionId:'0',
    isAdmin:false,
    modeArray:[
      { name: '标准模式', id: '0' }, { name: '性能模式', id: '1' }
    ]
  },

  isAdmin(){
    if (app.nowCodeList[app.equIndex].admin_id == app.globalData.userInfo.id){
      this.setData({
        isAdmin:true
      })
    }
  },

  blurData(){

  },

  setName(){
    this.setData({
      name: app.nowCodeList[app.equIndex].name,
      orgName: app.nowCodeList[app.equIndex].name,
      models: app.nowCodeList[app.equIndex].model || '',
      sn: app.nowCodeList[app.equIndex].imsi || '',
      imei: app.nowCodeList[app.equIndex].imei,
      positionName: app.util.filterIdName(this.data.modeArray, app.nowCodeList[app.equIndex].locate_mode)
    })
  },

  setEquName(e){
    this.setData({
      name: e.detail.value
    })
  },

  blurinput(){
    if (this.data.orgName == this.data.name){
      return false
    }
    app.showLoading('修改中')
    app.request({
      url: `${app.api.setEqu}${app.nowCodeList[app.equIndex].id}`,
      method:'put',
      data:{
        name: this.data.name
      }
    }).then(res=>{
      wx.hideLoading()
      app.nowCodeList[app.equIndex].name = this.data.name
      this.setData({
        orgName: this.data.name
      })
    }).catch(err=>{
      this.setData({
        name: this.data.orgName
      })
      wx.hideLoading()
      app.show('修改失败')
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


  deleteEvent(){
    app.showLoading('解除绑定中')
    app.request({
      url: `${app.api.setUserDevices}${app.nowCodeList[app.equIndex].id}`,
      method: 'DELETE'
    }).then(res => {
      wx.hideLoading()
      app.nowCodeList.splice(app.equIndex,1)
      if (app.nowCodeList.length) {
        wx.navigateBack({
          delta: 1
        })
      }else{
        wx.reLaunch({
          url: '../addEqu/addEqu'
        })
      }
    }).catch(err => {
      wx.hideLoading()
      app.show('解除失败')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isAdmin()
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
    this.setName()
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