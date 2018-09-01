import io from '../../socketIo/socket.io-mp.js'
const app = getApp();
Page({
  data: {
    array: [],
    indexs: '',
    list:[],
    indexs: '',
    userId: '',
    setTime:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    this.isReturnIndex()
    this.startTime()
  },
  onHide(){
    this.endTime()
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
      url: `${app.api.deleteBind}`,
      method: `get`,
      data: {
        user_id: e.target.dataset.userid,
        did: e.target.dataset.did,
        status: 3,
      }
    }).then(res => {
      if (res.length) {
        this.editReq(res[0].id, 5)
      } else {
        wx.hideLoading()
        app.show('用户已取消申请')
      }
      console.log(res)
    }).catch(err => {
      wx.hideLoading()
    })
  },

  editReq(e,state){
    app.request({
      url: `${app.api.deleteBind}${e}`,
      method:`PUT`,
      data:{
        status: state
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
      url: `${app.api.deleteBind}`,
      method: `get`,
      data: {
        user_id: e.target.dataset.userid,
        did: e.target.dataset.did,
        status: 3,
      }
    }).then(res => {
      if(res.length){
        this.editReq(res[0].id,9)
      }else{
        wx.hideLoading()
        app.show('用户已取消申请')
      }
      console.log(res)
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
      this.getList()
    } else {
      this.setSelectName()
      this.getList()
    }
  },

  getList(){
    app.showLoading('获取中')
    app.request({
      url: `${app.api.getMessageList}${app.nowCodeId}/messages`,
      method:'GET'
    }).then(res=>{
      app.messageState = false
      wx.hideLoading()
      const list=[]
      for (let i in res){
        const filterL = list.filter(obj => obj.time.substr(0, 10) == res[i].create_date.substr(0, 10))
        const dstate = app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'id', 'admin_id') == app.globalData.userInfo.id
        const ustate = res[i].user_id == app.globalData.userInfo.id
        if (filterL.length){
          if (res[i].type == 51  || res[i].type == 52 || res[i].type == 53){
            if (dstate){
              filterL[0].list.push({
                ...res[i],
                create_date: res[i].create_date.substr(11)
              })
            } else if (ustate && (res[i].type == 51 || res[i].type == 52)){
              filterL[0].list.push({
                ...res[i],
                create_date: res[i].create_date.substr(11)
              })
            }
          }else{
            filterL[0].list.push({
              ...res[i],
              create_date: res[i].create_date.substr(11)
            })
          }
        }else{
          if (res[i].type == 51 || res[i].type == 52 || res[i].type == 53) {
            if (dstate) {
              list.push({
                time: res[i].create_date.substr(0, 10) + ' ' + app.util.timeWeek(res[i].create_date),
                list: [{
                  ...res[i],
                  create_date: res[i].create_date.substr(11)
                }]
              })
            } else if (ustate && (res[i].type == 51 || res[i].type == 52)) {
              list.push({
                time: res[i].create_date.substr(0, 10) + ' ' + app.util.timeWeek(res[i].create_date),
                list: [{
                  ...res[i],
                  create_date: res[i].create_date.substr(11)
                }]
              })
            }
          } else {
            list.push({
              time: res[i].create_date.substr(0, 10) + ' ' + app.util.timeWeek(res[i].create_date),
              list: [{
                ...res[i],
                create_date: res[i].create_date.substr(11)
              }]
            })
          }
        }
      }
      this.setData({
        list: list,
      })
    }).catch(err => {
      wx.hideLoading()
      app.show('获取失败')
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

  startTime() {                        //监听改变
    this.data.setTime = setInterval(() => {
      if (app.messageState) {
        this.isDeltel()
      }
    }, 3000)
  },

  endTime(){
    clearInterval(this.data.setTime)
    this.data.setTime = null
  }
})