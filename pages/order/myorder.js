Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['进行中', '已完成', '已取消'],
    currentTab: 0  ,
    orderlist: [],
    orderlist1:"",
    orderlist2:"",
    orderdata: []
    },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  onLoad: function (options) {
    var that =this;
    wx.setNavigationBarTitle({ title: '订单详情' });
    wx.request({
      url: 'http://www.lazyfei.top/api/order/get-order-by-id',
      data: { user_uid : 1},
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function(res) {
        console.log(res.data);
          // that.setData({
          //   orderdata: res.data,
          //   orderlist: res.data.order_number
          // });
        }
      })
    }
})
  