// pages/equipment/manage/manage.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    settingArray: [
      { name: '管理员确认', id: '0' }, { name: '允许任何人', id: '1' }, { name: '禁止任何人', id: '2' }
    ],
    settingName: '',
    settingId:'0',
    list: []
  },


  setSettingName() {
    this.setData({
      settingName: app.util.filterIdName(this.data.settingArray, app.nowCodeList[app.equIndex].bind_mode)
    })
  },

  getEquRequestList(){
    app.showLoading('获取用户中')
    app.request({
      url: `${app.api.setEqu}${app.nowCodeList[app.equIndex].id}/users`,
      method:'GET'
    }).then(res=>{
      app.hideLoading()
      for(let i of res){
          i.admin = (i.id === app.nowCodeList[app.equIndex].admin_id ? true : false)
      }
      this.setData({
        list:res
      })
    }).catch(err=>{
      app.hideLoading()
      app.show('获取失败')
    })
  },

  deletePhone(e){
    wx.showModal({
      title: '警告',
      content: '确认删除该用户吗?',
      success: (res)=> {
        if (res.confirm) {
          this.deleteUser(e.target.dataset.id)
        }
      }
    })
  },

  deleteUser(id){
    app.showLoading('删除中')
    app.request({
      url: `${app.api.adminDeleteUser}${id}/devices/${app.nowCodeList[app.equIndex].id}`,
      method: 'DELETE'
    }).then(res=>{
      wx.hideLoading()
      this.getEquRequestList()
    }).catch(err=>{
      wx.hideLoading()
      app.show('删除失败')
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
    this.getEquRequestList()
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