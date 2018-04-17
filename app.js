//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用功能，后续调用  接口不会弹窗询问
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    urls:{
      loginUrl: "http://www.lazyfei.top/api/" + "login/to-login",
      placeOrder: "http://www.lazyfei.top/api/" + "order/place-an-order",
      getOrder: "http://www.lazyfei.top/api/" + "order/order-list",
      myOrder: "http://www.lazyfei.top/api/" + "order/order-list",
      getVerifyingCode:"http://www.lazyfei.top/api/"+"login/get-phone-vcode",
      getAddress:"http://www.lazyfei.top/api/"+"address/show",
      addAddress:"http://www.lazyfei.top/api/"+ "address/add",
      receiveOrder: "http://www.lazyfei.top/api/" +"order/receive-order",
      delAddress:'http://www.lazyfei.top/api/'+"address/del"
    }
  },
  onShow:function(){

  }
})