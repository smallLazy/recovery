// pages/address/add.js
var app = getApp();
var httpEngine = require('../../utils/netUtil/HttpEngine.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:[],
    // addData:[]
  },

  // 表单
  formSubmit: function (e) {
    var that = this;
    var data = e.detail.value;
    var phone = data.phone;
    var uname = data.uname;
    var add = data.add;
    var detail_add = data.detail_add;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var isToast = true;
    var toastStr;
    // 判断手机号
    if (uname.length == 0) {
      toastStr = "收货人不能为空"
    } else if (phone.length == 0) {
      toastStr = "手机号不能为空"
    } else if (add.length == 0) {
      toastStr = "地址不能为空"
    } else if (detail_add.length == 0) {
      toastStr = "详细地址不能为空"
    } else if (phone.length != 11) {
      toastStr = "请输入正确的手机号！"
    } else if (!myreg.test(phone)) {
      toastStr = "请输入正确的手机号！"
    } else {
      isToast = false;
    }
    if (isToast) {
      wx.showToast({
        title: toastStr,
        icon: 'none',
        duration: 1500
      })
      return false;
    }else{
      httpEngine.executePost(app.globalData.urls.addAddress, {
        key: wx.getStorageSync('acc_key'),
        user_id: wx.getStorageSync('user_id'),
        address: add,
        detail_address: detail_add,
        username: uname,
        phone:phone
      }, function (res) {
        if(res.code == 200) {
          wx.showToast({
            title:'添加成功' ,
            icon: 'success',
            duration: 1500
          });
          wx.navigateTo({
            url: 'index'
          })
        }else{
          wx.showToast({
            title: '添加失败',
            icon: 'none',
            duration: 1500
          });
        }
      }, null, null);
    }
    
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '添加新地址'
    });
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