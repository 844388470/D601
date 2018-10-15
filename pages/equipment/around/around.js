// pages/equipment/around/around.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit:false,
    isAdmin:!false,
    list: []
  },


  editMode(){
    this.setData({
      edit: !this.data.edit
    })
  },

  goAddAround(){
    app.aroundList = this.data.list
    app.aroundAddObj = {
      state: 'add',
      address: '上海市闵行区秀波路',
      name: '公司',
      longitude: '121.363156',
      latitude: '31.124131',
      radius: '100',
      index:'-1'
    }
    wx.navigateTo({
      url: '../addAround/addAround'
    })
  },

  editAround(e){
    const obj = this.data.list[e.target.dataset.index]
    wx.navigateTo({
      url: `../addAround/addAround?id=${obj.fenceId}&name=${obj.fenceName}&address=${obj.fenceRemark}&position=${obj.pointArrays}`
    })
  },

  deleteMode(e){
    const [...list] = JSON.parse(JSON.stringify(this.data.list))
    wx.showModal({
      title: '警告',
      content: '删除后无法恢复,确认删除吗？',
      success: (res)=>{
        if (res.confirm) {
          this.deleteAround(this.data.list[e.target.dataset.index].fenceId)
        }
      }
    })
  },

  deleteAround(id){
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      openid: wx.getStorageSync('openid'),
      fenceId: id
    }
    app.showLoading('删除中')
    app.request({
      url: app.api.deleteFence,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      if(res.code===0){
        this.getList()
      }else{
        return Promise.reject()
      }
    }).catch((err) => {
      app.show('删除失败')
    })
  },

  editList(resList,errList){
    app.showLoading('修改中')
    resList = resList.map(res => {
      return {
        name: res.name,
        status: res.status,
        address: res.address,
        longitude: res.longitude,
        latitude: res.latitude,
        radius: res.radius,
      }
    })
    app.request({
      url: `${app.api.getIndex}${app.nowCodeList[app.equIndex].id}/fences`,
      method: 'POST',
      data: resList
    }).then(res => {
      wx.hideLoading()
      this.setData({
        list: resList
      })
    }).catch(res => {
      this.setData({
        list: errList
      })
      wx.hideLoading()
      app.show('修改失败')
    })
  },

  getList(){
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      openid: wx.getStorageSync('openid')
    }
    app.showLoading('获取围栏')
    app.request({
      url: app.api.getFence,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      app.hideLoading()
      if (res.code === 0) {
        this.setData({
          list: res.fenceList
        })
      } else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.hideLoading()
      app.show('获取失败')
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getList()
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
    // this.isChange()
    this.getList()
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