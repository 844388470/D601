// pages/equipment/aroundName/aroundName.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputCode:'',
    option:''
  },

  addEqu(){
    app.showLoading('修改中')
    let [...list] = JSON.parse(JSON.stringify(app.aroundList))
    if (app.aroundAddObj.state=='add'){
      list.push({
        ...app.aroundAddObj,
        name: this.data.inputCode,
        status:0
      })
    }else{
      list[app.aroundAddObj.index]= {
        ...list[app.aroundAddObj.index],
        ...app.aroundAddObj,
        name:this.data.inputCode
      }
    }
    list=list.map(res=>{
      return {
        name: res.name,
        status: res.status,
        address: res.address,
        longitude: res.longitude,
        latitude: res.latitude,
        radius:res.radius,
      }
    })
    app.request({
      url: `${app.api.getIndex}${app.nowCodeList[app.equIndex].id}/fences`,
      method: 'POST',
      data: list
    }).then(res => {
      wx.hideLoading()
      app.aroundChange=true
      wx.navigateBack({
        delta: 2
      })
    }).catch(res => {
      wx.hideLoading()
      app.show('修改失败')
    })
  },

  getInputCode(e){
    this.setData({
      inputCode:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      inputCode: app.aroundAddObj.name,
      option: app.aroundAddObj.state
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