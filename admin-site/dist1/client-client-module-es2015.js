(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["client-client-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/routes/client/client.component.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/routes/client/client.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/routes/client/form/client-form.component.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/routes/client/form/client-form.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div nz-row [nzGutter]=\"24\" class=\"pt-lg\">\r\n  <div nz-col nzXs=\"24\" nzSm=\"12\" nzMd=\"24\" class=\"mb-md\">\r\n    <nz-card [nzBordered]=\"false\" [nzTitle]=\"title\">\r\n      <form nz-form [formGroup]=\"form\" (ngSubmit)=\"submit()\" se-container=\"1\" labelWidth=\"200\">\r\n        <se label=\"客户名称\" error=\"请输入名称，大于两个字符\" required>\r\n          <input nz-input formControlName=\"cname\" placeholder=\"请输入客户名称\" />\r\n        </se>\r\n        <se label=\"联系人\" error=\"请输入联系人，大于两个字符\">\r\n          <input nz-input formControlName=\"contact\" placeholder=\"请输入联系人\" />\r\n        </se>\r\n        <se label=\"联系方式\" error=\"请输入联系方式，大于两个字符\">\r\n          <input nz-input formControlName=\"contact_info\" placeholder=\"请输入联系方式\" />\r\n        </se>\r\n        <se label=\"开票信息\" error=\"请输入开票信息，大于两个字符\">\r\n          <input nz-input formControlName=\"invoice\" placeholder=\"请输入开票信息\" />\r\n        </se>\r\n        <se label=\"描述\">\r\n          <textarea rows=\"4\" nz-input formControlName=\"comments\" placeholder=\"请输入描述\"></textarea>\r\n        </se>\r\n        <se>\r\n          <button nz-button nzType=\"primary\" [disabled]=\"form.invalid\" type=\"submit\"\r\n            [nzLoading]=\"submitting\">提交</button>\r\n          <button nz-button class=\"ml-sm\" type=\"reset\">重置</button>\r\n        </se>\r\n      </form>\r\n    </nz-card>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/routes/client/list/client-list.component.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/routes/client/list/client-list.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div nz-row [nzGutter]=\"24\" class=\"pt-lg\">\r\n  <div nz-col nzXs=\"24\" nzSm=\"12\" nzMd=\"24\" class=\"mb-md\">\r\n    <nz-card [nzBordered]=\"false\" [nzTitle]=\"title\">\r\n      <form nz-form [nzLayout]=\"'inline'\" (ngSubmit)=\"getData()\" class=\"search__form\">\r\n        <div nz-row [nzGutter]=\"{ xs: 8, sm: 8, md: 8, lg: 24, xl: 48, xxl: 48 }\">\r\n          <div nz-col nzMd=\"8\" nzSm=\"24\">\r\n            <nz-form-item>\r\n              <nz-form-label nzFor=\"no\">名称</nz-form-label>\r\n              <nz-form-control>\r\n                <input nz-input [(ngModel)]=\"q.cname\" name=\"cname\" placeholder=\"输入名称搜索\" id=\"cname\" />\r\n              </nz-form-control>\r\n            </nz-form-item>\r\n          </div>\r\n\r\n          <div nz-col [nzSpan]=\"expandForm ? 24 : 8\" [class.text-right]=\"expandForm\">\r\n            <button nz-button type=\"submit\" [nzType]=\"'primary'\" [nzLoading]=\"loading\">查询</button>\r\n            <button nz-button type=\"reset\" (click)=\"reset()\" class=\"mx-sm\">重置</button>\r\n          </div>\r\n        </div>\r\n      </form>\r\n      <div class=\"mb-md\">\r\n        <button nz-button (click)=\"add()\" [nzType]=\"'primary'\">\r\n          <i nz-icon nzType=\"plus\"></i>\r\n          <span>新建</span>\r\n        </button>\r\n      </div>\r\n\r\n      <nz-table #nzTable [nzData]=\"data\" [nzTotal]=\"total\" [nzPageSize]=\"q.ps\" [nzLoading]=\"loading\"\r\n        (nzPageIndexChange)=\"pageChange($event)\" nzShowSizeChanger>\r\n        <thead nz-thead (nzSortChange)=\"sort($event)\" nzSingleSort>\r\n          <tr>\r\n            <th nz-th nzShowSort nzSortKey=\"cname\">\r\n              <span>客户名称</span>\r\n            </th>\r\n            <th nz-th nzShowSort nzSortKey=\"contact\">\r\n              <span>联系人</span>\r\n            </th>\r\n            <th nz-th nzShowSort nzSortKey=\"contact_info\">\r\n              <span>联系方式</span>\r\n            </th>\r\n            <th nz-th nzShowSort nzSortKey=\"invoice\">\r\n              <span>开票信息</span>\r\n            </th>\r\n            <th nz-th nzShowSort nzSortKey=\"comments\">\r\n              <span>备注</span>\r\n            </th>\r\n            <th nz-th>\r\n              <span>操作</span>\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody nz-tbody>\r\n          <tr nz-tbody-tr *ngFor=\"let i of nzTable.data\">\r\n            <td nz-td>{{i.cname}}</td>\r\n            <td nz-td>{{i.contact}}</td>\r\n            <td nz-td>{{i.contact_info}}</td>\r\n            <td nz-td>{{i.invoice}}</td>\r\n            <td nz-td>{{i.comments}}</td>\r\n\r\n            <td nz-td>\r\n              <a (click)=\"modify(i.id)\">修改</a>\r\n              <span nz-table-divider></span>\r\n              <nz-divider nzType=\"vertical\"></nz-divider>\r\n              <a (click)=\"remove(i)\">删除</a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </nz-table>\r\n    </nz-card>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/routes/client/client-routing.module.ts":
/*!********************************************************!*\
  !*** ./src/app/routes/client/client-routing.module.ts ***!
  \********************************************************/
/*! exports provided: ClientRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientRoutingModule", function() { return ClientRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _client_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./client.component */ "./src/app/routes/client/client.component.ts");
/* harmony import */ var _list_client_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./list/client-list.component */ "./src/app/routes/client/list/client-list.component.ts");
/* harmony import */ var _form_client_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form/client-form.component */ "./src/app/routes/client/form/client-form.component.ts");






