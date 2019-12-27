(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/routes/project/project.service.ts":
/*!***************************************************!*\
  !*** ./src/app/routes/project/project.service.ts ***!
  \***************************************************/
/*! exports provided: ProjectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectService", function() { return ProjectService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_app_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/app-config */ "./src/app/shared/app-config.ts");
/* harmony import */ var _shared_utils_formmat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/utils/formmat */ "./src/app/shared/utils/formmat.ts");





let ProjectService = class ProjectService {
    constructor(http) {
        this.http = http;
        this.url = _shared_app_config__WEBPACK_IMPORTED_MODULE_3__["baseUrl"] + 'projects';
        this.project = null;
        this.isUpdate = false;
    }
    listOnePage(q) {
        return this.http.get(this.url, { params: Object(_shared_utils_formmat__WEBPACK_IMPORTED_MODULE_4__["formmat"])(q) });
    }
    listAll() {
        return this.http.get(this.url);
    }
    getById(id) {
        return this.http.get(this.url + `/${id}`);
    }
    add(obj) {
        return this.http.post(this.url, obj);
    }
    update(id, obj) {
        return this.http.put(this.url + `/${id}`, obj);
    }
    delete(id) {
        return this.http.delete(this.url + `/${id}`);
    }
};
ProjectService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
ProjectService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], ProjectService);



/***/ }),

/***/ "./src/app/shared/utils/datehandler.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/utils/datehandler.ts ***!
  \*********************************************/
/*! exports provided: getNowFormatDate, getFormatDateStr, getNowFormatTime, getDateByDateStr, getDateByTimeStr, getTimeStrByDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNowFormatDate", function() { return getNowFormatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormatDateStr", function() { return getFormatDateStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNowFormatTime", function() { return getNowFormatTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDateByDateStr", function() { return getDateByDateStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDateByTimeStr", function() { return getDateByTimeStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimeStrByDate", function() { return getTimeStrByDate; });
// 获取当前日期 "2019-08-04"
function getNowFormatDate() {
    const date = new Date();
    const seperator1 = '-';
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = '0' + month.toString();
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate.toString();
    }
    return year + seperator1 + month + seperator1 + strDate;
}
// 将datetime对象转换为日期字符串
function getFormatDateStr(date) {
    const seperator1 = '-';
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = '0' + month.toString();
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate.toString();
    }
    return year + seperator1 + month + seperator1 + strDate;
}
// 获取当前时间
function getNowFormatTime() {
    const date = new Date();
    const seperator1 = ':';
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
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
function getDateByDateStr(dateStr) {
    var dateArr = dateStr.split(" ");
    var d = dateArr[0].split("-");
    return new Date(d[0], (d[1] - 1), d[2]);
}
//将字符串格式yyyy-MM-dd HH:mm:ss 转换为js日期对象
function getDateByTimeStr(timeStr) {
    var timeArr = timeStr.split(" ");
    var d = timeArr[0].split("-");
    var t = timeArr[1].split(":");
    return new Date(d[0], (d[1] - 1), d[2], t[0], t[1], t[2]);
}
//将js日期对象转换为字符串格式 yyyy-MM-dd HH:mm:ss
function getTimeStrByDate(date) {
    var y = date.getFullYear();
    var M = date.getMonth() + 1;
    var d = date.getDate();
    var H = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return y + '-' + (M < 10 ? ('0' + M) : M) + '-' + (d < 10 ? ('0' + d) : d) + " " + (H < 10 ? ('0' + H) : H) + ":" + (m < 10 ? ('0' + m) : m) + ":" + (s < 10 ? ('0' + s) : s);
}


/***/ }),

/***/ "./src/app/shared/utils/formmat.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/utils/formmat.ts ***!
  \*****************************************/
/*! exports provided: getTokenOptions, setToken, formmat, setTokenAndParams, getFormData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTokenOptions", function() { return getTokenOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setToken", function() { return setToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formmat", function() { return formmat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTokenAndParams", function() { return setTokenAndParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormData", function() { return getFormData; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");

// 请求增加身份信息
function getTokenOptions() {
    let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]();
    let jwt = 'Bearer ' + localStorage.getItem('currentToken');
    let _headers = headers.append('Authorization', jwt).append('Content-Type', 'application/json');
    let options = { headers: _headers };
    return options;
}
//请求增加身份信息
function setToken() {
    let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]();
    let jwt = 'Bearer ' + localStorage.getItem('currentToken');
    let _headers = headers.append('Authorization', jwt);
    let options = { headers: _headers };
    return options;
}
// 删除为空或空字符串的参数，并格式化匹配后台的排序参数值
function formmat(obj) {
    for (var key in obj) {
        if ((obj[key] === null) || (obj[key] === "")) {
            delete obj[key];
        }
        if (obj[key] == "ascend")
            obj[key] = "asc";
        if (obj[key] == "descend")
            obj[key] = "desc";
    }
    return obj;
}
// 格式化get请求参数，可以直接传给http.get方法
function setTokenAndParams(obj) {
    let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]();
    let jwt = 'Bearer ' + localStorage.getItem('currentToken');
    let _headers = headers.append('Authorization', jwt);
    return { headers: _headers, params: formmat(obj) };
}
// post和put请求需要带文件的情况，使用FormData
function getFormData(obj) {
    const formData = new FormData();
    for (var key in obj) {
        formData.append(key, obj[key]);
    }
    return formData;
}


/***/ })

}]);
//# sourceMappingURL=common-es2015.js.map