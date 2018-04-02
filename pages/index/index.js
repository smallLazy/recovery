//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    order: [],
    orderdata:[]
    //
    // polyline: [{
    //   points: [{
    //     longitude: '116.481451',
    //     latitude: '40.006822'
    //   }, {
    //     longitude: '116.487847',
    //     latitude: '40.002607'
    //   }, {
    //     longitude: '116.496507',
    //     latitude: '40.006103'
    //   }],
    //   color: "#FF0000DD",
    //   width: 3,
    //   dottedLine: true
    // }],
    },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  receiveOrder:function(e) {
    var order_id = e.target.id
    wx.request({
      url: 'http://www.lazyfei.top/api/order/receive-order',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      data:{
        rec_id:wx.getStorageSync('user_id'),
        key: wx.getStorageSync('acc_key'),
        order_id: order_id, // （订单的id）
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: "接单成功",
            icon: 'success',
            duration: 1500
          });
        }
      }
    })
  },
  // 焦点事件
  getAddress: function (e) {
    wx.navigateTo({
      url:'./map', 
      success:function() { },        //成功后的回调；
  })
      // wx.getLocation({
      //   type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      //   success: function (res) {
      //     // success  
      //     wx.chooseLocation({
      //       success:function(res) {
      //         var address = res.address;
      //       }
      //     })
      //   }
      // })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://www.lazyfei.top/api/order/order-list',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function(res) {
        that.setData({
          orderdata: res.data
        })
        // console.log(orderdata);
        
      }

    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})