const routes = [
    {
        path: '',
        component: _client_component__WEBPACK_IMPORTED_MODULE_3__["ClientComponent"],
        children: [
            { path: '', redirectTo: 'page', pathMatch: 'full' },
            { path: 'page', component: _list_client_list_component__WEBPACK_IMPORTED_MODULE_4__["ClientListComponent"] },
            { path: 'form', component: _form_client_form_component__WEBPACK_IMPORTED_MODULE_5__["ClientFormComponent"] },
        ],
    },
];
let ClientRoutingModule = class ClientRoutingModule {
};
ClientRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], ClientRoutingModule);



/***/ }),

/***/ "./src/app/routes/client/client.component.ts":
/*!***************************************************!*\
  !*** ./src/app/routes/client/client.component.ts ***!
  \***************************************************/
/*! exports provided: ClientComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientComponent", function() { return ClientComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ClientComponent = class ClientComponent {
    constructor() { }
};
ClientComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        template: __webpack_require__(/*! raw-loader!./client.component.html */ "./node_modules/raw-loader/index.js!./src/app/routes/client/client.component.html"),
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ClientComponent);



/***/ }),

/***/ "./src/app/routes/client/client.module.ts":
/*!************************************************!*\
  !*** ./src/app/routes/client/client.module.ts ***!
  \************************************************/
/*! exports provided: ClientModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientModule", function() { return ClientModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared */ "./src/app/shared/index.ts");
/* harmony import */ var _client_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./client-routing.module */ "./src/app/routes/client/client-routing.module.ts");
/* harmony import */ var _client_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./client.component */ "./src/app/routes/client/client.component.ts");
/* harmony import */ var _list_client_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./list/client-list.component */ "./src/app/routes/client/list/client-list.component.ts");
/* harmony import */ var _form_client_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./form/client-form.component */ "./src/app/routes/client/form/client-form.component.ts");
/* harmony import */ var _client_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./client.service */ "./src/app/routes/client/client.service.ts");








