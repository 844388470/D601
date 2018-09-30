// pages/equipment/addAround/addAround.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    isAdmin: false,
    name:'',
    imgsrc: '../../../image/message_index.png',
    imgsrcs: '../../../image/message_index_delete.png',
    longitude:'121.363156',
    latitude:'31.124131',
    coreLongitude: '121.363156',
    coreLatitude: '31.124131',
    address:'上海市闵行区秀波路',
    markers:[],
    polygonslist: [],
    polygons:[],
    width:'40',
    height:'40',
    left:0,
    top:0,
    ding:false,
    search:[],
    searchValue:'',
    searchState:false,
    selectState:false,
    editState:false,
    time:null,
    deleteId:0,
  },

  checkAddress(e) {
    const obj = this.data.search[e.target.dataset.index]
    this.setData({
      searchValue: obj.title,
      longitude: obj.location.lng,
      latitude: obj.location.lat,
      longitudes: obj.location.lng,
      latitudes: obj.location.lat,
      address: obj.address,
      markers: [...this.data.polygonslist,{ zIndex:999,longitude: obj.location.lng, latitude: obj.location.lat, iconPath: this.data.imgsrc, width: this.data.width, height: this.data.height }]
    })
  },

  searchStateChange(){
    this.setData({
      top: this.data.searchState ? this.data.top + 40 : this.data.top - 40,
      searchState: !this.data.searchState
    })
  },


  inputFocus(){
    this.setData({
      selectState: true,
    })
  },

  inputBlur() {
    this.setData({
      selectState: false,
    })
  },

  inputChange(e){
    this.setData({
      searchValue:e.detail.value
    })
    clearTimeout(this.data.time)
    this.data.time = setTimeout(()=>{
      if (e.detail.value) {
        this.getSearchList()
      }
    }, 500);
  },

  inputName(e){
    this.setData({
      name: e.detail.value
    })
  },

  getSearchList(){
    app.getAddressList(this.data.searchValue).then(res=>{
      if (res.data.length){
        this.setData({
          search: res.data
        })
      }
    })
  },

  goAroundName(){
    if(!this.data.name){
      app.show('围栏名称不得为空')
      return
    } else if (this.data.polygonslist.length<3){
      app.show('围栏点至少为三个')
      return
    }
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      fenceId: this.data.id ? this.data.id:'',
      openid: wx.getStorageSync('openid')
    }
    app.showLoading('保存中')
    const list = this.data.polygonslist.map(res => `${res.longitude},${res.latitude}`)
    app.mapApi([{ longitude: this.data.polygonslist[0].longitude, latitude: this.data.polygonslist[0].latitude }]).then((datas) => {
      app.request({
        url: this.data.id ? app.api.editFence:app.api.addFence,
        method: 'post',
        data: {
          ...data,
          fenceName: this.data.name,
          pointArrays: list.join(';'),
          fenceRemark:datas[0],
          sign: app.md5(app.util.getsign(data)).toUpperCase()
        }
      }).then(res => {
        app.hideLoading()
        if (res.code === 0) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          return Promise.reject()
        }
      }).catch((err) => {
        app.hideLoading()
        app.show('保存失败')
      })
    })
    
  },

  markertap(e){
    let list = this.data.polygonslist.filter(obj => obj.id == e.markerId)
    let filter = this.data.polygonslist.filter(obj => obj.id !== e.markerId)
    let longitude = list[0].longitude
    let latitude = list[0].latitude
    app.mapApi([{ longitude: longitude, latitude: latitude }]).then((data) => {
      this.setData({
        markers: [...filter, { id: list[0].id, longitude: longitude, latitude: latitude, iconPath: this.data.imgsrcs, width: 22, height: 30 }],
        deleteId: e.markerId,
        address: data[0]
      })
    })
  },

  addEqu(){
    let id = 1
    if (this.data.polygonslist.length){
      id = this.data.polygonslist[this.data.polygonslist.length-1].id+1
    }
    this.setData({
      polygonslist: [...this.data.polygonslist, { id: id, longitude: this.data.coreLongitude, latitude: this.data.coreLatitude, iconPath: this.data.imgsrc, width: 22, height: 30}]
    })
    this.setMap()
  },

  deleteEqu(){
    let list = this.data.polygonslist.filter(obj => obj.id !== this.data.deleteId)
    this.setData({
      polygonslist: list,
      deleteId:0
    })
    this.setMap()
  },

  setMap(res){
    let longitude = this.data.coreLongitude
    let latitude = this.data.coreLatitude
    app.mapApi([{ longitude: longitude, latitude: latitude  }]).then((data) => {
      this.setData({
        markers: [
          ...this.data.polygonslist,
          { zIndex: 999,longitude: longitude, latitude: latitude, iconPath: this.data.imgsrc, width: this.data.width, height: this.data.height }
        ],
        polygons: [{ points: [...this.data.polygonslist], strokeWidth: 1, strokeColor: '#ff000066', fillColor: '#ff000066'}],
        address: data[0]
      })
    })
  },

  controltap(e){
    if(e.type=='begin'){
      this.setData({
        markers: [...this.data.polygonslist],
        deleteId:0,
        ding:true
      })
      return
    }
    const that = this
    wx.createMapContext('map').getCenterLocation({
      success:(res)=>{
        app.mapApi([{ longitude: res.longitude, latitude: res.latitude}]).then((data)=>{
          that.setData({
            coreLongitude: res.longitude,
            coreLatitude: res.latitude,
            markers: [...that.data.polygonslist,{ longitude: res.longitude, latitude: res.latitude, iconPath: this.data.imgsrc, width: that.data.width, height: that.data.height }],
            ding: false,
            address: data[0]
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function (option) {

    const bili = 750 / wx.getSystemInfoSync().windowWidth
    const width = 27
    const height = 36
    const left = (750 - width * bili) / 2
    const top = (wx.getSystemInfoSync().windowHeight - 170) / 2 * bili - height * bili

    if (JSON.stringify(option) !== "{}") {
      let id=0
      const list = option.position.split(';').map(res=>{
        id=id+1
        return {
          id:id,
          longitude: res.split(',')[0],
          latitude: res.split(',')[1],
          iconPath: this.data.imgsrc, 
          width: 22, 
          height: 30
        }
      })
      this.setData({
        id:option.id,
        address: option.address,
        name: option.name,
        width: width,
        height: height,
        left: left,
        top: top,
        longitude: list[0].longitude,
        latitude: list[0].latitude,
        coreLongitude: list[0].longitude,
        coreLatitude: list[0].latitude,
        polygonslist:[...list],
        markers: [...list, { longitude: list[0].longitude, latitude: list[0].latitude, iconPath: this.data.imgsrc, width: width, height: height }],
        polygons: [{ points: [...list], strokeWidth: 1, strokeColor: '#ff000066', fillColor: '#ff000066' }],
      })
    }else{
      this.setData({
        width: width,
        height: height,
        left: left,
        top: top
      })
    }
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