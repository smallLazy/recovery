var util = require('../../utils/util.js');
var app = getApp();
var httpEngine = require('../../utils/netUtil/HttpEngine.js');
Page({
  data: {
    src: './images/logo.png',
    isLogin: false,
    btnBackcolor: '#d2f7a8',
    btnTextColor: 'gray',
    textColor: '#b9b9b9',
    isClickable: false,   //手机号输入框是否正确
    codeText: "获取验证码",
    btnClickable: false,
    isClickable1: false,  //验证码输入框是否正确
    phoneNo: '',
    isClickable2: true    //验证码是否不处在倒计时
  },


  /**
   * 页面的初始数据
   */


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var key = wx.getStorageSync('acc_key');
    if (key != null && key != "") {
      wx.switchTab({
        url: '../../pages/order/place_order'
      });
      return;
    }
    wx.setNavigationBarTitle({ title: '收货员注册' });

  },
  formSubmit: function (e) {
    // wx.setStorageSync('acc_key', '123');
    // wx.switchTab({
    //   url: '../../pages/order/place_order'
    // });
    // return;
    if (!this.data.btnClickable) {
      return;
    }
    var phoneNo = e.detail.value.phone;
    var vcode = e.detail.value.vcode;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(this.data.phoneNo)) {
      wx.showToast({
        title: '手机号输入有误！',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    var that = this;
    var data = e.detail.value;
    var user_name = data.user_name;
    var idcard = data.idcard;
    var adress = data.adress;
    if (!util.isEmpty(user_name) && !util.isEmpty(idcard) && !util.isEmpty(adress)) {
      if (!util.IdCardValidate(idcard)){
        wx.showToast({
          title: '身份证格式不正确',
          icon: 'none',
          duration: 1500
        })
        return;
      }
    } else {
      wx.showToast({
        title: '请完善个人信息',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    wx.login({
      success: function (res) {
        httpEngine.executePost(app.globalData.urls.loginUrl, {
          code: res.code,
          phone: phoneNo,
          vcode: vcode,
          idcard: idcard,
          user_name: user_name},
          function(data){
            wx.setStorageSync('acc_key', data.key);
            wx.setStorageSync('user_id', data.id);
            wx.setStorageSync('user_status', data.user_status);
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1500
            })
            wx.switchTab({
              url: '../../pages/order/place_order'
            });
          },null,null);
      }
    })
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

  },
  listenerCodeInput: function (e) {
    var that = this;
    var value = e.detail.value;
    if (value.length == 6) {
      that.data.isClickable1 = true;
    } else {
      that.data.isClickable1 = false;
    }
    if (that.data.isClickable1 && that.data.isClickable) {
      that.setData({
        btnBackcolor: '#77e35c',
        btnTextColor: '#ffffff',
        btnClickable: true
      })
    } else {
      that.setData({
        btnBackcolor: '#d2f7a8',
        btnTextColor: 'gray',
        btnClickable: false
      })
    }
  },

  listenerPhoneInput: function (e) {
    var that = this;
    var value = e.detail.value;
    if (value.length == 11) {
      that.setData({
        isClickable: true,
        phoneNo: value
      })
      if (that.data.isClickable2) {
        that.setData({
          textColor: '#77e35c'
        })
      }
    } else {
      that.setData({
        isClickable: false
      })
      if (that.data.isClickable2) {
        that.setData({
          textColor: '#b9b9b9'
        })
      }
    }
    if (that.data.isClickable1 && that.data.isClickable) {
      that.setData({
        btnBackcolor: '#77e35c',
        btnTextColor: '#ffffff',
        btnClickable: true
      })
    } else {
      that.setData({
        btnBackcolor: '#d2f7a8',
        btnTextColor: 'gray',
        btnClickable: false
      })
    }
  },
  getVerifyingCode: function () {
    var that = this;
    if (that.data.isClickable && that.data.isClickable2) {
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (myreg.test(that.data.phoneNo)) {
        httpEngine.executePost(app.globalData.urls.getVerifyingCode, { phone: that.data.phoneNo},function(data){
          wx.showToast({
            title: '获取验证码成功',
            icon: 'success',
            duration: 1500
          })
          that.countdown();
        },null,null)
      } else {
        wx.showToast({
          title: '手机号输入有误！',
          icon: 'none',
          duration: 1500
        })
      }
    }
  },
  checkRegister: function (e) {
    var that = this;
    var data = e.detail.value;
    var user_name = data.user_name;
    var idcard = data.idcard;
    var adress = data.adress;
    if (!util.isEmpty(user_name) && !util.isEmpty(idcard) && !util.isEmpty(adress)){
      return true;
    }else{
      wx.showToast({
        title: '请完善个人信息',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
  },
  countdown: function () {
    var that = this;
    var count = 60;
    that.setData({
      textColor: '#333',
      isClickable2: false,
      codeText: count + "s"
    });
    count--;
    var interval = setInterval(function () {
      if (count < 0) {
        clearInterval(interval);
        if (!that.data.isClickable) {
          that.setData({
            textColor: '#b9b9b9',
            codeText: '重新获取',
            isClickable2: true
          })
        } else {
          that.setData({
            textColor: '#77e35c',
            codeText: '重新获取',
            isClickable2: true
          })
        }

      } else {
        that.setData({
          textColor: '#333',
          codeText: count + "s"
        })
      }
      count--;
    }.bind(this), 1000)
  }
}
)