const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];
let ClientModule = class ClientModule {
};
ClientModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _shared__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
            _client_routing_module__WEBPACK_IMPORTED_MODULE_3__["ClientRoutingModule"]
        ],
        declarations: [
            ...COMPONENTS,
            ...COMPONENTS_NOROUNT,
            _client_component__WEBPACK_IMPORTED_MODULE_4__["ClientComponent"],
            _list_client_list_component__WEBPACK_IMPORTED_MODULE_5__["ClientListComponent"],
            _form_client_form_component__WEBPACK_IMPORTED_MODULE_6__["ClientFormComponent"]
        ],
        providers: [
            _client_service__WEBPACK_IMPORTED_MODULE_7__["ClientService"]
        ],
        entryComponents: COMPONENTS_NOROUNT
    })
], ClientModule);



/***/ }),

/***/ "./src/app/routes/client/client.service.ts":
/*!*************************************************!*\
  !*** ./src/app/routes/client/client.service.ts ***!
  \*************************************************/
/*! exports provided: ClientService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientService", function() { return ClientService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_app_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/app-config */ "./src/app/shared/app-config.ts");
/* harmony import */ var _shared_utils_formmat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/utils/formmat */ "./src/app/shared/utils/formmat.ts");





let ClientService = class ClientService {
    constructor(http) {
        this.http = http;
        this.url = _shared_app_config__WEBPACK_IMPORTED_MODULE_3__["baseUrl"] + 'clients';
        this.client = null;
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
        console.log("添加");
        return this.http.post(this.url, obj);
    }
    update(id, obj) {
        return this.http.put(this.url + `/${id}`, obj);
    }
    delete(id) {
        return this.http.delete(this.url + `/${id}`);
    }
};
ClientService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
ClientService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], ClientService);



/***/ }),

/***/ "./src/app/routes/client/form/client-form.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/routes/client/form/client-form.component.ts ***!
  \*************************************************************/
/*! exports provided: ClientFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientFormComponent", function() { return ClientFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _client_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../client.service */ "./src/app/routes/client/client.service.ts");






let ClientFormComponent = class ClientFormComponent {
    constructor(fb, msg, cdr, router, srv) {
        this.fb = fb;
        this.msg = msg;
        this.cdr = cdr;
        this.router = router;
        this.srv = srv;
        this.submitting = false;
        this.client = {};
    }
    ngOnInit() {
        if (this.srv.isUpdate)
            this.initUpdate();
        this.setTitle();
        this.form = this.fb.group({
            cname: [
                this.client.cname ? this.client.cname : null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(2)]),
            ],
            contact: [this.client.contact ? this.client.contact : null, []],
            contact_info: [this.client.contact_info ? this.client.contact_info : null, []],
            invoice: [this.client.invoice ? this.client.invoice : null, []],
            comments: [this.client.comments ? this.client.comments : null, []],
        });
    }
    submit() {
        if (!this.srv.isUpdate) {
            console.log("新增客户");
            this.submitting = true;
            const obj = this.formmatFormValue();
            this.srv.add(obj).subscribe(resp => {
                this.submitting = false;
                if (resp['data'])
                    this.msg.success(`保存成功！`);
                this.router.navigateByUrl('/client/page');
                this.cdr.detectChanges();
            });
        }
        else {
            this.submitting = true;
            const obj = this.formmatFormValue();
            this.srv.update(this.client.id, obj).subscribe(resp => {
                if (resp['data']) {
                    this.submitting = false;
                    if (resp['data'])
                        this.msg.success(`保存成功！`);
                    this.router.navigateByUrl('/client/page');
                    this.cdr.detectChanges();
                }
            });
        }
    }
    setTitle() {
        if (this.srv.isUpdate) {
            this.title = '修改客户';
        }
        else
            this.title = '创建客户';
    }
    initUpdate() {
        this.setTitle();
        this.client = this.srv.client;
    }
    formmatFormValue() {
        let obj = this.form.value;
        // obj.date = getFormatDateStr(obj.date);
        return { client: obj };
    }
};
ClientFormComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NzMessageService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _client_service__WEBPACK_IMPORTED_MODULE_5__["ClientService"] }
];
ClientFormComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        template: __webpack_require__(/*! raw-loader!./client-form.component.html */ "./node_modules/raw-loader/index.js!./src/app/routes/client/form/client-form.component.html"),
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
        ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NzMessageService"],
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _client_service__WEBPACK_IMPORTED_MODULE_5__["ClientService"]])
], ClientFormComponent);



