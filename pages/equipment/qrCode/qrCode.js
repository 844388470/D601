// pages/equipment/qrCode/qrCode.js
const QR = require("../../../qrcode/qrcode.js");
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '',
    values: '',    
    value: '',
    key:'',
    iamgeStates:false,
    download:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.formSubmit('111')
    this.getEquSerect(app.nowCodeList[app.equIndex].deviceNo, app.nowCodeList[app.equIndex].setNo)
  },

  getEquSerect(imei, id) {
    const data = {
      appid: app.appid,
      dt: parseInt(new Date().getTime() / 1000),
      secret: app.secret,
      deviceSetNo: id,
    }
    app.showLoading('生成二维码中')
    app.request({
      url: app.api.getEquSerect,
      method: 'post',
      data: {
        ...data,
        sign: app.md5(app.util.getsign(data)).toUpperCase()
      }
    }).then(res => {
      if (res.code === 0) {
        this.setData({
          value: imei,
          key: res.secert
        })
        this.formSubmit(`${imei},${res.secert}`)
      } else {
        return Promise.reject()
      }
    }).catch((err) => {
      app.hideLoading()
      app.show('获取失败')
    })
  },

  repeat(){
    this.getEquSerect(app.nowCodeList[app.equIndex].deviceNo, app.nowCodeList[app.equIndex].setNo)
  },

  setCanvasSize() {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 750;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      console.log("获取设备信息失败" + e);
    }
    return size;
  },

  createQrCode(url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    // setTimeout(() => { this.canvasToTempImage(url); }, 1000);
    this.canvasToTempImage(url)
  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage(url) {
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success:res=> {
        var tempFilePath = res.tempFilePath;
        this.setData({
          imagePath: tempFilePath,
          values: url,
          iamgeStates: false
        });
        app.hideLoading()
      },
      fail:res =>{
        this.setData({
          iamgeStates: true
        });
        app.hideLoading()
      }
    });
  },

  formSubmit(value) {
    var size = this.setCanvasSize();
    this.createQrCode(value, "mycanvas", size.w, size.h);
  },

  download(){
    this.setData({
      download: false
    })
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imagePath,
      success:(res)=>{
        app.show('保存成功')
      },
      fail: res => {
        this.setData({
          download: true
        })
      }
    })
  }
})