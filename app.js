//app.js
import util from './utils/util.js'
import api from './config/api.js'
import request from './utils/request.js'
import { filterCooName, getAddressList, getDistance} from './utils/mapApi.js'
App({

  onError: function (msg) {
    console.log(msg)
  },

  show(msg){
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },

  showLoading(msg){
    wx.showLoading({
      title: `${msg}...`,
      mask: true
    })
  },

  hideLoading() {
    wx.hideLoading()
  },

  refapi:function(){
    this.api=api()
  },
  api:api(),
  mapApi: filterCooName,
  getAddressList: getAddressList,
  getDistance: getDistance,
  util:util,
  request: request,
  nowCodeId: '',   //选中设备id  
  nowCodeList: [],                //设备列表
  equIndex: '',                   //进入设置设备的顺序号
  aroundChange:false,             //是否修改或者新增围栏
  aroundList:[],                  //围栏数据
  aroundAddObj:{                  //有关电子围栏的数据
    state:'add',
    address:'',
    name:'',
    longitude:'',
    latitude:'',
    radius:'',
    index:''
  },
  messageState: false,
  historyState:false,
  globalData: {
    userInfo:{}
  }
})