/***/ }),

/***/ "./src/app/routes/client/list/client-list.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/routes/client/list/client-list.component.ts ***!
  \*************************************************************/
/*! exports provided: ClientListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientListComponent", function() { return ClientListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _delon_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @delon/theme */ "./node_modules/@delon/theme/fesm2015/theme.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _client_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../client.service */ "./src/app/routes/client/client.service.ts");







let ClientListComponent = class ClientListComponent {
    constructor(http, msg, modalSrv, cdr, srv, router) {
        this.http = http;
        this.msg = msg;
        this.modalSrv = modalSrv;
        this.cdr = cdr;
        this.srv = srv;
        this.router = router;
        this.title = '客户管理';
        this.total = 0;
        this.q = {
            pi: 1,
            ps: 10,
            sort_field: 'cname',
            sort_direction: 'desc',
            cname: null,
        };
        this.datas = [
            {
                "pname": "祥云公司",
                "comments": "123"
            },
            {
                "pname": "马钢",
                "comments": "456"
            }
        ];
        this.data = [];
        this.loading = false;
        this.expandForm = false;
    }
    ngOnInit() {
        this.getData();
        console.log(this.datas);
    }
    getData() {
        this.loading = true;
        this.srv
            .listOnePage(this.q)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(() => (this.loading = false)))
            .subscribe(resp => {
            this.data = resp['data'];
            this.cdr.detectChanges();
        });
    }
    add(tpl) {
        this.srv.isUpdate = false;
        this.router.navigateByUrl('/client/form');
    }
    modify(id) {
        this.srv.isUpdate = true;
        this.srv.getById(id).subscribe(resp => {
            this.srv.client = resp['data'];
            this.router.navigateByUrl('/client/form');
        });
    }
    remove(item) {
        this.modalSrv.create({
            nzTitle: '确认删除',
            nzContent: '确认要删除客户：' + item.pname + ' 吗?',
            nzOnOk: () => {
                this.loading = true;
                this.srv.delete(item.id).subscribe(resp => {
                    if (resp['data'])
                        this.msg.success(`删除成功！`);
                    this.reset();
                });
            },
        });
    }
    reset() {
        setTimeout(() => this.getData());
    }
    pageChange(pi) {
        this.q.pi = pi;
        this.reset();
    }
    sort(sort) {
        this.q.sort_field = sort.key;
        this.q.sort_direction = sort.value;
        this.reset();
    }
};
ClientListComponent.ctorParameters = () => [
    { type: _delon_theme__WEBPACK_IMPORTED_MODULE_4__["_HttpClient"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzModalService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
    { type: _client_service__WEBPACK_IMPORTED_MODULE_6__["ClientService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
ClientListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        template: __webpack_require__(/*! raw-loader!./client-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/routes/client/list/client-list.component.html"),
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_delon_theme__WEBPACK_IMPORTED_MODULE_4__["_HttpClient"],
        ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"],
        ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzModalService"],
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
        _client_service__WEBPACK_IMPORTED_MODULE_6__["ClientService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], ClientListComponent);



/***/ })

}]);
//# sourceMappingURL=client-client-module-es2015.js.map