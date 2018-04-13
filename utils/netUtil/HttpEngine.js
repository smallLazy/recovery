

module.exports = {
  webCall: webCall
}
/**
   * 接口公共访问方法
   * @param {Object} urlPath 访问路径
   * @param {Object} params 访问参数（json格式）
   * @param {Object} requestCode 访问码，返回处理使用
   * @param {Object} onSuccess 成功回调
   * @param {Object} onErrorBefore 失败回调
   * @param {Object} onComplete 请求完成（不管成功或失败）回调
   * @param {Object} isVerify 是否验证重复提交
   * @param {Object} requestType 请求类型（默认POST）
   * @param {Object} retry 访问失败重新请求次数（默认1次）
   */
function executePost (urlPath, params, requestCode, onSuccess, onErrorBefore, onComplete, isVerify, requestType, retry) {
  wx.request({
    url: that.apiHost + urlPath,
    data: params,
    method: requestType, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': requestType == 'POST' ?
        'application/x-www-form-urlencoded' : 'application/json'
    }, // 设置请求的 header
    success: function (res) {
      console.log("返回结果：" + JSON.stringify(res.data));
      if (res.data) {
        if (res.data.statusCode == 200) { //访问成功
          onSuccess(res.data, requestCode);
        } else if (res.data.statusCode == 300000001) { // 未登录
          that.isLogin = false;
          onErrorBefore(0, res.data.message, requestCode);
        } else {
          onErrorBefore(0, res.data.message == null ? "请求失败 , 请重试" : res.data.message, requestCode);
        }
      } else {
        onErrorBefore(0, "请求失败 , 请重试", requestCode);
      }
    },
    fail: function (res) {
      
    }
  })
}