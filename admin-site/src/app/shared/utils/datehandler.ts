// 获取当前日期 "2019-08-04"
export function getNowFormatDate() {
  const date = new Date();
  const seperator1 = '-';
  const year = date.getFullYear();
  let month: any = date.getMonth() + 1;
  let strDate: any = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month.toString();
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate.toString();
  }
  return year + seperator1 + month + seperator1 + strDate;
}

// 将datetime对象转换为日期字符串
export function getFormatDateStr(date) {
  const seperator1 = '-';
  const year = date.getFullYear();
  let month: any = date.getMonth() + 1;
  let strDate: any = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month.toString();
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate.toString();
  }
  return year + seperator1 + month + seperator1 + strDate;
}

// 获取当前时间
export function getNowFormatTime() {
  const date = new Date();
  const seperator1 = ':';
  let h: any = date.getHours();
  let m: any = date.getMinutes();
  let s: any = date.getSeconds();
  if (h >= 1 && h <= 9) {
    h = '0' + h.toString();
  }
  if (m >= 0 && m <= 9) {
    m = '0' + m.toString();
  }
  if (s >= 0 && s <= 9) {
    s = '0' + s.toString();
  }
  return h + seperator1 + m + seperator1 + s;
}

//将日期字符串yyyy-MM-dd 转换为日期对象
export function getDateByDateStr(dateStr) {
  var dateArr = dateStr.split(" ");
  var d = dateArr[0].split("-");
  return new Date(d[0], (d[1] - 1), d[2]);
}

//将字符串格式yyyy-MM-dd HH:mm:ss 转换为js日期对象
export function getDateByTimeStr(timeStr) {
  var timeArr = timeStr.split(" ");
  var d = timeArr[0].split("-");
  var t = timeArr[1].split(":");
  return new Date(d[0], (d[1] - 1), d[2], t[0], t[1], t[2]);
}

//将js日期对象转换为字符串格式 yyyy-MM-dd HH:mm:ss
export function getTimeStrByDate(date) {
  var y = date.getFullYear();
  var M = date.getMonth() + 1;
  var d = date.getDate();
  var H = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  return y + '-' + (M < 10 ? ('0' + M) : M) + '-' + (d < 10 ? ('0' + d) : d) + " " + (H < 10 ? ('0' + H) : H) + ":" + (m < 10 ? ('0' + m) : m) + ":" + (s < 10 ? ('0' + s) : s);
}
