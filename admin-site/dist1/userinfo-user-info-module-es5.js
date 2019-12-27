(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["userinfo-user-info-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/routes/userinfo/user-info.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/routes/userinfo/user-info.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div nz-row [nzGutter]=\"24\" class=\"pt-lg\">\r\n  <div nz-col nzXs=\"24\" nzSm=\"12\" nzMd=\"24\" class=\"mb-md\">\r\n    <nz-card [nzBordered]=\"false\" [nzTitle]=\"title\">\r\n      <form nz-form [formGroup]=\"form\" (ngSubmit)=\"submit()\" se-container=\"1\" labelWidth=\"200\">\r\n\r\n        <se label=\"姓名\" error=\"请输入姓名，大于两个字符\">\r\n          <input nz-input formControlName=\"real_name\" placeholder=\"请输入姓名\" />\r\n        </se>\r\n        <se label=\"手机号\" error=\"请输入手机号\">\r\n          <input nz-input formControlName=\"mobile\" placeholder=\"请输入手机号\" />\r\n        </se>\r\n        <se label=\"岗位\" error=\"请输入岗位名称\">\r\n          <input nz-input formControlName=\"position\" placeholder=\"请输入岗位名称\" />\r\n        </se>\r\n        <se label=\"用户头像\">\r\n          <nz-upload nzAction=\"https://jsonplaceholder.typicode.com/posts/\" [(nzFileList)]=\"fileList\"\r\n            [nzBeforeUpload]=\"beforeUpload\">\r\n            <button nz-button type=\"button\"><i nz-icon nzType=\"upload\"></i><span>点击上传</span></button>\r\n          </nz-upload>\r\n          <!-- <a *ngIf=\"showFile\">{{tmpl.file_name}}</a> -->\r\n        </se>\r\n\r\n        <se>\r\n          <button nz-button nzType=\"primary\" [disabled]=\"form.invalid\" type=\"submit\"\r\n            [nzLoading]=\"submitting\">提交</button>\r\n          <button nz-button class=\"ml-sm\" type=\"reset\">重置</button>\r\n        </se>\r\n      </form>\r\n    </nz-card>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/routes/userinfo/user-info-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/routes/userinfo/user-info-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: UserInfoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserInfoRoutingModule", function() { return UserInfoRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_info_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-info.component */ "./src/app/routes/userinfo/user-info.component.ts");




var routes = [
    {
        path: '',
        component: _user_info_component__WEBPACK_IMPORTED_MODULE_3__["UserInfoComponent"],
        children: [
            { path: 'info', component: _user_info_component__WEBPACK_IMPORTED_MODULE_3__["UserInfoComponent"] }
        ],
    },
];
var UserInfoRoutingModule = /** @class */ (function () {
    function UserInfoRoutingModule() {
    }
    UserInfoRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
        })
    ], UserInfoRoutingModule);
    return UserInfoRoutingModule;
}());



/***/ }),

/***/ "./src/app/routes/userinfo/user-info.component.ts":
/*!********************************************************!*\
  !*** ./src/app/routes/userinfo/user-info.component.ts ***!
  \********************************************************/
/*! exports provided: UserInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserInfoComponent", function() { return UserInfoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm5/ng-zorro-antd.js");
/* harmony import */ var _user_info_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-info.service */ "./src/app/routes/userinfo/user-info.service.ts");






