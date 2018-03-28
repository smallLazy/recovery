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
    phoneNo: '',
    isClickable2:false
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
    var phoneNo = e.detail.value.phone;
    var vcode = e.detail.value.vcode;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            'url': 'http://www.lazyfei.top/api/login/to-login', // 登录接口
            data: {
              code: res.code, // 必须传递
              phone: phoneNo, // 手机号
              vcode: vcode  // y验证码
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            success: function (res) {
              console.log(res.data);
              var key = res.data.key;
              // 这里我的缓存是测试，用的是同步，你之后写的用异步
              wx.setStorageSync('acc_key', key); // 成功写入缓存             
              if (res.data.code == 200) {
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 1500
                })
                wx.switchTab({
                  url: '../../pages/order/order'
                });
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500
                })
              }
            },
            fail:function(e){
              wx.showToast({
                title: "网络不好请重试~",
                icon: 'success',
                duration: 1500
              })
            }

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
    } else if (that.isClickable){
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
      if (myreg.test(that.data.phoneNo)) {
        wx.request({
          'url': 'http://www.lazyfei.top/api/login/get-phone-vcode', // 获取验证码接口
          data: {
            phone: that.data.phoneNo, // 手机号
          },
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          success: function (res) {
            console.log(res.data);
            if (res.data.code == 200) {
              wx.showToast({
                title: '获取验证码成功',
                icon: 'success',
                duration: 1500
              })
              that.countdown();
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1500
              })
            }
          },
          fail: function (e) {
            wx.showToast({
              title: "网络不好请重试~",
              icon: 'none',
              duration: 1500
            })
          }

        })       
      } else {
        wx.showToast({
          title: '手机号输入有误！',
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
        if (!that.data.isClickable){
          that.setData({
            textColor: '#b9b9b9',
            codeText: '重新获取',
            isClickable2: true
          })
        }else{
          that.setData({
            textColor: '#F27430',
            codeText: '重新获取',
            isClickable2: true
          })
        }
        
      } else {
        that.setData({
          textColor: '#333',
          isClickable2: false,
          codeText: count + "s"
        })
      }
      count--;
    }.bind(this), 1000)
  }
})