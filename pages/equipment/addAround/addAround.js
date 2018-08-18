// pages/equipment/addAround/addAround.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin: false,
    imgsrc:'../../../image/message_index.png',
    longitude:'',
    latitude:'',
    longitudes: '',
    latitudes: '',
    radius: 0,
    radiusxian:0,
    address:'',
    markers:[],
    circles: [],
    width:'40',
    height:'40',
    left:0,
    top:0,
    ding:false,
    search:[],
    searchValue:'',
    searchState:false,
    selectState:false,
    time:null,
  },

  isAdmin() {
    if (app.nowCodeList[app.equIndex].admin_id == app.globalData.userInfo.id) {
      this.setData({
        isAdmin: true
      })
    }
  },

  searchStateChange(){
    this.setData({
      top: this.data.searchState ? this.data.top + 40 : this.data.top - 40,
      searchState: !this.data.searchState
    })
  },

  checkAddress(e){
    const obj = this.data.search[e.target.dataset.index]
    this.setData({
      searchValue: obj.title,
      longitude: obj.location.lng,
      latitude: obj.location.lat,
      longitudes: obj.location.lng,
      latitudes: obj.location.lat,
      address: obj.address,
      circles: [{ longitude: obj.location.lng, latitude: obj.location.lat, radius: this.data.radius, fillColor: '#99cc9955' }],
      markers: [{ longitude: obj.location.lng, latitude: obj.location.lat, iconPath: this.data.imgsrc, width: this.data.width, height: this.data.height }]
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
    clearTimeout(this.data.time);
    this.data.time = setTimeout(()=>{
      if (e.detail.value) {
        this.getSearchList()
      }
    }, 500);
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

  bindEndChange(e){
    this.setData({
      radius: e.detail.value,
      radiusxian: e.detail.value,
      circles: [{ longitude: this.data.longitudes, latitude: this.data.latitudes, radius: e.detail.value, fillColor: '#99cc9955' }]
    })
  },

  sliderchange(e){
    this.setData({
      radiusxian: e.detail.value,
      circles: [{ longitude: this.data.longitudes, latitude: this.data.latitudes, radius: e.detail.value, fillColor: '#99cc9955' }]
    })
  },

  goAroundName(){
    if (!this.data.isAdmin) {
      app.show('无权限')
      this.setData({
        list: this.data.list
      })
      return
    }
    app.aroundAddObj={
      ...app.aroundAddObj,
      address: this.data.address,
      longitude: this.data.longitudes,
      latitude: this.data.latitudes,
      radius: this.data.radius,
    }
    wx.navigateTo({
      url: '../aroundName/aroundName',
    })
  },

  controltap(e){
    if(e.type=='begin'){
      this.setData({
        markers: [],
        circles: [],
        ding:true
      })
      return
    }
    const radius = this.data.radius
    const that = this
    wx.createMapContext('map').getCenterLocation({
      success:(res)=>{
        app.mapApi([{ longitude: res.longitude, latitude: res.latitude}]).then((data)=>{
          that.setData({
            longitudes: res.longitude,
            latitudes: res.latitude,
            circles: [{ longitude: res.longitude, latitude: res.latitude, radius: radius, fillColor: '#99cc9955' }],
            markers: [{ longitude: res.longitude, latitude: res.latitude, iconPath: this.data.imgsrc, width: that.data.width, height: that.data.height }],
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
  onLoad: function () {
    this.isAdmin()
    const { longitude, latitude } = app.aroundAddObj
    const obj = app.aroundAddObj
    const bili = 750/wx.getSystemInfoSync().windowWidth
    const width = 27
    const height = 36
    const left = (750 - width*bili)/2
    const top = (wx.getSystemInfoSync().windowHeight - 170) / 2 * bili - height * bili
    console.log('小米top+1 right+8')
    this.setData({
      width: width,
      height: height,
      left:left,
      top: top,
      longitude: longitude,
      latitude: latitude,
      longitudes: longitude,
      latitudes: latitude,
      radius:Number(obj.radius),
      radiusxian: Number(obj.radius),
      address: obj.address,
      markers: [{ longitude: longitude, latitude: latitude, iconPath: this.data.imgsrc, width, height}],
      circles: [{ longitude: longitude, latitude: latitude, radius: Number(obj.radius), fillColor: '#99cc9955' }]
    })
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