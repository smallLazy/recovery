// pages/me/index.js
Page({
  data: {
    src: './images/logo.jpg',
    isLogin: false
  },
  

  /**
   * 页面的初始数据
   */
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  formSubmit:function(e) {
    var that = this;
    var data = e.detail.value;
    wx.request({
      url: 'https://www.lazyfei.top/api/user/check-login',
      data: data,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success:function(res){
        var data = res.data;
        that.setData({
          isLogin: true
        });
        if(data.code == 200) {
          // console.log(that.data.isLogin)
          var isLogin = that.data.isLogin;
          wx.reLaunch({
            url: "/pages/unlogin/index?isLogin="+isLogin
          })
        }
      }
    })
  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //发起网络请求    
    //       console.log(res.code)
    //     } else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // });
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