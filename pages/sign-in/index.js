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
    wx.setNavigationBarTitle({ title: '登录' });
  },
  formSubmit:function(e) {
    var that = this;
    var data = e.detail.value;
    var phone = data.phone;
    if(phone.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon:'success',
        duration: 1500
      })
      return false;
    }
    if (phone.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (! myreg.test(phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
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
            url: "/pages/personal-center/index?isLogin="+isLogin
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