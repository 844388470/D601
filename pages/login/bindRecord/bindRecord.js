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

  onLoad: function (options) {
    this.getList()
  },
  
  getList(){
    app.showLoading('获取列表')
    app.request({
      url: app.api.getBindRecord,
    }).then(res=>{
      wx.hideLoading()
      this.setData({
        list:res.map((obj)=>({
          ...obj,
          model:obj.model.substr(0,4)
        }))
      })
    }).catch(err=>{
      app.show('获取列表失败')
    })
  }
})