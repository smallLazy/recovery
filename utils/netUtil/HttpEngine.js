

module.exports = {
  executePost: executePost
}
/**
   * 接口公共访问方法
   * @param {Object} urlPath 访问路径
   * @param {Object} params 访问参数（json格式）
   * @param {Object} onSuccess 成功回调
   * @param {Object} onErrorBefore 失败回调
   * @param {Object} onComplete 请求完成（不管成功或失败）回调
   */
function executePost (urlPath, params, onSuccess, onErrorBefore, onComplete) {
  wx.request({
    url: urlPath,
    data: params,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      if(res.data.code==200){
        onSuccess(res.data);
      }else{
        if (onErrorBefore!=null){
          onErrorBefore(res.data);
          return;
        }
        wx.showToast({
          title: getCodeMsg(res.data.msg),
          icon:'none',
          duration:1000 
        });
      }
    },
    fail: function (res) {
      wx.showToast({
        title: "网络不好请重试~",
        icon: 'none',
        duration: 1000
      })
    },
    complete:function(res){

    }
  })
}

function getCodeMsg(msg) {
  var strMsg = '请求错误';
  switch (msg) {
    case 'ILLEGAL_REQUEST':
      strMsg = '非法请求'
      break;
    case 'MISSING_PARAMETER':
      strMsg = '必填项为空（手机号）'
      break;
    case 'UNCATCH_VCODE':
      strMsg = '一分钟内无法再次获取验证码'
      break;
    case 'ILLEGAL_LENGTH':
      strMsg = '长度不对（11位）'
      break;
    case 'ILLEGAL_FORMAT':
      strMsg = '手机号格式不对'
      break;
    case 'SEND_FAILED':
      strMsg = '短信发送失败'
      break;
    case 'SET_FAILED':
      strMsg = '验证码写入数据库失败'
      break;
    case 'MISSING_PARAMETER':
      strMsg = '必填项为空'
      break;
    case 'EXPIRED':
      strMsg = '验证过期'
      break;
    case 'ILLEGAL_FORMA':
      strMsg = '身份证号格式不对'
      break;
    case 'REQUEST_WX_INTERFACE_FAILED':
      strMsg = '请求微信登录态接口失败'
      break;
    case 'SET_FAILED':
      strMsg = '写入数据库失败'
      break;
  }
  return strMsg;
}