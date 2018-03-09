// pages/index/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // markers: [{
    //   iconPath: "./images/ic_position.png",
    //   id: 0,
    //   latitude: 23.099994,
    //   longitude: 113.324520,
    //   width: 30,
    //   height: 30
    // }],
    // polyline: [{
    //   points: [{
    //     longitude: 113.3245211,
    //     latitude: 23.10229
    //   }, {
    //     longitude: 113.324520,
    //     latitude: 23.21229
    //   }],
    //   color: "#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        
      }
    })
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       map_width: res.windowWidth
    //       , map_height: res.windowHeight
    //       , controls: [{
    //         id: 1,
    //         iconPath: './images/input.jpg',
    //         position: {
    //           left: 0,
    //           top: res.windowHeight-50,
    //           width: res.windowWidth,
    //           height: 50
    //         },
    //         clickable: true
    //       }]
    //     })
    //   }
    // })
  }, 
  
  // getLngLat: function () {
  //   var that = this;
  //   this.mapCtx = wx.createMapContext("map");
  //   this.mapCtx.getCenterLocation({
  //     success: function (res) {

  //       that.setData({
  //         longitude: res.longitude
  //         , latitude: res.latitude
  //         , markers: [
  //           {
  //             id: 0
  //             , iconPath: "./images/ic_position.png"
  //             , longitude: res.longitude
  //             , latitude: res.latitude
  //             , width: 30
  //             , height: 30
  //           }
  //         ]
  //       })

  //     }
  //   })
  // }, 
  
  // regionchange(e) {
  //   // 地图发生变化的时候，获取中间点，也就是用户选择的位置
  //   if (e.type == 'end') {
  //     this.getLngLat()
  //   }
  // }, 
  
  markertap(e) {
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})