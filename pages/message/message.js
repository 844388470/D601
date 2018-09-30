
const app = getApp();
Page({
  data: {
    array: [],
    indexs: '',
    startDate: app.util.formatTime(new Date()).substring(0, 10),
    startTime: '00:00',
    endDate: app.util.formatTime(new Date()).substring(0, 10),
    endTime: '23:59',
  },
  onShow() {
    this.setSelectName()
  },
  onHide() {
    
  },
  onLoad() {
    
  },

  bindPickerChange(e) {                                          //切换设备
    if (!app.nowCodeList.length) {
      return
    }
    app.nowCodeId = app.nowCodeList[e.detail.value].deviceNo
    this.setSelectName()
  },

  bindStartDate(e) {
    this.setData({
      startDate: app.util.formatTime(e.detail.value).substring(0, 10)
    })
  },

  bindStartTime(e) {
    this.setData({
      startTime: `${e.detail.value}`
    })
  },

  bindEndDate(e) {
    this.setData({
      endDate: app.util.formatTime(e.detail.value).substring(0, 10)
    })
  },

  bindEndTime(e) {
    this.setData({
      endTime: `${e.detail.value}`
    })
  },

  setSelectName() {                                                  //设置当前设备的名称
    this.setData({
      array: app.nowCodeList,
      indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'deviceNo', 'deviceNickname'),
    })
  },

  goChaXun() {
    if (!app.nowCodeId) {
      wx.showToast({
        title: '无设备',
        icon: 'none'
      })
      return
    }
    if (new Date(`${this.data.startDate} ${this.data.startTime}:00`).getTime() > new Date(`${this.data.endDate} ${this.data.endTime}:59`).getTime()) {
      wx.showToast({
        title: '开始时间不得大于结束时间',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: `../motion/motion?startDate=${this.data.startDate}&endDate=${this.data.endDate}&startTime=${this.data.startTime}&endTime=${this.data.endTime}&id=${app.nowCodeId}`
    })
  },
})