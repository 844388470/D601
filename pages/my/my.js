
const app = getApp();
Page({
  data: {
    equArray:[],
    setTimeTrack:null,
    userInfo: {},
    imgSrc:'',
    name:''
  },

  onLoad() {

  },

  goAddEqu(e) {
    wx.navigateTo({
      url: '../equipment/addEqu/addEqu'
    })
  },
  
  goAround(e) {
    wx.navigateTo({
      url: '../equipment/around/around'
    })
  },

  goSetEqu(e) {
    app.equIndex = e.target.dataset.index
    wx.navigateTo({
      url: '../equipment/setEqu/setEqu'
    })
  },

  onShow(){ 
    this.setData({ 
      imgSrc: wx.getStorageSync('userInfo').imgAdress, 
      name: wx.getStorageSync('userInfo').nickName, 
      equArray: app.nowCodeList.map(x => ({ 
          ...x, 
          nickName: '设备'+x.deviceNo.substr(-4), 
          petName: x.customFieldList.filter(y => y.fieldId == 80)[0].content 
      }))
    })
  }
})