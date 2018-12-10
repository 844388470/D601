var dateTimePicker = require('../../utils/timeUtil.js');
const app = getApp();
Page({
  data: {
    array: [],
    indexs: '',
    model: '',
    dateTimeList: null,
    dateTimeValue: null,
    dateTime: null,
    dateTimeZ: null,
    dateTimeList2: null,
    dateTimeValue2: null,
    dateTime2: null,
    dateTimeZ2: null,
    setTime: null,
    page: 1,
  },

  onShow() {
    this.setSelectName()
  },

  onHide() {
    
  },

  onLoad() {
    var arr = dateTimePicker.dateTimePicker().dateTime, dateArr = dateTimePicker.dateTimePicker().dateTimeArray;
    var arr1 = [arr[0], arr[1], arr[2], 0, 0, 0], arr2 = [arr[0], arr[1], arr[2], 23, 59, 59]
    this.setData({
      dateTime: arr1,
      dateTimeZ: arr1,
      dateTimeList: dateArr,
      dateTimeValue: `${dateArr[0][arr1[0]]}-${dateArr[1][arr1[1]]}-${dateArr[2][arr1[2]]} 00:00:00`,
      dateTime2: arr2,
      dateTimeZ2: arr2,
      dateTimeList2: dateArr,
      dateTimeValue2: `${dateArr[0][arr2[0]]}-${dateArr[1][arr2[1]]}-${dateArr[2][arr2[2]]} 23:59:59`,
    });
  },

  

  bindPickerChange(e) {                                          //切换设备
    if (!app.nowCodeList.length) {
      return
    }
    app.nowCodeId = app.nowCodeList[e.detail.value].deviceNo
    this.setSelectName()
  },

  changeDateTime(e) {
    var arr = e.detail.value, dateArr = this.data.dateTimeList;
    this.setData({
      dateTime: e.detail.value,
      dateTimeZ: e.detail.value,
      dateTimeValue: `${dateArr[0][arr[0]]}-${dateArr[1][arr[1]]}-${dateArr[2][arr[2]]} ${dateArr[3][arr[3]]}:${dateArr[4][arr[4]]}:${dateArr[5][arr[5]]}`
    });
  },

  cancelChangeDateTime() {
    this.setData({
      dateTime: this.data.dateTimeZ
    })
  },

  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeList;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeList: dateArr,
    });
  },

  changeDateTime2(e) {
    var arr = e.detail.value, dateArr = this.data.dateTimeList2;
    this.setData({
      dateTime2: e.detail.value,
      dateTimeZ2: e.detail.value,
      dateTimeValue2: `${dateArr[0][arr[0]]}-${dateArr[1][arr[1]]}-${dateArr[2][arr[2]]} ${dateArr[3][arr[3]]}:${dateArr[4][arr[4]]}:${dateArr[5][arr[5]]}`
    });
  },

  cancelChangeDateTime2() {
    this.setData({
      dateTime2: this.data.dateTimeZ2
    })
  },

  changeDateTimeColumn2(e) {
    var arr = this.data.dateTime2, dateArr = this.data.dateTimeList2;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeList2: dateArr,
    });
  },

  setSelectName() {                                                  //设置当前设备的名称
    this.setData({
      indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId, 'deviceNo', 'deviceNo').substr(-4),
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
    if (new Date(`${this.data.dateTimeValue}`).getTime() > new Date(`${this.data.dateTimeValue2}`).getTime()) {
      wx.showToast({
        title: '开始时间不得大于结束时间',
        icon: 'none'
      })
      return
    }
    const start = this.data.dateTimeValue.split('-').join('').split(':').join('').split(' ').join('')
    const end = this.data.dateTimeValue2.split('-').join('').split(':').join('').split(' ').join('')
    wx.navigateTo({
      url: `../map/map?start=${start}&end=${end}`
    })
  }
})