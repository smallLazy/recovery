const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  getDateStr: getDateStr,
  getHours:getHours,
  isEmpty: isEmpty,
  IdCardValidate: IdCardValidate,
  getCodeMsg: getCodeMsg
}

function getDateStr(today, addDayCount) {
  var dd;
  if (today) {
    dd = new Date(today);
  } else {
    dd = new Date();
  }
  dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期 
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期 
  var d = dd.getDate();
  if (m < 10) {
    m = '0' + m;
  };
  if (d < 10) {
    d = '0' + d;
  };
  return y + "-" + m + "-" + d;
}

function getHours(){
  var dd = new Date();
  return dd.getHours();
}

function isEmpty(str){
  if(str!=""&&str!=null){
    return true;
  }
  return false;
}

function IdCardValidate(idCard){
  if(idCard.length!=18){
    return false;
  }
  idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格 
  var a_idCard = idCard.split("");                // 得到身份证数组     
  if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证  
    return true;
  } else {
    return false;
  }     
}


function isTrueValidateCodeBy18IdCard(a_idCard) {
  var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子     
  var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X     
  var sum = 0;                             // 声明加权求和变量     
  if (a_idCard[17].toLowerCase() == 'x') {
    a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作     
  }
  for (var i = 0; i < 17; i++) {
    sum += Wi[i] * a_idCard[i];            // 加权求和     
  }
  var valCodePosition = sum % 11;                // 得到验证码所位置     
  if (a_idCard[17] == ValideCode[valCodePosition]) {
    return true;
  } else {
    return false;
  }
} 

/**   
      * 验证18位数身份证号码中的生日是否是有效生日   
      * @param idCard 18位书身份证字符串   
      * @return   
      */
function isValidityBrithBy18IdCard(idCard18) {
  var year = idCard18.substring(6, 10);
  var month = idCard18.substring(10, 12);
  var day = idCard18.substring(12, 14);
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
  // 这里用getFullYear()获取年份，避免千年虫问题     
  if (temp_date.getFullYear() != parseFloat(year)
    || temp_date.getMonth() != parseFloat(month) - 1
    || temp_date.getDate() != parseFloat(day)) {
    return false;
  } else {
    return true;
  }
}     

//去掉字符串头尾空格     
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}   

function getCodeMsg(msg){
  var strMsg;
  switch(msg){
    case 'ILLEGAL_REQUEST':
      strMsg='非法请求'
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
    
}