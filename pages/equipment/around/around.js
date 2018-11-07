// pages/equipment/around/around.js
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit:false,
    isAdmin:false,
    lowerStatus:true,
    pendingStatus:false,
    listOld:[],
    list: [
      
    ]
  },
  
  isAdmin(){
    if (app.nowCodeList[app.equIndex].admin_id == app.globalData.userInfo.id) {
      this.setData({
        isAdmin: true
      })
    }
  },

  editMode(){
    this.setData({
      edit: !this.data.edit
    })
  },

  goAddAround(){
    if(this.data.list.length==4){
      app.show('电子围栏个数已达上限')
      return 
    }
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
    if (!this.data.edit){
      return 
    }
    app.aroundList = this.data.list
    app.aroundAddObj = {
      state: 'edit',
      address: this.data.list[e.target.dataset.index].address,
      name: this.data.list[e.target.dataset.index].name,
      longitude: this.data.list[e.target.dataset.index].longitude,
      latitude: this.data.list[e.target.dataset.index].latitude,
      radius: this.data.list[e.target.dataset.index].radius,
      index: e.target.dataset.index
    }
    wx.navigateTo({
      url: '../addAround/addAround'
    })
  },

  deleteMode(e){
    const [...list] = JSON.parse(JSON.stringify(this.data.list))
    if (!this.data.isAdmin) {
      app.show('无权限')
      return
    }
    wx.showModal({
      title: '警告',
      content: '删除后无法恢复,确认删除吗？',
      success: (res)=>{
        if (res.confirm) {
          list.splice(e.target.dataset.index, 1)
          this.setData({
            list:list
          })
          // this.editList(list, this.data.list)
        }
      }
    })
  },

  setEquChecked(e){
    const [...list] = JSON.parse(JSON.stringify(this.data.list))
    list[e.target.dataset.index].status = e.detail.value?1:0
    // if(!this.data.isAdmin){
      // app.show('无权限')
      this.setData({
        list: list
      })
      // return
    // }
    // this.editList(list, this.data.list)
  },

  getLowerStatus(){
    // app.showLoading('获取下发状态')
    app.request({
      url: `${app.api.getIndex}${app.nowCodeList[app.equIndex].id}/commands`,
      method: 'get'
    }).then(res => {
      let list=res.filter(res=>res.f=='4')
      if (list.filter(res => res.status == "DEFAULT" || res.status == "PENDING" || res.status == "SENT").length){
        this.setData({
          lowerStatus:true,
          pendingStatus:true
        })
        setTimeout(()=>{
          this.getLowerStatus()
        },10000)
      } else if (list.filter(res => res.status == "FAILED" || res.status == "EXPIRED" || res.status == "TIMEOUT").length){
        if (this.data.pendingStatus) {
          this.getList(true)
          this.setData({
            lowerStatus: false,
            pendingStatus: false
          })
        } else {
          this.setData({
            lowerStatus: false
          })
        }
      }else{
        if (this.data.pendingStatus){
          this.getList()
          this.setData({
            lowerStatus: false,
            pendingStatus: false
          })
        }else{
          this.setData({
            lowerStatus: false
          })
        }
      }
    }).catch(res => {
      // app.show('获取下发状态失败')
    })
  },

  confirmLower(){
    // return console.log(123)
    app.showLoading('下发中...')
    let resList = this.data.list.map(res => {
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
      url: `${app.api.getIndex}${app.nowCodeList[app.equIndex].id}/commands`,
      method: 'POST',
      data: {
        f:'4',
        d: JSON.stringify(resList)
      }
    }).then(res => {
      app.show('指令已下发,等待设备响应')
      this.setData({
        lowerStatus:true,
        pendingStatus:true
      })
      setTimeout(()=>{
        this.getLowerStatus()
      },10000)
    }).catch(res => {
      if (err && (err == 'Can not send same command twice')) {
        app.show('等待设备响应中')
        this.setData({
          lowerStatus: true,
          pendingStatus: true
        })
      } else {
        app.show('修改失败')
      }
    })
  },

  isChange(){
    if (app.aroundChange){
      console.log('返回列表')
      app.aroundChange=false
      this.setData({
        list: app.aroundList
      })
    }else{
      console.log('刷新列表')
      this.getList()
    }
  },

  getList(status=false){
    app.showLoading('获取中')
    app.request({
      url: `${app.api.getIndex}${app.nowCodeList[app.equIndex].id}/fences`,
      method:'GET'
    }).then(res=>{
      app.hideLoading()
      if (JSON.stringify(res) !== JSON.stringify(this.data.list)){
        this.setData({
          listOld:res,
          list:res
        })
      }
      if (status){
        this.setData({
          listOld: res,
          list: res
        })
      }
    }).catch(res=>{
      app.hideLoading()
      app.show('获取失败')
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isAdmin()
    this.getLowerStatus()
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
    this.isChange()
  },
  onHide:function(){
    
  }
})