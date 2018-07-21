// pages/equipment/manage/manage.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    settingArray: [
      { name: '管理员确认', id: '1' }, { name: '允许任何人', id: '2' }, { name: '禁止任何人', id: '3' }
    ],
    settingName: '',
    settingId:'1',
    list: [{ phone: 17717374320, rules: 'admin', userId: '1', isDelete: true }, { phone: 13131313131, rules: 'user', userId: '2', isDelete: true }]
  },

  setSettingName() {
    this.setData({
      settingName: app.util.filterIdName(this.data.settingArray, app.bindSettingId)
    })
  },

  deletePhone(e){
    console.log(e.target.dataset.index)
    wx.showModal({
      title: '警告',
      content: '确认删除吗?',
      success: (res)=> {
        if (res.confirm) {
          this.data.list.splice(e.target.dataset.index, 1)
          this.setData({
            list: this.data.list
          })
        }
      }
    })
  },

  goRules(){
    wx.navigateTo({
      url: '../euqRules/euqRules'
    })
  },

  goSetting(){
    wx.navigateTo({
      url: '../bindSetting/bindSetting'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setSettingName()
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
    this.setSettingName()
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