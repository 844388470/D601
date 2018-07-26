// pages/equipment/setEqu/setEqu.js
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    model:'D601',
    imei:'',
    positionName: '',
    positionId:'0',
    modeArray:[
      { name: '标准模式', id: '0' }, { name: '性能模式', id: '1' }
    ]
  },

  blurData(){

  },

  setPositionName(){
    this.setData({
      positionName: app.util.filterIdName(this.data.modeArray, app.positionModeId)
    })
  },

  setName(){
    this.setData({
      name: app.nowCodeList[app.equIndex].name,
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
    wx.showLoading({
      title: '修改中...',
      mask: true
    })
    app.request({
      url: `${app.api.getIndex}${app.nowCodeList[app.equIndex].id}`,
      method:'put',
      data:{
        name: this.data.name
      }
    }).then(res=>{
      wx.hideLoading()
      app.nowCodeList[app.equIndex].name = this.data.name
    }).catch(err=>{
      wx.hideLoading()
      wx.showToast({
        title: '修改失败',
        icon: 'none',
        duration: 2000
      })
    })
  },

  goPositionMode(){
    wx.navigateTo({
      url: '../positionMode/positionMode'
    })
  },

  goEquUpdate() {
    wx.navigateTo({
      url: '../equUpdate/equUpdate'
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
    wx.showLoading({
      title: '解除绑定中...',
      mask: true
    })
    app.request({
      url: `${app.api.getIndex}${app.nowCodeList[app.equIndex].id}`,
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
      wx.showToast({
        title: '解除失败',
        icon: 'none',
        duration: 2000
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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