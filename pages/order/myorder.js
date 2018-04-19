var app = getApp();
var httpEngine = require('../../utils/netUtil/HttpEngine.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['进行中', '已完成', '已取消'],
    currentTab: 0  ,
    orderlist: [],
    orderlist1:[],
    orderlist2:[]
    },
  navbarTap: function (e) {
    var table= e.currentTarget.dataset.idx;
    if (this.data.currentTab != table){
      this.setData({
        currentTab: e.currentTarget.dataset.idx
      })
      switch (table){
        case 0:
          this.getOrderList(0);
        break;
        case 1:
          this.getOrderList(2);
          break;
        case 2:
          this.getOrderList(3);
          break;
      }
    }
    
    
  },
  onLoad: function (options) {
    this.getOrderList(0);
  },
    getOrderList:function(status){
      var that = this;
      wx.setNavigationBarTitle({ title: '订单详情' });
      httpEngine.executePost(app.globalData.urls.myOrder, {
        key: wx.getStorageSync('acc_key'),
        user_id: wx.getStorageSync('user_id'),
        status: status},
        function(data){
          // console.log(data);return false;
          if (status == 0) {
            that.setData({
              orderlist: data.orderlist
            });
          } else if (status == 2) {
            that.setData({
              orderlist1: data.orderlist
            });
          } else if (status == 3) {
            that.setData({
              orderlist2: data.orderlist
            });
          }
        },null,null)
    }
})
  