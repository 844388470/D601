const request = function (option) {
  const needLogin = option.needLogin || false; //判断是否登录跳转到登录页
  const token = wx.getStorageSync("token") || null;
  return new Promise((resolve, reject)=>{
    if (needLogin) {
      if (!token) {
        wx.navigateTo({
          url: "../pages/login/signIn/signIn"
        });
        return;
      }
    }
    wx.showNavigationBarLoading()
    wx.request({
      url: option.url,
      data: option.data,
      method: option.method,
      header: {
        "jwt": token,
        ...option.header
      },
      success: function (res) {
        wx.hideNavigationBarLoading()
        if (res.statusCode === 200) {
          resolve(res.data);
        } else if (res.data.message) {
          wx.showToast({ title: res.data.message, icon: 'none', duration: 2000 })
        } else {
          wx.showToast({ title: '请求服务器错误' + res.data, icon: 'none', duration: 2000 })
        }
      },
      fail: function (err) {
        wx.showToast({ title: '请求服务器错误' + err, icon: 'none', duration: 2000 })
        wx.hideNavigationBarLoading()
        reject(err)
      }
    })
  });
}
export default request;