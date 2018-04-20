// pages/order/place_order.js
var util = require('../../utils/util.js');
var app = getApp();
var httpEngine = require('../../utils/netUtil/HttpEngine.js');
var user_status;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlace: util.isEmpty(user_status)|| user_status!=1,
    isUser: 'no-display',
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
    listTime: [{ id: 0, name: "9:00~11:00" }, { id: 1, name: "11:00~13:00" }, { id: 2, name: "13:00~15:00" }, { id: 3, name: "15:00~17:00" }, { id: 4, name: "17:00~19:00" }],
    objectMultiArray: [],
    time1:"",
    time2: "",
    time3: "",


    order: [],
    orderdata: []
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
        btntext:"立即回收",
        time1:"",
        time2: "",
        time3: ""
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
    httpEngine.executePost(app.globalData.urls.placeOrder, {
      key: wx.getStorageSync('acc_key'),
      user_id: wx.getStorageSync('user_id'),
      user_name: data.name,
      user_phone: data.phoneNo,
      address: data.address,
      detail_address: data.adressDetila,
      remarks: data.notes,
      appointment_time_start: this.data.time1 + " " + this.data.time2,
      appointment_time_end: this.data.time1 + " " + this.data.time3},function(res){
        wx.showToast({
          title: "提交成功",
          icon: 'none',
          duration: 1500
        });
        wx.navigateTo({
          url: 'myorder'
        })
      },null,null);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    user_status = wx.getStorageSync('user_status');// 0 普通用户，1回收员，2 大客户  
    var that = this;
    

    if (user_status == 1) {
      wx.setNavigationBarTitle({ title: '接收订单' });
      wx.setTabBarItem({
        index: 0,
        text: '接单'
      })
      that.setData({
        isPlace: false,
        isUser: 'no-display',
      });
    } else {
      wx.setNavigationBarTitle({ title: '发布订单' });  
      wx.setTabBarItem({
        index: 0,
        text: '回收'
      })
      that.setData({
        isPlace: true,
        isUser: 'display',
      });
    }
    
    
  },
  bindMultiPickerChange2:function(e){
    var that = this;
    var inxex1 = e.detail.value[0];
    var index2 = e.detail.value[1];
    var str1 = this.data.objectMultiArray[0][inxex1].name;
    var str2 = this.data.objectMultiArray[1][index2].name;
    var str = str1 + " " + str2;
    var time1 = str1.substring(0,str1.length-4);
    var tag = str2.indexOf("~");
    var time2 = str2.substring(0, tag );
    var time3 = str2.substring(tag + 1, str2.length);
    this.setData({
      inputtext:str,
      time1:time1,
      time2: time2,
      time3:time3
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
    console.log("onReady");
    var that = this;
    if (user_status == 0) {
      var hours = util.getHours();
      var list2;
      if (hours < 9) {
        list2 = that.data.listTime;
      } else if (hours < 11) {
        list2 = that.data.listTime.slice(1);
      } else if (hours < 13) {
        list2 = that.data.listTime.slice(2);
      } else if (hours < 15) {
        list2 = that.data.listTime.slice(3);
      } else if (hours < 17) {
        list2 = that.data.listTime.slice(4);
      } else {
        list2 = that.data.listTime.slice(5);
        that.data.isouttime = true;
      }
      var list1 = that.data.listData;
      that.data.listTime1 = list2;
      this.setData({
        objectMultiArray: [list1, list2]
      })
    } else {
      httpEngine.executePost(app.globalData.urls.getOrder, {
        key: wx.getStorageSync('acc_key'),
        user_id: wx.getStorageSync('user_id'),
        is_mime: false
        },function(data){
          that.setData({
            orderdata: data.orderlist
          })
        },null,null);
    }
  },
  receiveOrder: function (event){
    var orderId = event.currentTarget.dataset.hi; 
    httpEngine.executePost(app.globalData.urls.receiveOrder, {
      key: wx.getStorageSync('acc_key'),
      user_id: wx.getStorageSync('user_id'),
      order_id: orderId},function(data){
        wx.showToast({
          title: '接单成功',
          icon: 'none',
          duration: 1500
        })
      },null,null);
  },
  inputtap:function(){
    if (util.isEmpty(wx.getStorageSync('user_id'))){
     
      wx.navigateTo({
        url: '../../pages/sign-in/index?type=1',
      })
    }
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
  onShow:function(){
  }
})