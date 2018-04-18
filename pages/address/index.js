// pages/address/index.js
var app = getApp();
var httpEngine = require('../../utils/netUtil/HttpEngine.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresslist: [],
  },

  // 新建地址
  AddAddress:function(e) {
    wx.navigateTo({
      url: 'add'
    });
  },

  // 删除地址
  delAddress:function(e) {
    var id = e.target.id;
    wx.showModal({
      content: '您确认要删除？',
      success: function (res) {
        if (res.confirm) {
          httpEngine.executePost(app.globalData.urls.delAddress, {
            key: wx.getStorageSync('acc_key'),
            userid: wx.getStorageSync('user_id'),
            id:id,
          }, function (res) {
            // TODO 刷新
            if(res.code == 200) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1500
              });
            }
          }, null, null);

        } else if (res.cancel) {
          return false;
        }
      }
    })
  },

  // 编辑地址
  editAddress:function(e) {
    var id = e.target.id;
    wx.navigateTo({
      url: 'edit?id='+id
    });
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '地址管理'
    });
    var that = this;
    httpEngine.executePost(app.globalData.urls.getAddress, {
      key: wx.getStorageSync('acc_key'),
      userid: wx.getStorageSync('user_id')
    }, function (data) {
      that.setData({
        addresslist:data.addresslist
      });
      
    }, null, null);
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