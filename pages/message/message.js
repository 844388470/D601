
const app = getApp();
Page({
  data: {
    array: [],
    indexs: '',
    list:[],
    indexs: '',
    userId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    this.isReturnIndex()
  },
  onLoad() {
    
    this.setData({
      userId: app.globalData.userInfo.id
    })
    // this.getList()
    // this.setSelectName()
  },

  goMap(e){
    wx.navigateTo({
      url: '../map/mapAround/mapAround?type=1&&n=' + e.target.dataset.type
    })
    // wx.navigateTo({
    //   url: '../map/map'
    // })
  },

  jujue(e){
    app.showLoading('操作中')
    app.request({
      url: `${app.api.deleteBind}${e.target.dataset.id}`,
      method:`PUT`,
      data:{
        status:5
      }
    }).then(res=>{
      wx.hideLoading()
      this.getList()
    }).catch(err=>{
      wx.hideLoading()
    })
  },

  tongyi(e){
    app.showLoading('操作中')
    app.request({
      url: `${app.api.deleteBind}${e.target.dataset.id}`,
      method: `PUT`,
      data: {
        status: 9
      }
    }).then(res => {
      wx.hideLoading()
      this.getList()
    }).catch(err => {
      wx.hideLoading()
    })
  },  

  bindPickerChange(e) {                                          //切换设备
    if (!app.nowCodeList.length) {
      return
    }
    app.nowCodeId = app.nowCodeList[e.detail.value].id
    this.isDeltel()
  },

  setArray() {                                                   //设置设备
    this.setData({
      array: app.nowCodeList
    })
  },

  setSelectName() {                                              //设置当前设备的名称
    this.setData({
      indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'id', 'name')
    })
  },

  isDeltel() {                       //判断当前设备是否存在
    if (app.nowCodeList.filter(obj => obj.id == app.nowCodeId).length === 0) {
      if (!app.nowCodeList.length) {
        wx.reLaunch({
          url: '../equipment/addEqu/addEqu'
        })
      }
      app.nowCodeId = app.nowCodeList[0].id
      this.setSelectName()
      // this.getList()
    } else {
      this.setSelectName()
      // this.getList()
    }
  },

  getList(){
    app.showLoading('获取中')
    app.request({
      url: `${app.api.getMessageList}${app.nowCodeId}/messages`,
      method:'GET'
    }).then(res=>{
      wx.hideLoading()
      
      this.setData({
        list:res,
      })
    }).catch(err => {

    })
  },

  isReturnIndex() {                      //返回位置页判断
    let filterList = app.nowCodeList.filter(obj => obj.id == app.nowCodeId)
    if (filterList.length === 0) {
      this.isDeltel()
    } else {
      if (filterList[0].name !== this.data.indexs) {
        this.isDeltel()
      }
    }
    this.setArray()
  },

})