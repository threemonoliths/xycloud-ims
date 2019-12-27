(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["project-project-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/routes/project/form/project-form.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/routes/project/form/project-form.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div nz-row [nzGutter]=\"24\" class=\"pt-lg\">\r\n  <div nz-col nzXs=\"24\" nzSm=\"12\" nzMd=\"24\" class=\"mb-md\">\r\n    <nz-card [nzBordered]=\"false\" [nzTitle]=\"title\">\r\n      <form nz-form [formGroup]=\"form\" (ngSubmit)=\"submit()\" se-container=\"1\" labelWidth=\"200\">\r\n        <se label=\"名称\" error=\"请输入名称，大于两个字符\" required>\r\n          <input nz-input formControlName=\"pname\" placeholder=\"请输入项目名称\" />\r\n        </se>\r\n        <se label=\"日期\" error=\"请选择日期\" required>\r\n          <nz-date-picker formControlName=\"date\"></nz-date-picker>\r\n        </se>\r\n        <se label=\"描述\">\r\n          <textarea rows=\"4\" nz-input formControlName=\"comments\" placeholder=\"请输入描述\"></textarea>\r\n        </se>\r\n        <se>\r\n          <button nz-button nzType=\"primary\" [disabled]=\"form.invalid\" type=\"submit\"\r\n            [nzLoading]=\"submitting\">提交</button>\r\n          <button nz-button class=\"ml-sm\" type=\"reset\">重置</button>\r\n        </se>\r\n      </form>\r\n    </nz-card>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/routes/project/list/project-list.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/routes/project/list/project-list.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div nz-row [nzGutter]=\"24\" class=\"pt-lg\">\r\n  <div nz-col nzXs=\"24\" nzSm=\"12\" nzMd=\"24\" class=\"mb-md\">\r\n    <nz-card [nzBordered]=\"false\" [nzTitle]=\"title\">\r\n      <form nz-form [nzLayout]=\"'inline'\" (ngSubmit)=\"getData()\" class=\"search__form\">\r\n        <div nz-row [nzGutter]=\"{ xs: 8, sm: 8, md: 8, lg: 24, xl: 48, xxl: 48 }\">\r\n          <div nz-col nzMd=\"8\" nzSm=\"24\">\r\n            <nz-form-item>\r\n              <nz-form-label nzFor=\"no\">名称</nz-form-label>\r\n              <nz-form-control>\r\n                <input nz-input [(ngModel)]=\"q.pname\" name=\"pname\" placeholder=\"输入名称搜索\" id=\"pname\" />\r\n              </nz-form-control>\r\n            </nz-form-item>\r\n          </div>\r\n\r\n          <div nz-col [nzSpan]=\"expandForm ? 24 : 8\" [class.text-right]=\"expandForm\">\r\n            <button nz-button type=\"submit\" [nzType]=\"'primary'\" [nzLoading]=\"loading\">查询</button>\r\n            <button nz-button type=\"reset\" (click)=\"reset()\" class=\"mx-sm\">重置</button>\r\n          </div>\r\n        </div>\r\n      </form>\r\n      <div class=\"mb-md\">\r\n        <button nz-button (click)=\"add()\" [nzType]=\"'primary'\">\r\n          <i nz-icon nzType=\"plus\"></i>\r\n          <span>新建</span>\r\n        </button>\r\n      </div>\r\n\r\n      <nz-table #nzTable [nzData]=\"data\" [nzTotal]=\"total\" [nzPageSize]=\"q.ps\" [nzLoading]=\"loading\"\r\n        (nzPageIndexChange)=\"pageChange($event)\" nzShowSizeChanger>\r\n        <thead nz-thead (nzSortChange)=\"sort($event)\" nzSingleSort>\r\n          <tr>\r\n            <th nz-th nzShowSort nzSortKey=\"pname\">\r\n              <span>名称</span>\r\n            </th>\r\n            <th nz-th nzShowSort nzSortKey=\"comments\">\r\n              <span>描述</span>\r\n            </th>\r\n\r\n            <th nz-th>\r\n              <span>操作</span>\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody nz-tbody>\r\n          <!-- <tr nz-tbody-tr *ngFor=\"let i of nzTable.data\"> -->\r\n          <tr nz-tbody-tr *ngFor=\"let i of datas\">\r\n            <td nz-td>{{i.pname}}</td>\r\n            <td nz-td>{{i.comments}}</td>\r\n\r\n            <td nz-td>\r\n              <a (click)=\"modify(i.id)\">修改</a>\r\n              <span nz-table-divider></span>\r\n              <nz-divider nzType=\"vertical\"></nz-divider>\r\n              <a (click)=\"remove(i)\">删除</a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </nz-table>\r\n    </nz-card>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/routes/project/project.component.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/routes/project/project.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/routes/project/form/project-form.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/routes/project/form/project-form.component.ts ***!
  \***************************************************************/
/*! exports provided: ProjectFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectFormComponent", function() { return ProjectFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm5/ng-zorro-antd.js");
/* harmony import */ var _shared_utils_datehandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/utils/datehandler */ "./src/app/shared/utils/datehandler.ts");
/* harmony import */ var _project_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../project.service */ "./src/app/routes/project/project.service.ts");







