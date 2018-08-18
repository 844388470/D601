// pages/userInfo/userInfo.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headimg:'',
    xian:{
      nickname: '',
      name: '',
      phone: '',
      height: '',
      weight: '',
      sport_target:'',
    },
    heightList: [
      1.00, 1.01, 1.02, 1.03, 1.04, 1.05, 1.06, 1.07, 1.08, 1.09, 1.10, 1.11, 1.12, 1.13, 1.14, 1.15, 1.16, 1.17, 1.18, 1.19, 1.20, 1.21, 1.22, 1.23, 1.24, 1.25, 1.26, 1.27, 1.28, 1.29, 1.30, 1.31, 1.32, 1.33, 1.34, 1.35, 1.36, 1.37, 1.38, 1.39, 1.40, 1.41, 1.42, 1.43, 1.44, 1.45, 1.46, 1.47, 1.48, 1.49, 1.50, 1.51, 1.52, 1.53, 1.54, 1.55, 1.56, 1.57, 1.58, 1.59, 1.60, 1.61, 1.62, 1.63, 1.64, 1.65, 1.66, 1.67, 1.68, 1.69, 1.70, 1.71, 1.72, 1.73, 1.74, 1.75, 1.76, 1.77, 1.78, 1.79, 1.80, 1.81, 1.82, 1.83, 1.84, 1.85, 1.86, 1.87, 1.88, 1.89, 1.90, 1.91, 1.92, 1.93, 1.94, 1.95, 1.96, 1.97, 1.98, 1.99, 2.00, 2.01, 2.02, 2.03, 2.04, 2.05, 2.06, 2.07, 2.08, 2.09, 2.10, 2.11, 2.12, 2.13, 2.14, 2.15, 2.16, 2.17, 2.18, 2.19, 2.20, 2.21, 2.22, 2.23, 2.24, 2.25, 2.26, 2.27, 2.28
    ],
    weightList: [
      0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47, 47.5, 48, 48.5, 49, 49.5, 50, 50.5, 51, 51.5, 52, 52.5, 53, 53.5, 54, 54.5, 55, 55.5, 56, 56.5, 57, 57.5, 58, 58.5, 59, 59.5, 60, 60.5, 61, 61.5, 62, 62.5, 63, 63.5, 64, 64.5, 65, 65.5, 66, 66.5, 67, 67.5, 68, 68.5, 69, 69.5, 70, 70.5, 71, 71.5, 72, 72.5, 73, 73.5, 74, 74.5, 75, 75.5, 76, 76.5, 77, 77.5, 78, 78.5, 79, 79.5, 80, 80.5, 81, 81.5, 82, 82.5, 83, 83.5, 84, 84.5, 85, 85.5, 86, 86.5, 87, 87.5, 88, 88.5, 89, 89.5, 90, 90.5, 91, 91.5, 92, 92.5, 93, 93.5, 94, 94.5, 95, 95.5, 96, 96.5, 97, 97.5, 98, 98.5, 99, 99.5, 100, 100.5, 101, 101.5, 102, 102.5, 103, 103.5, 104, 104.5, 105, 105.5, 106, 106.5, 107, 107.5, 108, 108.5, 109, 109.5, 110, 110.5, 111, 111.5, 112, 112.5, 113, 113.5, 114, 114.5, 115, 115.5, 116, 116.5, 117, 117.5, 118, 118.5, 119, 119.5, 120, 120.5, 121, 121.5, 122, 122.5, 123, 123.5, 124, 124.5, 125, 125.5, 126, 126.5, 127, 127.5, 128, 128.5, 129, 129.5, 130, 130.5, 131, 131.5, 132, 132.5, 133, 133.5, 134, 134.5, 135, 135.5, 136, 136.5, 137, 137.5, 138, 138.5, 139, 139.5, 140, 140.5, 141, 141.5, 142, 142.5, 143, 143.5, 144, 144.5, 145, 145.5, 146, 146.5, 147, 147.5, 148, 148.5, 149, 149.5, 150, 150.5, 151, 151.5, 152, 152.5, 153, 153.5, 154, 154.5, 155, 155.5, 156, 156.5, 157, 157.5, 158, 158.5, 159, 159.5, 160, 160.5, 161, 161.5, 162, 162.5, 163, 163.5, 164, 164.5, 165, 165.5, 166, 166.5, 167, 167.5, 168, 168.5, 169, 169.5, 170, 170.5, 171, 171.5, 172, 172.5, 173, 173.5, 174, 174.5, 175, 175.5, 176, 176.5, 177, 177.5, 178, 178.5, 179, 179.5, 180, 180.5, 181, 181.5, 182, 182.5, 183, 183.5, 184, 184.5, 185, 185.5, 186, 186.5, 187, 187.5, 188, 188.5, 189, 189.5, 190, 190.5, 191, 191.5, 192, 192.5, 193, 193.5, 194, 194.5, 195, 195.5, 196, 196.5, 197, 197.5, 198, 198.5, 199, 199.5, 200
    ],
    sportList:[
      1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000,15000,16000,17000,18000,19000,20000
    ]
  },

  blurNicknameChange(e){
    if (e.detail.value !== this.data.xian.nickname){
      const value = e.detail.value
      this.editInfo(
        { nickname: value },
        () => {
          app.globalData.userInfo.nickname = value
          this.setData({
            xian: {
              ...this.data.xian,
              nickname: value
            }
          })
        },
        ()=>{
          this.setData({
            xian: this.data.xian
          })
        }
      )
    }
    this.setData({ 
      xian:{
        ...this.data.xian,
        // nickname: e.detail.value
      }
    });
  },

  blurNameChange(e) {
    if (e.detail.value !== this.data.xian.name) {
      const value = e.detail.value
      this.editInfo(
        { name: value },
        () => {
          app.globalData.userInfo.name = value
          this.setData({
            xian: {
              ...this.data.xian,
              name: value
            }
          })
        },
        () => {
          this.setData({
            xian: this.data.xian
          })
        }
      )
    }
    this.setData({
      xian: {
        ...this.data.xian,
        // nickname: e.detail.value
      }
    });
  },

  blurPhoneChange(e) {
    if (e.detail.value !== this.data.xian.phone) {
      const value = e.detail.value
      this.editInfo(
        { phone: value },
        () => {
          app.globalData.userInfo.phone = value
          this.setData({
            xian: {
              ...this.data.xian,
              phone: value
            }
          })
        },
        () => {
          this.setData({
            xian: this.data.xian
          })
        }
      )
    }
    this.setData({
      xian: {
        ...this.data.xian,
        // nickname: e.detail.value
      }
    });
  },

  bindPickerHeightChange(e) {
    const value = this.data.heightList[e.detail.value]
    if (value !== this.data.xian.height) {
      this.editInfo(
        { height: value },
        () => {
          app.globalData.userInfo.height = value
          this.setData({
            xian: {
              ...this.data.xian,
              height: value
            }
          })
        }
      )
    }
  },

  bindPickerWeightChange(e) {
    const value = this.data.weightList[e.detail.value]
    if (value !== this.data.xian.weight) {
      this.editInfo(
        { weight: value },
        () => {
          app.globalData.userInfo.weight = value
          this.setData({
            xian: {
              ...this.data.xian,
              weight: value
            }
          })
        }
      )
    }
  },

  bindPickerSportChange(e){
    const value = this.data.sportList[e.detail.value]
    if (value !== this.data.xian.sport_target){
      this.editInfo(
        { sport_target: value },
        ()=>{
          app.globalData.userInfo.sport_target = value
          this.setData({
            xian:{
              ...this.data.xian,
              sport_target: value
            }
          })
        }
      )
    }
  },

  editInfo(value,sfun,efun){
    app.showLoading('修改中')
    app.request({
      url: app.api.getUserDetails,
      method:'PUT',
      data:value
    }).then(res=>{
      wx.hideLoading()
      sfun()
    }).catch(err=>{
      wx.hideLoading()
      app.show('修改失败')
      efun ? efun():''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      obj: {
        ...app.globalData.userInfo
      },
      headimg: app.globalData.userInfo.headimgurl,
      xian:{
        nickname: app.globalData.userInfo.nickname,
        name: app.globalData.userInfo.name,
        phone: app.globalData.userInfo.phone,
        height: app.globalData.userInfo.height,
        weight: app.globalData.userInfo.weight,
        sport_target: app.globalData.userInfo.sport_target,
      }
    })
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