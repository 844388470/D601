
const app = getApp();
const hour = []
const minute = []
const second = []

for (let i = 0; i <= 23; i++) {
  hour.push({ value: i, name: (i > 9 ? i : '0' + i) })
}

for (let i = 0; i <= 59; i++) {
  minute.push({ value: i, name: (i > 9 ? i : '0' + i) })
}

for (let i = 0; i <= 59; i++) {
  second.push({ value: i, name: (i > 9 ? i : '0' + i) })
}
Page({
  data: {
    array: [],
    indexs: '',
    model: '',
    startDate: app.util.formatTime(new Date()).substring(0, 10),
    startTime: '00:00:00',
    endDate: app.util.formatTime(new Date()).substring(0, 10),
    endTime: '23:59:59',
    setTime: null,
    page: 1,
    lists: [hour, minute, second],
    value1: [0, 0, 0],
    value2: [23, 59, 59]
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
    let [i, j, k] = [...e.detail.value]
    this.setData({
      startTime: `${i > 9 ? i : '0' + i}:${j > 9 ? j : '0' + j}:${k > 9 ? k : '0' + k}`,
      value1: e.detail.value
    })
  },

  bindEndDate(e) {
    this.setData({
      endDate: app.util.formatTime(e.detail.value).substring(0, 10)
    })
  },

  bindEndTime(e) {
    let [i, j, k] = [...e.detail.value]
    this.setData({
      endTime: `${i > 9 ? i : '0' + i}:${j > 9 ? j : '0' + j}:${k > 9 ? k : '0' + k}`,
      value2: e.detail.value
    })
  },

  setSelectName() {                                                  //设置当前设备的名称
    this.setData({
      indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'deviceNo', 'deviceNickname'),
      array: app.nowCodeList
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
    if (new Date(`${this.data.startDate} ${this.data.startTime}`).getTime() > new Date(`${this.data.endDate} ${this.data.endTime}`).getTime()) {
      wx.showToast({
        title: '开始时间不得大于结束时间',
        icon: 'none'
      })
      return
    }
    const start = this.data.startDate.split('-').join('') + this.data.startTime.split(':').join('')
    const end = this.data.endDate.split('-').join('') + this.data.endTime.split(':').join('')
    wx.navigateTo({
      url: `../map/map?start=${start}&end=${end}`
    })
  }
})