var feedbackApi = require('../../utils/feedbackApi');

Page({
  data: {
    src: './images/feedback_img.png',

    noteMaxLen: 200,//备注最多字数

    info: "",

    noteNowLen: 0,//备注当前字数
  },
  clickButton:function(){
    var that = this;
    
    if (this.data.info==""){
      feedbackApi.showToast({ title: '提交内容不能为空！' })//调用 
      
    }else{
      console.log(this.data.info);
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1500,
        mask: false,
        success:function(){
          that.setData({
            info: "",

            noteNowLen: 0
          })
        }
      })
      
    }
      
  },

  valueChange:function(e){
    var that = this;
    var value = e.detail.value, len = parseInt(value.length);
    if (len > that.data.noteMaxLen) return;
    that.setData({

      info: value,

      noteNowLen: len

    })
  } 
})