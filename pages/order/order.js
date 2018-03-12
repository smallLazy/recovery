// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDis:'no-display'
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  /**
   * 获取地图地址返回到页面上
   */
  getAdd:function(e) {
    var that = this;
    var add =  wx.chooseLocation({
      success: function(res) {
        // return res.address;
        var add = res.address;
        that.setData({
          address: add
        })
      },
    });
  },

  /**
   * 点击预约出现 时间选择
   */
  bespeak:function(e) {
    this.setData({
      isDis:'display'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '订单详情' });
    var is_dis = false;
    if(is_dis) {
      
    }
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