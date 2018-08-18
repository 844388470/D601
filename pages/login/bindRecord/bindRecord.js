// pages/login/bindRecord/bindRecord.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    time:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    this.getBindList()
  },
  
  getBindList(){
    app.request({
      url: app.api.getBindRecord,
    }).then(res=>{
      console.log(res)
      this.setData({
        list:res
      })
    }).catch(err=>{

    })
  },

  addTimeoutFn() {                  //时差 开始定时器
    this.data.time = setInterval(() => {
      this.getBindList()
      this.getList()
    }, 10000)
  },

  deleteTimeoutFn() {               //时差 取消定时器
    clearInterval(this.data.time)
    this.data.time = null
  },

  getList(){
    app.request({
      url: app.api.getEquList,
      method: 'GET'
    }).then((arr) => {
      if (!arr.length && app.nowCodeList.length) {
        app.nowCodeList = arr
        wx.reLaunch({
          url: '../../equipment/addEqu/addEqu'
        })
      }
      if (arr.length && !app.nowCodeList.length) {
        app.nowCodeList = arr
        app.nowCodeId = arr[0].id
        wx.reLaunch({
          url: '../../index/index'
        })
      }
      app.nowCodeList = arr
    })
  },

  deleteBind(e){
    wx.showModal({
      title: '警告',
      content: '确认删除该记录吗?',
      success: (res) => {
        if (res.confirm) {
          app.showLoading('删除中')
          app.request({
            url: `${app.api.deleteBind}${e.target.dataset.id}`,
            method:'DELETE'
          }).then(data=>{
            wx.hideLoading()
            this.getBindList()
          }).catch(err=>{
            wx.hideLoading()
            app.show('删除失败')
          })
        }
      }
    })
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