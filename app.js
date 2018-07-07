//app.js
import util from './utils/util.js'
import api from './config/api.js'
import request from './utils/request.js'
import filterCooName from './utils/mapApi.js'
App({
  onLaunch: function (options) {
    // Do something initial when launch.
  },
  onShow: function (options) {
    console.log('show')
  },
  onHide: function () {
    console.log('hide')
  },
  onError: function (msg) {
    console.log(msg)
  },
  api:api,
  mapApi: filterCooName,
  util:util,
  request: request,
  nowCodeId:'',
  nowCodeList: [],
  aroundList: [],
  aroundAddObj:{
    state:'add',
    name:'',
    longitude:'',
    latitude:'',
    radius:''
  },
  globalData: 'I am global data'
})