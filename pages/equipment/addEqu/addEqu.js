// pages/equipment/addEqu/addEqu.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputCode:''
  },

  getInputCode(e){
    this.setData({
      inputCode:e.detail.value
    })
  },

  saoma(){
    let that=this
    wx.scanCode({
      success:function(res){
        if (typeof res.result =='string'){
          that.setData({
            inputCode: res.result
          })
        }
      }
    })
  },

  addEqu(){
    if (!this.data.inputCode){
      app.show('设备码不得为空')
      return 
    } else if (app.nowCodeList.filter(res => res.imei == this.data.inputCode).length){
      app.show('当前账号已绑定该设备码')
      return
    }
    app.showLoading('添加中')
    app.request({
      url: app.api.addCoor,
      method: 'post',
      data:{
        imei: this.data.inputCode
      }
    }).then(res => {
      this.getList()
    }).catch(err => {
      app.hideLoading()
      app.show('添加失败')
    })
  },

  getList() {                            //获取设备列表
    app.request({
      url: app.api.getEquList,
      method: 'GET'
    }).then((arr)=>{
      app.hideLoading()
      const list = arr.filter(res => res.imei == this.data.inputCode)
      if (arr.length && list.length) {
        app.nowCodeList = arr
        app.nowCodeId = list[0].id
        wx.reLaunch({
          url: '../../index/index'
        })
      } else if (!list.length){
        // app.show('正在审核,请等候')
      } else {
        return Promise.reject()
      }
    }).catch((err)=>{
      app.hideLoading()
      app.show('添加失败')
    })
  },

  goBindRecord(){
    wx.navigateTo({
      url: '../../login/bindRecord/bindRecord'
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