var ProjectFormComponent = /** @class */ (function () {
    function ProjectFormComponent(fb, msg, cdr, router, srv) {
        this.fb = fb;
        this.msg = msg;
        this.cdr = cdr;
        this.router = router;
        this.srv = srv;
        this.submitting = false;
        this.project = {};
    }
    ProjectFormComponent.prototype.ngOnInit = function () {
        if (this.srv.isUpdate)
            this.initUpdate();
        this.setTitle();
        this.form = this.fb.group({
            pname: [
                this.project.pname ? this.project.pname : null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(2)]),
            ],
            date: [this.project.date ? Object(_shared_utils_datehandler__WEBPACK_IMPORTED_MODULE_5__["getDateByDateStr"])(this.project.date) : null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            comments: [this.project.comments ? this.project.comments : null, []],
        });
    };
    ProjectFormComponent.prototype.submit = function () {
        var _this = this;
        if (!this.srv.isUpdate) {
            this.submitting = true;
            var obj = this.formmatFormValue();
            this.srv.add(obj).subscribe(function (resp) {
                _this.submitting = false;
                if (resp['data'])
                    _this.msg.success("\u4FDD\u5B58\u6210\u529F\uFF01");
                _this.router.navigateByUrl('/project/page');
                _this.cdr.detectChanges();
            });
        }
        else {
            this.submitting = true;
            var obj = this.formmatFormValue();
            this.srv.update(this.project.id, obj).subscribe(function (resp) {
                if (resp['data']) {
                    _this.submitting = false;
                    if (resp['data'])
                        _this.msg.success("\u4FDD\u5B58\u6210\u529F\uFF01");
                    _this.router.navigateByUrl('/project/page');
                    _this.cdr.detectChanges();
                }
            });
        }
    };
    ProjectFormComponent.prototype.setTitle = function () {
        if (this.srv.isUpdate) {
            this.title = '修改项目';
        }
        else
            this.title = '创建项目';
    };
    ProjectFormComponent.prototype.initUpdate = function () {
        this.setTitle();
        this.project = this.srv.project;
    };
    ProjectFormComponent.prototype.formmatFormValue = function () {
        var obj = this.form.value;
        obj.date = Object(_shared_utils_datehandler__WEBPACK_IMPORTED_MODULE_5__["getFormatDateStr"])(obj.date);
        return { project: obj };
    };
    ProjectFormComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NzMessageService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _project_service__WEBPACK_IMPORTED_MODULE_6__["ProjectService"] }
    ]; };
    ProjectFormComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! raw-loader!./project-form.component.html */ "./node_modules/raw-loader/index.js!./src/app/routes/project/form/project-form.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NzMessageService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _project_service__WEBPACK_IMPORTED_MODULE_6__["ProjectService"]])
    ], ProjectFormComponent);
    return ProjectFormComponent;
}());



/***/ }),

/***/ "./src/app/routes/project/list/project-list.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/routes/project/list/project-list.component.ts ***!
  \***************************************************************/
/*! exports provided: ProjectListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectListComponent", function() { return ProjectListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm5/ng-zorro-antd.js");
/* harmony import */ var _delon_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @delon/theme */ "./node_modules/@delon/theme/fesm5/theme.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _project_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../project.service */ "./src/app/routes/project/project.service.ts");







