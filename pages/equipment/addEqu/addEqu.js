// pages/equipment/addEqu/addEqu.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputCode: '',
    inputCodes:'',
    list:[],
    bindList:[],
    time:null
  },

  addTimeoutFn() {                  //时差 开始定时器
    this.data.time = setInterval(() => {
      app.request({
        url: app.api.getEquList,
        method: 'GET'
      }).then((arr) => {
        if (!arr.length && app.nowCodeList.length) {
          app.nowCodeList = arr
          wx.reLaunch({
            url: './addEqu'
          })
        }
        if (!app.nowCodeList.length && arr.length) {
          app.nowCodeList = arr
          app.nowCodeId = arr[0].id
          wx.reLaunch({
            url: '../../index/index'
          })
        }
        app.nowCodeList = arr
      })
    }, 6000)
  },

  deleteTimeoutFn() {               //时差 取消定时器
    clearInterval(this.data.time)
    this.data.time = null
  },

  getInputCode(e){
    this.setData({
      inputCodes:e.detail.value
    })
  },

  saoma(){
    let that=this
    wx.scanCode({
      success:function(res){
        if (typeof res.result =='string'){
          that.setData({
            inputCode: res.result,
            inputCodes: res.result
          })
        }
      }
    })
  },

  addEqu(){
    this.setData({
      inputCode: this.data.inputCodes
    })
    if (!this.data.inputCode){
      app.show('设备码不得为空')
      return 
    } else if (app.nowCodeList.filter(res => res.imei == this.data.inputCode).length){
      app.show('当前账号已绑定该设备码')
      return
    } else if (this.data.bindList.filter(res => res.imei == this.data.inputCode).length) {
      if (this.data.bindList.filter(res => res.imei == this.data.inputCode)[0].status==3){
        app.show('该设备正在等待管理员确认，请尽快联系管理员')
        return
      }
      if (this.data.bindList.filter(res => res.imei == this.data.inputCode)[0].status == 1) {
        app.show('等待设备响应中，请至绑定记录查看详情')
        return
      }
    }
    app.showLoading('添加中')
    app.request({
      url: app.api.addCoor,
      method: 'post',
      data:{
        imei: this.data.inputCode
      }
    }).then(res => {
      this.getBindList(true)
    }).catch(err => {
      app.hideLoading()
      app.show(err)
    })
  },

  getBindList(state) {
    app.request({
      url: app.api.getBindRecord,
    }).then(res => {
      this.setData({
        bindList: res
      })
      if (state){
        this.getList()
      }
    })
  },

  getList() {                            //获取设备列表
    app.request({
      url: app.api.getEquList,
      method: 'GET'
    }).then((arr)=>{ 
      app.hideLoading()
      const list = arr.filter(res => res.imei == this.data.inputCode)
      if (list.length) {
        app.nowCodeList = arr
        app.nowCodeId = list[0].id
        wx.reLaunch({
          url: '../../index/index'
        })
      }else{
        if (this.data.bindList.filter(res => res.imei == this.data.inputCode).length){
          if (this.data.bindList.filter(res => res.imei == this.data.inputCode)[0].status == 3) {
            app.show('已提交管理员审批')
          }
          if (this.data.bindList.filter(res => res.imei == this.data.inputCode)[0].status == 1) {
            app.show('等待设备响应')
          }
        }
        if (!arr.length && app.nowCodeList.length) {
          app.nowCodeList = arr
          wx.reLaunch({
            url: './addEqu'
          })
        }else if (arr.length && !app.nowCodeList.length) {
          app.nowCodeList = arr
          app.nowCodeId = arr[0].id
          wx.reLaunch({
            url: '../../index/index'
          })
        }
      }
      app.nowCodeList = arr
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
    this.getBindList(true)
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
    this.addTimeoutFn()
    this.getBindList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.deleteTimeoutFn()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.deleteTimeoutFn()
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