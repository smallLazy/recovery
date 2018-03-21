// pages/order/order.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btntext:"立即回收",
    isouttime:false,
    multiIndex:0,
    inputtext:"",
    isDis:'no-display',
    listTime1:[],
    listData: [{
      id: 0,
      name: util.getDateStr(false, null) + "(今天)"
    },
    {
      id: 1,
      name: util.getDateStr(false, 1) + "(明天)"
    },
    {
      id: 2,
      name: util.getDateStr(false, 2) + "(后天)"
    }],
    listTime: [{ id: 0, name: "9:00-11:00" }, { id: 1, name: "11:00-13:00" }, { id: 2, name: "13:00-15:00" }, { id: 3, name: "15:00-17:00" }, { id: 4, name: "17:00-19:00" }],
    objectMultiArray: []
  },
  /**
   * 获取地图地址返回到页面上
   */
  getAdd:function(e) {
    var that = this;
    var add =  wx.chooseLocation({
      success: function(res) {
        // return res.address;
        var add = res.address;
        that.setData({
          address: add
        })
      },
    });
  },

  /**
   * 点击预约出现 时间选择
   */
  bespeak:function(e) {
    var that = this;
    if (that.data.isDis =="display"){
      this.setData({
        isDis: 'no-display',
        inputtext:"",
        btntext:"立即回收"
      })
    }else{
      this.setData({
        isDis: 'display',
        inputtext: "",
        btntext: "预约回收"
      })
    }
    
  },
  formSubmit:function(e){
    var that = this;
    if (that.checkInput(e)){
      that.placeOrder(e);
      
    }
  },
  checkInput(e){
    var that = this;
    var data = e.detail.value;
    var name = data.name;
    var phoneNo = data.phoneNo;
    var address = data.address;
    var adressDetila = data.adressDetila;
    var notes = data.notes;
    var time = data.time;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var toastStr;
    var isToast=true;
    if (name.length==0){
      toastStr="联系人不能为空"
    } else if (phoneNo.length==0){
      toastStr = "手机号不能为空"
    } else if (address.length == 0) {
      toastStr = "收货地址不能为空"
    } else if (adressDetila.length == 0) {
      toastStr = "详细地址不能为空"
    } else if (phoneNo.length != 11){
      toastStr = "请输入正确的手机号！"
    } else if (!myreg.test(phoneNo)) {
      toastStr = "请输入正确的手机号！"
    }else{ 
      isToast=false;
    }
    if(isToast){
      wx.showToast({
        title: toastStr,
        icon: 'none',
        duration: 1500
      })
      return false;
    }else{
      if (this.data.isouttime && time.length==0){
        wx.showToast({
          title: "今天上门回收时间已过，请预约明天上门",
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      return true;
    }
  },

  placeOrder(e){
    var data = e.detail.value
    wx.request({
      url: 'http://www.lazyfei.top/api/order/place-an-order', 
      method: 'POST',
      data: {
        user_id:1,
        user_name: data.name,
        user_phone: data.phoneNo,
        address: data.address,
        remarks: data.notes,
        appointment_time:data.time
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        wx.showToast({
          title: "提交成功",
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({ title: '订单详情' });
    var hours = util.getHours();
    var list2 ;
    if(hours<9){
      list2 = that.data.listTime;
    }else if(hours<11){
      list2 = that.data.listTime.slice(1);
    }else if(hours<13){
      list2 = that.data.listTime.slice(2);
    }else if(hours<15){
      list2 = that.data.listTime.slice(3);
    }else if(hours<17){
      list2 = that.data.listTime.slice(4);
    }else{
      list2 = that.data.listTime.slice(5);
      that.data.isouttime=true;
    }
    var list1 = that.data.listData;
    that.data.listTime1 = list2;
    this.setData({
      objectMultiArray: [list1, list2]
    })
  },
  bindMultiPickerChange2:function(e){
    var that = this;
    var inxex1 = e.detail.value[0];
    var index2 = e.detail.value[1];
    var str = this.data.objectMultiArray[0][inxex1].name +" — "+ this.data.objectMultiArray[1][index2].name;
    this.setData({
      inputtext:str,
    })

  },
  bindMultiPickerColumnChange2:function(e){
    var that = this;
    var list1 = that.data.listData;
    var list2;
    var value= e.detail.value;
    if (e.detail.column==0){
      if(value==0){
        list2 = that.data.listTime1;
      }else{
        list2 = that.data.listTime;
      }
      this.setData({
        objectMultiArray: [list1, list2]
      })
    }
    

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