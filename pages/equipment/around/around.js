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
    // if (!this.data.edit){
    //   return 
    // }
    // app.aroundList = this.data.list
    // app.aroundAddObj = {
    //   state: 'edit',
    //   address: this.data.list[e.target.dataset.index].address,
    //   name: this.data.list[e.target.dataset.index].name,
    //   longitude: this.data.list[e.target.dataset.index].longitude,
    //   latitude: this.data.list[e.target.dataset.index].latitude,
    //   radius: this.data.list[e.target.dataset.index].radius,
    //   index: e.target.dataset.index
    // }
    const obj = this.data.list[e.target.dataset.index]
    wx.navigateTo({
      url: `../addAround/addAround?id=${obj.fenceId}&name=${obj.fenceName}&address=${obj.fenceRemark}&position=${obj.pointArrays}`
    })
  },

  deleteMode(e){
    const [...list] = JSON.parse(JSON.stringify(this.data.list))
    // if (!this.data.isAdmin) {
    //   app.show('无权限')
    //   return
    // }
    wx.showModal({
      title: '警告',
      content: '删除后无法恢复,确认删除吗？',
      success: (res)=>{
        if (res.confirm) {
          list.splice(e.target.dataset.index, 1)
          this.editList(list, this.data.list)
        }
      }
    })
  },

  setEquChecked(e){
    const [...list] = JSON.parse(JSON.stringify(this.data.list))
    list[e.target.dataset.index].status = e.detail.value?1:0
    // if(!this.data.isAdmin){
    //   app.show('无权限')
    //   this.setData({
    //     list:this.data.list
    //   })
    //   return
    // }
    this.editList(list, this.data.list)
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

  isChange(){
    // if (app.aroundChange){
    //   console.log('刷新列表')
    //   this.getList()
    //   app.aroundChange=false
    // }
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
        if (res.fenceList.length) {
          this.setData({
            list: res.fenceList
          })
        }
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