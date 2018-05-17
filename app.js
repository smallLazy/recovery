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
    // urlheader: "https://www.lazyfei.top/api/",
    urls:{
      loginUrl: "https://www.lazyfei.top/api/" + "login/to-login",
      placeOrder: "https://www.lazyfei.top/api/" + "order/place-an-order",
      getOrder: "https://www.lazyfei.top/api/" + "order/order-list",
      myOrder: "https://www.lazyfei.top/api/" + "order/order-list",
      getVerifyingCode: "https://www.lazyfei.top/api/"+"login/get-phone-vcode",
      getAddress:"https://www.lazyfei.top/api/"+"address/show",
      addAddress:"https://www.lazyfei.top/api/"+ "address/add",
      delAddress:'https://www.lazyfei.top/api/'+"address/del",
      getOneAdd:"https://www.lazyfei.top/api/"+"address/get-add-by-id",
      editAddress: "https://www.lazyfei.top/api/" + "address/edit-addr",
      receiveOrder: "https://www.lazyfei.top/api/" +"order/receive-order",
      delAddress:'https://www.lazyfei.top/api/'+"address/del"
    }
  },
  onShow:function(){

  }
})
