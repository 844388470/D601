// pages/motion/motion.js
import * as echarts from '../../ec-canvas/echarts.min.js';
import initCalendar, { getSelectedDay} from '../../components/calendar/index';
let chart = null
const app = getApp();

Page({
  data: {
    array: [],
    equName: '',
    equIndex: '',
    ec: {
      lazyLoad:true
    },
    caleState:false,
    echartData:[],
    activeIndex:0,
    stepNumber:0,
    mileage:0,
    average:0,
    time: app.util.formatTime(new Date()).substr(0,10)
  },

  setTime(){                                      //打开日历
    this.setData({
      caleState:true
    })
  },

  afterTapDay(){                                  //选择日期之后执行
    const day = getSelectedDay()[0]
    this.setData({
      caleState: false,
      time: `${day.year}-${day.month > 9 ? day.month : '0' + day.month}-${day.day > 9 ? day.day : '0' + day.day}`
    })
    this.dispose()
    // this.init(111)
  },

  getData(){
    app.showLoading('获取中')
    app.request({
      url: `${app.api.getSteps}${this.data.equIndex}/steps`,
      method: 'get',
      data: {
        start: app.util.formatTimes(new Date(this.data.time).getTime() - 6 * 86400000).substr(0, 8),
        end: app.util.formatTimes(new Date(this.data.time).getTime()).substr(0, 8)
      }
    }).then(res => {
      wx.hideLoading()
      this.init(res)
    }).catch(err => {
      wx.hideLoading()
      app.show('获取失败')
    })
  },

  da(){
    return false
  },

  canelZhe(e){                                                   //点击外层遮罩
    this.setData({
      caleState:false
    })
  },

  setArray() {                                                   //设置设备
    this.setData({
      array: app.nowCodeList,
      equName: app.nowCodeList[0].name || '',
      equIndex: app.nowCodeList[0].id || '',
    })
  },

  setSelect() {                                                  //设置当前设备的名称
    this.setData({
      indexs: app.util.filterIdName(app.nowCodeList, app.nowCodeId)
    })
  },

  bindPickerChange(e) {                                          //切换设备
    if (!app.nowCodeList.length) {
      return
    }
    this.setData({
      equName: this.data.array[e.detail.value].name,
      equIndex: this.data.array[e.detail.value].id,
    })
    this.dispose()
  },

  init(data) {
    this.selectComponent('#mychart-dom-bar').init((canvas, width, height) => {
      let resName = [], resData = [], total=0
      for (let i = 0; i < 7; i++){
        let timeA = app.util.formatTimes(new Date(this.data.time).getTime() - (6-i) * 86400000).substr(0, 8)
        let timeB = app.util.formatTime(new Date(this.data.time).getTime() - (6-i) * 86400000).substr(0, 10)
        if (data.filter(res => res.day == timeA).length){
          let steps = data.filter(res => res.day == timeA)[0].steps
          resName.push(timeB)
          resData.push(steps)
          total = total + steps
        }else{
          resName.push(timeB)
          resData.push(0)
          total = total + 0
        }
      }
      this.setData({
        average: Math.round(total/7)
      })
      let chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      chart.setOption({
        color: ['#02ad00'],
        tooltip:{
          trigger: 'none',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: 10,
          right: 20,
          bottom: 15,
          top: 10,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return '步数  ' + params.value
                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                }
              }
            },
            data: resName
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              color: '#666'
            }
          }
        ],
        series: [
          {
            type: 'line',
            data: resData,
          }
        ]
      });
      this.chart = chart
      return chart;
    });
  },

  tapActive(e){
    if (e.target.dataset.type==1){
      this.setData({
        activeIndex: e.target.dataset.type,
        stepNumber:50000,
        mileage:20,
        echartData: [{ name: '2017-06-10', id: 20 }, { name: '2017-06-11', id: 40 }, { name: '2017-06-12', id: 60 }, { name: '2017-06-13', id: 80 }, { name: '2017-06-14', id: 100 }, { name: '2017-06-15', id: 120 }]
      })
    } else if (e.target.dataset.type == 2){
      this.setData({
        activeIndex: e.target.dataset.type,
        stepNumber: 350000,
        mileage: 140,
        echartData: [{ name: '第31周', id: 435 }, { name: '第31周', id: 721 }, { name: '第31周', id: 60 }, { name: '第31周', id: 880 }, { name: '第31周', id: 124 }]
      })
    } else if (e.target.dataset.type == 3) {
      this.setData({
        activeIndex: e.target.dataset.type,
        stepNumber: 1500000,
        mileage: 600,
        echartData: [{ name: '2017-06', id: 1200 }, { name: '2017-07', id: 3400 }, { name: '2017-08', id: 5555 }, { name: '2017-09', id: 6666 }, { name: '2017-10', id: 1024 }, { name: '2017-11', id: 5430 }]
      })
    }
    this.dispose()
  },

  dispose() {
    if (this.chart){
      this.chart.dispose()
    }
    this.getData()
  },

  onLoad: function (options) {
    initCalendar({
      multi: false, // 是否开启多选,
      afterTapDay: () => { this.afterTapDay() },
    })
    this.setArray()
    this.dispose()
  },



  onReady: function () {

  },
})
