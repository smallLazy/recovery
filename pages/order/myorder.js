Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['进行中', '已完成', '已取消'],
    currentTab: 0  ,
    orderlist: ["订单号：111", "订单号：112", "订单号：113","订单号：114","订单号：115","订单号：116","订单号：117","订单号：118","订单号：119"],
    orderlist1:"",
    orderlist2:""
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }})
  