// pages/equipment/addAround/addAround.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:'121.4106',
    latitude:'31.191658',
    longitudes: '121.4106',
    latitudes: '31.191658',
    radius:100,
    name:'上海市闵行区莘庄镇西子国际中心',
    markers:'',
    circles: [{ longitude: '121.4106', latitude: '31.191658', radius: 100, fillColor: '#99cc9955' }],
    width:'40',
    height:'40',
    ding:false
  },

  sliderchange(e){
    this.setData({
      radius: e.detail.value,
      circles: [{ longitude: this.data.longitudes, latitude: this.data.latitudes, radius: e.detail.value, fillColor: '#99cc9955' }]
    })
  },

  goAroundName(){
    wx.navigateTo({
      url: '../aroundName/aroundName?lat=' + this.data.latitudes + '&lng=' + this.data.longitudes + '&radius=' + this.data.radius + '&name=' + app.aroundAddObj.name,
    })
  },

  controltap(e){
    let radius = this.data.radius
    let that=this
    if(e.type=='begin'){
      this.setData({
        markers: [],
        circles: [],
        ding:true
      })
      return
    }
    wx.createMapContext('map').getCenterLocation({
      success(res){
        app.mapApi([{ longitude: res.longitude, latitude: res.latitude}]).then((data)=>{
          that.setData({
            longitudes: res.longitude,
            latitudes: res.latitude,
            circles: [{ longitude: res.longitude, latitude: res.latitude, radius: radius, fillColor: '#99cc9955' }],
            markers: [{ longitude: res.longitude, latitude: res.latitude, iconPath: '../../../image/ding.png', width: that.data.width, height: that.data.height }],
            ding: false,
            name: data[0]
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
    this.setData({
      width: wx.getSystemInfoSync().windowWidth*0.08,
      height: (wx.getSystemInfoSync().windowHeight - (351 * wx.getSystemInfoSync().windowWidth/750)) * 0.08
    })
    // return 
    if (app.aroundAddObj.state==='add'){
      this.setData({
        markers: [{ longitude: '121.4106', latitude: '31.191658', iconPath: '../../../image/ding.png', width: this.data.width, height:this.data.height }]
      })
    } else if (app.aroundAddObj.state === 'edit'){
      this.setData({
        longitude: app.aroundAddObj.longitude,
        latitude: app.aroundAddObj.latitude,
        radius: app.aroundAddObj.radius,
        name: app.aroundAddObj.name,
        markers: [{ longitude: app.aroundAddObj.longitude, latitude: app.aroundAddObj.latitude, iconPath: '../../../image/ding.png', width: this.data.width, height: this.data.height}],
        circles: [{ longitude: app.aroundAddObj.longitude, latitude: app.aroundAddObj.latitude, radius: app.aroundAddObj.radius, fillColor: '#99cc9955' }]
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