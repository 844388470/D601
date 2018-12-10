// pages/equipment/isIdCard/isIdCard.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idCard:'',
    imei:'',
    setId:'',
    screct:''
  },


  changeIdCard(e){
    this.setData({
      idCard: e.detail.value
    })
  },

  getInputCode(e) {
    this.setData({
      imei: e.detail.value
    })
  },

  getInputKey(e) {
    this.setData({
      screct: e.detail.value
    })
  },

  saoma() {
    let that = this
    wx.scanCode({
      success: function (res) {
        console.log(res.result)
        if (typeof res.result == 'string') {
          try {
            const obj = res.result.split(',')
            that.setData({
              imei: obj[0],
              screct: obj[1] || ''
            })
          } catch (e) {
            app.show('无法解析')
          }
        }
      }
    })
  },

  judge(){
    if (!this.data.idCard){
      app.show('请输入身份证号码')
      return 
    }   
    
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      deviceNo: this.data.imei,
      idCard: this.data.idCard,
    }
    app.showLoading('证件校验中')
    app.request({
      url: app.api.isRegister,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase(),
      }
    }).then(res => {
      app.hideLoading()
      if (res.code=='0'){
        this.AddEqu()
      } else if (res.code == '2'){
        app.show('该设备不存在')
      } else if (res.code == '0') {
        app.show('该身份证号不存在')
      }else{
        return Promise.reject()
      }
    }).catch((err) => {
      app.show('校验失败，请重试')
    })
  },

  // getEquInfo(id) {
  //   const data = {
  //     appid: app.appid,
  //     dt: parseInt(new Date().getTime() / 1000),
  //     secret: app.secret,
  //     deviceNo: this.data.imei,
  //   }
  //   app.showLoading('获取宠物信息')
  //   app.request({
  //     url: app.api.getEquInfo,
  //     method: 'post',
  //     data: {
  //       ...data,
  //       sign: app.md5(app.util.getsign(data)).toUpperCase()
  //     }
  //   }).then(res => {
  //     app.hideLoading()
  //     if (res.code === 0) {
  //       for (let i in res.customerFields){
  //         if (res.customerFields[i].content){
  //           this.getList()
  //           return 
  //         }
  //       }
  //       this.getPetOrUser()
  //     } else {
  //       return Promise.reject()
  //     }
  //   }).catch((err) => {
  //     app.hideLoading()
  //     app.show('获取失败,设备码或者密钥有误')

  //   })
  // },

  // getPetOrUser(){
  //   const data = {
  //     idCard: this.data.idCard,
  //     random: Math.ceil(Math.random() * 99999)
  //   }
  //   app.showLoading('获取主人信息')
  //   app.request({
  //     url: app.api.getPetOrUser,
  //     method: 'post',
  //     data: {
  //       ...data,
  //       sig: app.md5(app.util.getsign(data, true)),
  //     }
  //   }).then(res => {
  //     app.hideLoading()
  //     if(res.code==='0'){
  //       this.setEquInfo(res.map)
  //     }else{
  //       return Promise.reject()
  //     }
  //   }).catch((err) => {
  //     app.show('获取宠物主人信息失败')
  //   })
  // },

  // setEquInfo(map){
  //   if (!map.petData || !map.userData){
  //     app.show('无信息')
  //     return
  //   }
  //   let obj = { ...map.petData, ...map.userData }, dataInfo = []
  //   const data = {
  //     appid: app.appid,
  //     dt: parseInt(new Date().getTime() / 1000),
  //     secret: app.secret,
  //     deviceNo: this.data.imei,
  //     openid: wx.getStorageSync('openid'),
  //   }
  //   let filterlist = [{ id: 80, key: 'petName' }, { id: 81, key: 'petSex' }, { id: 82, key: 'petVariety' }, { id: 83, key: 'petColor' }, { id: 84, key: 'userName' }, { id: 85, key: 'userSex' }, { id: 86, key: 'phone' }, { id: 87, key: 'userAdress' }]
  //   for (let i in obj){
  //     const objlist = filterlist.filter(x => x.key == i)
  //     if (objlist.length && obj[i]){
  //       dataInfo.push({
  //         fieldId: objlist[0].id,
  //         content: objlist[0].id == 81 ? (obj[i] == 1 ? '雌性' : obj[i] == 2 ? '雄性' : '') : objlist[0].id == 85 ? (obj[i] == 1 ? '男性' : obj[i] == 2 ? '女性' : '') : obj[i]
  //       })
  //     }
  //   }
  //   app.showLoading('设置宠物信息中')
  //   app.request({
  //     url: app.api.editEquInfo,
  //     method: 'post',
  //     data: {
  //       ...data,
  //       fieldInfos: dataInfo.map(res => `${res.fieldId}:${res.content}`).join('#'),
  //       sign: app.md5(app.util.getsign(data)).toUpperCase()
  //     }
  //   }).then(res => {
  //     if (res.code === 0) {
  //       this.getList()
  //     } else {
  //       return Promise.reject()
  //     }
  //   }).catch((err) => {
  //     app.show('设置宠物信息失败')
  //   })
  // },

  AddEqu(){
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      openid: wx.getStorageSync('openid'),
      deviceNo: this.data.imei,
      deviceSerect: this.data.screct,
    }
    app.showLoading('设备绑定中')
    app.request({
      url: app.api.addEqu,
      method: 'post',
      data: {
        ...data,
        // deviceNickname: this.data.inputName,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      app.hideLoading()
      if (res.code === 0 || res.code === 4) {
        this.getList()
        // this.getEquInfo()
      } else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.hideLoading()
      app.show('绑定失败，请确认设备码或密钥是否正确。')
    })
  },

  getList() {                            //获取设备列表
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      openid: wx.getStorageSync('openid')
    }
    app.showLoading('获取列表中...')
    app.request({
      url: app.api.getEquList,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      app.hideLoading()
      if (res.code === 0) {
        app.nowCodeList = res.deviceList
        app.nowCodeId = res.deviceList[0].deviceNo
        wx.reLaunch({
          url: `../../my/my`
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
    this.setData({
      imei: options.imei,
      setId: options.setId,
      screct: options.screct,
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