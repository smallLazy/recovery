var util = require('../../utils/util.js');
var islogin ;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: islogin,
    phone:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '个人中心' });   
    islogin = !util.isEmpty(wx.getStorageSync('user_id'));
    this.setData({
      phone:wx.getStorageSync('phone_no'),
      isLogin: islogin,
    })   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getStorage({
      key: 'id',
      success: function (res) {
        // console.log(res.data);
        var data = {'id':res.data};
        // return false;
        wx.request({
          url: 'http://www.lazyfei.top/api/user/get-user-info',
          data: data,
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          success: function (res) {
            console.log(res);
            that.setData({
              phone:res.data.user_phone
            })
          }
        })
      }
    })
    
  },

  backLogin:function(e){
    wx.clearStorageSync();
    wx.reLaunch({
      url: "/pages/sign-in/index"
    })
  },
  checklogin:function(){
    if (!islogin){
      wx.navigateTo({
        url: '../../pages/sign-in/index',
      })
    }
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