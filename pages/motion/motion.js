const app = getApp();
Page({
  data: {
    array: [],
    indexs: '',
    list: [],
    indexs: '',
    userId: '',
    setTime: null,
    setTimeoat: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    
  },
  onHide() {
    
  },
  onLoad(options) {
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      openid: wx.getStorageSync('openid'),
      deviceNo: options.id,
    }
    app.showLoading('获取消息中...')
    app.request({
      url: app.api.getMessage,
      method: 'post',
      data: {
        ...data,
        startTime: `${options.startDate.split('-').join('')}${options.startTime.split(':').join('')}00`,
        endTime: `${options.endDate.split('-').join('')}${options.endTime.split(':').join('')}59`,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(ress => {
      app.hideLoading()
      if (ress.code === 0) {
        const res = ress.messagelist
        const list = []
        for (let i in res) {
          const filterL = list.filter(obj => obj.time.substr(0, 10) == res[i].time.substr(0, 10))
          if (filterL.length) {
            filterL[0].list.push({
              ...res[i],
              time: res[i].time.substr(11)
            })
          } else {
            list.push({
              time: res[i].time.substr(0, 10) + ' ' + app.util.timeWeek(res[i].time),
              list: [{
                ...res[i],
                time: res[i].time.substr(11)
              }]
            })
          }
        }
        if (list.length){
          this.setData({
            list: list ,
          })
        }else{
          app.show('该时间段无消息')
        }
      } else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.hideLoading()
      app.show('获取失败,请返回重试')
    })
  }
})