var UserInfoComponent = /** @class */ (function () {
    function UserInfoComponent(fb, msg, cdr, router, srv) {
        var _this = this;
        this.fb = fb;
        this.msg = msg;
        this.cdr = cdr;
        this.router = router;
        this.srv = srv;
        this.submitting = false;
        this.user = {};
        this.avatarUrl = '';
        this.showFile = true;
        this.fileList = [];
        this.beforeUpload = function (file) {
            console.log(file);
            _this.showFile = false;
            _this.fileList = [file];
            return false;
        };
    }
    UserInfoComponent.prototype.ngOnInit = function () {
        this.setTitle();
        this.form = this.fb.group({
            real_name: [
                localStorage.getItem("real_name") ? localStorage.getItem("real_name") : null,
                [],
            ],
            mobile: [
                localStorage.getItem("mobile") ? localStorage.getItem("mobile") : null,
                [],
            ],
            position: [
                localStorage.getItem("position") ? localStorage.getItem("position") : null,
                [],
            ]
        });
    };
    UserInfoComponent.prototype.submit = function () {
        var _this = this;
        this.submitting = true;
        // const obj = this.form.value;
        var obj = this.formmatFormValue();
        // if (this.file) obj.avatar = this.fileList[0];
        this.srv.update(this.user.id, obj).subscribe(function (resp) {
            if (resp['data']) {
                _this.submitting = false;
                if (resp['data'])
                    _this.msg.success("\u4FDD\u5B58\u6210\u529F\uFF01");
                _this.router.navigateByUrl('/project/page');
                _this.cdr.detectChanges();
            }
        });
    };
    UserInfoComponent.prototype.setTitle = function () {
        this.title = '个人信息';
    };
    UserInfoComponent.prototype.formmatFormValue = function () {
        var obj = this.form.value;
        if ((this.fileList) && (this.fileList.length > 0)) {
            obj.avatar = this.fileList[0];
        }
        console.log(obj);
        return obj;
    };
    UserInfoComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NzMessageService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _user_info_service__WEBPACK_IMPORTED_MODULE_5__["UserInfoService"] }
    ]; };
    UserInfoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! raw-loader!./user-info.component.html */ "./node_modules/raw-loader/index.js!./src/app/routes/userinfo/user-info.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NzMessageService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _user_info_service__WEBPACK_IMPORTED_MODULE_5__["UserInfoService"]])
    ], UserInfoComponent);
    return UserInfoComponent;
}());



/***/ }),

/***/ "./src/app/routes/userinfo/user-info.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/routes/userinfo/user-info.module.ts ***!
  \*****************************************************/
/*! exports provided: UserInfoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserInfoModule", function() { return UserInfoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _user_info_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-info-routing.module */ "./src/app/routes/userinfo/user-info-routing.module.ts");
/* harmony import */ var _user_info_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user-info.component */ "./src/app/routes/userinfo/user-info.component.ts");
/* harmony import */ var _user_info_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-info.service */ "./src/app/routes/userinfo/user-info.service.ts");






var UserInfoModule = /** @class */ (function () {
    function UserInfoModule() {
    }
    UserInfoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"], _user_info_routing_module__WEBPACK_IMPORTED_MODULE_3__["UserInfoRoutingModule"]],
            declarations: [_user_info_component__WEBPACK_IMPORTED_MODULE_4__["UserInfoComponent"]],
            providers: [
                _user_info_service__WEBPACK_IMPORTED_MODULE_5__["UserInfoService"],
            ],
        })
    ], UserInfoModule);
    return UserInfoModule;
}());



/***/ }),

/***/ "./src/app/routes/userinfo/user-info.service.ts":
/*!******************************************************!*\
  !*** ./src/app/routes/userinfo/user-info.service.ts ***!
  \******************************************************/
/*! exports provided: UserInfoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserInfoService", function() { return UserInfoService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _shared_app_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/app-config */ "./src/app/shared/app-config.ts");
/* harmony import */ var _shared_utils_formmat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/utils/formmat */ "./src/app/shared/utils/formmat.ts");





var UserInfoService = /** @class */ (function () {
    function UserInfoService(http) {
        this.http = http;
        this.url = _shared_app_config__WEBPACK_IMPORTED_MODULE_3__["baseUrl"] + 'user/info';
        this.user = null;
        this.isUpdate = false;
    }
    UserInfoService.prototype.getUser = function () {
        return this.http.get(this.url);
    };
    UserInfoService.prototype.update = function (id, obj) {
        return this.http.put(this.url, Object(_shared_utils_formmat__WEBPACK_IMPORTED_MODULE_4__["getFormData"])(obj));
    };
    UserInfoService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    UserInfoService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], UserInfoService);
    return UserInfoService;
}());



/***/ })

}]);
//# sourceMappingURL=userinfo-user-info-module-es5.js.map