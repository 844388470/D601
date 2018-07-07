const request = function (option) {
  const needLogin = option.needLogin || false; //判断是否登录跳转到登录页
  const token = wx.getStorageSync("token") || null;
  return new Promise((resolve, reject)=>{
    if (needLogin) {
      if (!token) {
        wx.navigateTo({
          url: "../login/signIn/signIn"
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
        "authorization": token,
        ...option.header
      },
      success: function (res) {
        wx.hideNavigationBarLoading()
        resolve(res.data);
      },
      fail: function (err) {
        wx.hideNavigationBarLoading()
        console.log("失败信息:", err);
        reject(err)
      }
    })
  });
}
export default request;