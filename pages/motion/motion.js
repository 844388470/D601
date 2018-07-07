// pages/motion/motion.js
import * as echarts from '../../ec-canvas/echarts.min.js';

let chart=null
const app = getApp();

Page({
  data: {
    // array: [],
    // indexs: '',
    ec: {
      lazyLoad:true
    },
    echartData:[],
    activeIndex:0,
    stepNumber:0,
    mileage:0
  },

  setArray() {                                                   //设置设备
    this.setData({
      array: app.nowCodeList
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
    app.nowCodeId = app.nowCodeList[e.detail.value].id
    // this.getIndex()
  },

  init: function () {
    this.selectComponent('#mychart-dom-bar').init((canvas, width, height) => {
      let resName=[],resData=[]
      for (let i = 0; i < this.data.echartData.length;i++){
        resName.push(this.data.echartData[i].name)
        resData.push(this.data.echartData[i].id)
      }
      let chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      chart.setOption({
        color: ['#9c9'],
        grid: {
          left: 10,
          right: 10,
          bottom: 15,
          top: 10,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            nameRotate:'60',
            data: resName,
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
            name: '热度',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: resData,
            itemStyle: {
              // emphasis: {
              //   color: '#37a2da'
              // }
            }
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
    this.chart.dispose()
    this.init()
  },

  onLoad: function (options) {
      // this.init()
      // let obj={
      //   target:{
      //     dataset:{
      //       type : 1
      //     }
      //   }
      // }
      // this.tapActive(obj)
      this.init()
  },



  onReady: function () {

  },
})