var ProjectListComponent = /** @class */ (function () {
    function ProjectListComponent(http, msg, modalSrv, cdr, srv, router) {
        this.http = http;
        this.msg = msg;
        this.modalSrv = modalSrv;
        this.cdr = cdr;
        this.srv = srv;
        this.router = router;
        this.title = '项目管理';
        this.total = 0;
        this.q = {
            pi: 1,
            ps: 10,
            sort_field: 'date',
            sort_direction: 'desc',
            pname: null,
        };
        this.data = [];
        this.loading = false;
        this.expandForm = false;
    }
    ProjectListComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    ProjectListComponent.prototype.getData = function () {
        var _this = this;
        this.loading = true;
        this.srv
            .listOnePage(this.q)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function () { return (_this.loading = false); }))
            .subscribe(function (resp) {
            _this.data = resp['data'];
            _this.cdr.detectChanges();
        });
    };
    ProjectListComponent.prototype.add = function (tpl) {
        this.srv.isUpdate = false;
        this.router.navigateByUrl('/project/form');
    };
    ProjectListComponent.prototype.modify = function (id) {
        var _this = this;
        this.srv.isUpdate = true;
        this.srv.getById(id).subscribe(function (resp) {
            _this.srv.project = resp['data'];
            _this.router.navigateByUrl('/project/form');
        });
    };
    ProjectListComponent.prototype.remove = function (item) {
        var _this = this;
        this.modalSrv.create({
            nzTitle: '确认删除',
            nzContent: '确认要删除项目：' + item.pname + ' 吗?',
            nzOnOk: function () {
                _this.loading = true;
                _this.srv.delete(item.id).subscribe(function (resp) {
                    if (resp['data'])
                        _this.msg.success("\u5220\u9664\u6210\u529F\uFF01");
                    _this.reset();
                });
            },
        });
    };
    ProjectListComponent.prototype.reset = function () {
        var _this = this;
        setTimeout(function () { return _this.getData(); });
    };
    ProjectListComponent.prototype.pageChange = function (pi) {
        this.q.pi = pi;
        this.reset();
    };
    ProjectListComponent.prototype.sort = function (sort) {
        this.q.sort_field = sort.key;
        this.q.sort_direction = sort.value;
        this.reset();
    };
    ProjectListComponent.ctorParameters = function () { return [
        { type: _delon_theme__WEBPACK_IMPORTED_MODULE_4__["_HttpClient"] },
        { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"] },
        { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzModalService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
        { type: _project_service__WEBPACK_IMPORTED_MODULE_6__["ProjectService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
    ]; };
    ProjectListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! raw-loader!./project-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/routes/project/list/project-list.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_delon_theme__WEBPACK_IMPORTED_MODULE_4__["_HttpClient"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzModalService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _project_service__WEBPACK_IMPORTED_MODULE_6__["ProjectService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], ProjectListComponent);
    return ProjectListComponent;
}());



/***/ }),

/***/ "./src/app/routes/project/project-routing.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/routes/project/project-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: ProjectRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectRoutingModule", function() { return ProjectRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _project_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project.component */ "./src/app/routes/project/project.component.ts");
/* harmony import */ var _list_project_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./list/project-list.component */ "./src/app/routes/project/list/project-list.component.ts");
/* harmony import */ var _form_project_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form/project-form.component */ "./src/app/routes/project/form/project-form.component.ts");






var routes = [
    {
        path: '',
        component: _project_component__WEBPACK_IMPORTED_MODULE_3__["ProjectComponent"],
        children: [
            { path: '', redirectTo: 'page', pathMatch: 'full' },
            { path: 'page', component: _list_project_list_component__WEBPACK_IMPORTED_MODULE_4__["ProjectListComponent"] },
            { path: 'form', component: _form_project_form_component__WEBPACK_IMPORTED_MODULE_5__["ProjectFormComponent"] },
        ],
    },
];
var ProjectRoutingModule = /** @class */ (function () {
    function ProjectRoutingModule() {
    }
    ProjectRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
        })
    ], ProjectRoutingModule);
    return ProjectRoutingModule;
}());



/***/ }),

/***/ "./src/app/routes/project/project.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/routes/project/project.component.ts ***!
  \*****************************************************/
/*! exports provided: ProjectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectComponent", function() { return ProjectComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ProjectComponent = /** @class */ (function () {
    function ProjectComponent() {
    }
    ProjectComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            template: __webpack_require__(/*! raw-loader!./project.component.html */ "./node_modules/raw-loader/index.js!./src/app/routes/project/project.component.html"),
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ProjectComponent);
    return ProjectComponent;
}());



/***/ }),

/***/ "./src/app/routes/project/project.module.ts":
/*!**************************************************!*\
  !*** ./src/app/routes/project/project.module.ts ***!
  \**************************************************/
/*! exports provided: ProjectModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectModule", function() { return ProjectModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _project_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project-routing.module */ "./src/app/routes/project/project-routing.module.ts");
/* harmony import */ var _project_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project.component */ "./src/app/routes/project/project.component.ts");
/* harmony import */ var _list_project_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./list/project-list.component */ "./src/app/routes/project/list/project-list.component.ts");
/* harmony import */ var _form_project_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./form/project-form.component */ "./src/app/routes/project/form/project-form.component.ts");
/* harmony import */ var _project_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./project.service */ "./src/app/routes/project/project.service.ts");








var ProjectModule = /** @class */ (function () {
    function ProjectModule() {
    }
    ProjectModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"], _project_routing_module__WEBPACK_IMPORTED_MODULE_3__["ProjectRoutingModule"]],
            declarations: [_project_component__WEBPACK_IMPORTED_MODULE_4__["ProjectComponent"], _list_project_list_component__WEBPACK_IMPORTED_MODULE_5__["ProjectListComponent"], _form_project_form_component__WEBPACK_IMPORTED_MODULE_6__["ProjectFormComponent"]],
            providers: [
                _project_service__WEBPACK_IMPORTED_MODULE_7__["ProjectService"],
            ],
        })
    ], ProjectModule);
    return ProjectModule;
}());



/***/ })

}]);
//# sourceMappingURL=project-project-module-es5.js.map