//app.js
import util from './utils/util.js'
import api from './config/api.js'
import request from './utils/request.js'
import md5 from './md5/md5.js'
import { filterCooName, getAddressList, getDistance} from './utils/mapApi.js'
App({
  onLaunch: function (options) {
    
  },

  onShow: function () {
    
  },

  onHide: function () {
    
  },

  onError: function (msg) {
    
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
  api:api,
  // appid: 'LYWLIocj1B0CFBLH2hoM',
  appid: 'LYWLnKP6br61RfKw0zrJ',
  // secret: 'WgngGdw5Bufzgit0R4iI71hSXmVSpLTo',
  secret:'3PeJGWDi387UrRdNNWmn0b5Kix68xg7n',
  mapApi: filterCooName,
  getAddressList: getAddressList,
  getDistance: getDistance,
  md5:md5,
  util:util,
  request: request,
  nowCodeId:'',                   //选中设备id
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
  globalData: {
    userInfo:{}
  }
})