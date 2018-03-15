// pages/unlogin/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // isLogin: false,
    phone : ''
  },
  login:function() {
    wx.navigateTo({
      url:"/pages/me/index"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '个人中心' });
      this.setData({
        isLogin: options.isLogin
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var that = this;
    // wx.request({
    //   url: 'https://www.lazyfei.top/api/user/get-user-info',
    //   success:function(res) {
    //     that.setData({
    //       phone:res.data.phone,
    //       userName:res.data.user_name
    //     })
    //   }
    // })
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