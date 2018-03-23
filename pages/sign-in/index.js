// pages/me/index.js
Page({
  data: {
    src: './images/logo.jpg',
    isLogin: false,
    btnBackcolor: '#FCDFD1',
    btnTextColor: '#887566',
    textColor:'#b9b9b9',
    isClickable:false,
    codeText:"获取验证码",
    btnClickable:false,
    isClickable1: false,
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
    var vcode = data.vcode;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if(phone.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon:'none',
        duration: 1500
      })
      return false;
    }else if (phone.length != 11) {
        wx.showToast({
          title: '手机号长度有误！',
          icon: 'none',
          duration: 1500
        })
        return false;
    } else if (!myreg.test(phone)) {
        wx.showToast({
          title: '手机号有误！',
          icon: 'none',
          duration: 1500
        })
        return false;
    } else if (vcode.length == 0) {
      wx.showToast({
        title: '请输入验证码！',
        icon: 'none',
        duration: 1500
      })
      return false;
      }else {
        wx.request({
          url: 'http://www.lazyfei.top/api/user/check-login',
          data: data,
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          success: function (res) {
            var data = res.data;
            that.setData({
              isLogin: true
            });
            if (data.code == 200) {
              var id = data.id;
              wx.setStorage({
                key: "id",
                data: id
              });
              var isLogin = that.data.isLogin;
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1500
              })
              wx.reLaunch({
                url: "/pages/personal-center/index?isLogin=" + isLogin
              })
            }
          }
        })
        

      }
    
    
    
   
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
  listenerCodeInput:function(e){
    var that = this;
    var value = e.detail.value;
    if (value.length == 4) {
      that.data.isClickable1=true;
    }else{
      that.data.isClickable1 = false;
    }
    if (that.data.isClickable1 && that.data.isClickable){
      that.setData({

      })
    }else{
      that.setData({
        btnBackcolor: '#FCDFD1',
        btnTextColor: '#887566',
        btnClickable:true
      })
    }
  },

  listenerPhoneInput:function(e){
    var that=this;
    var value = e.detail.value;
    if(value.length==11){
      that.setData({
        textColor: '#F27430',
        isClickable:true
      })
    }else{
      that.setData({
        textColor: '#b9b9b9',
        isClickable: false
      })
    }
  },
  getVerifyingCode:function(){
    if (this.data.isClickable){
      this.countdown();
    }
  },
  countdown:function(){
    wx.showToast({
      title: '获取验证码成功',
      icon: 'none',
      duration: 1500
    })
    var that = this;
    var count=60;
    that.setData({
      textColor: '#333',
      isClickable: false,
      codeText: count + "s"
    });
    count--;
    var interval = setInterval(function () { 
      if(count<0){
        clearInterval(interval);
        that.setData({
          textColor: '#F27430',
          codeText:'重新获取',
          isClickable: true
        })
      }else{
        that.setData({
          textColor: '#333',
          isClickable: false,
          codeText:count+"s"
        })
      }
      count--;
    }.bind(this),1000)
  }
})