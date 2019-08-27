import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


// 请求增加身份信息
export function getTokenOptions() {
  let headers = new HttpHeaders();
  let jwt = 'Bearer ' + localStorage.getItem('currentToken');
  let _headers = headers.append('Authorization', jwt).append('Content-Type', 'application/json');
  let options = { headers: _headers };
  console.log(headers);
  return options;
}

// 删除为空或空字符串的参数，并格式化匹配后台的排序参数值
export function formmat(obj) {
  for (var key in obj) {
    if ((obj[key] === null) || (obj[key] === "")) {
      delete obj[key]
    }
    if (obj[key] == "ascend") obj[key] = "asc";
    if (obj[key] == "descend") obj[key] = "desc"
  }
  return obj
}

// 格式化get请求参数，可以直接传给http.get方法
export function getOptionWithParams(obj) {
  let headers = new HttpHeaders();
  let jwt = 'Bearer ' + localStorage.getItem('currentToken');
  let _headers = headers.append('Authorization', jwt).append('Content-Type', 'application/json');

  console.log({ headers: headers, params: formmat(obj) });
  return { headers: _headers, params: formmat(obj) }
}

// post和put请求需要带文件的情况，使用FormData
export function getFormData(obj) {
  const formData: FormData = new FormData();
  for (var key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
}