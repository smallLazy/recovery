// pages/me/index.js
Page({
  data: {
    src: './images/logo.jpg',
    isLogin: false,
    btnBackcolor: '#FCDFD1',
    btnTextColor: '#887566',
    textColor: '#b9b9b9',
    isClickable: false,
    codeText: "获取验证码",
    btnClickable: false,
    isClickable1: false,
    phoneNo: ''
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
  formSubmit: function (e) {
    if (!this.data.btnClickable) {
      return;
    }
    var that = this;
    var data = e.detail.value
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 1500
    })
    wx.switchTab({
      url: '../../pages/order/order'
    });
    wx.request({
      url: 'http://www.lazyfei.top/api/user/check-login',
      data: {
        phone: data.phone,
        vcode: data.vcode
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
      } 
    });

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

  },
  listenerCodeInput: function (e) {
    var that = this;
    var value = e.detail.value;
    if (value.length == 4) {
      that.data.isClickable1 = true;
    } else {
      that.data.isClickable1 = false;
    }
    if (that.data.isClickable1 && that.data.isClickable) {
      that.setData({
        btnBackcolor: '#F16621',
        btnTextColor: '#ffffff',
        btnClickable: true
      })
    } else {
      that.setData({
        btnBackcolor: '#FCDFD1',
        btnTextColor: '#887566',
        btnClickable: false
      })
    }
  },

  listenerPhoneInput: function (e) {
    var that = this;
    var value = e.detail.value;
    if (value.length == 11) {
      that.setData({
        textColor: '#F27430',
        isClickable: true,
        phoneNo: value
      })
    } else {
      that.setData({
        textColor: '#b9b9b9',
        isClickable: false
      })
    }
    if (that.data.isClickable1 && that.data.isClickable) {
      that.setData({
        btnBackcolor: '#F16621',
        btnTextColor: '#ffffff',
        btnClickable: true
      })
    } else {
      that.setData({
        btnBackcolor: '#FCDFD1',
        btnTextColor: '#887566',
        btnClickable: false
      })
    }
  },
  getVerifyingCode: function () {
    var that = this;
    if (that.data.isClickable) {
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      console.log("aa" + that.data.phoneNo);
      if (myreg.test(that.data.phoneNo)) {
        that.countdown();
      } else {
        wx.showToast({
          title: '手机号有误！',
          icon: 'none',
          duration: 1500
        })
      }

    }
  },
  countdown: function () {
    wx.showToast({
      title: '获取验证码成功',
      icon: 'none',
      duration: 1500
    })
    var that = this;
    var count = 60;
    that.setData({
      textColor: '#333',
      isClickable: false,
      codeText: count + "s"
    });
    count--;
    var interval = setInterval(function () {
      if (count < 0) {
        clearInterval(interval);
        that.setData({
          textColor: '#F27430',
          codeText: '重新获取',
          isClickable: true
        })
      } else {
        that.setData({
          textColor: '#333',
          isClickable: false,
          codeText: count + "s"
        })
      }
      count--;
    }.bind(this), 1000)
  }
})