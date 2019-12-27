(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["supplier-supplier-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/routes/supplier/form/supplier-form.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/routes/supplier/form/supplier-form.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div nz-row [nzGutter]=\"24\" class=\"pt-lg\">\r\n    <div nz-col nzXs=\"24\" nzSm=\"12\" nzMd=\"24\" class=\"mb-md\">\r\n        <nz-card [nzBordered]=\"false\" [nzTitle]=\"title\">\r\n            <form nz-form [formGroup]=\"form\" (ngSubmit)=\"submit()\" se-container=\"1\" labelWidth=\"200\">\r\n                <se label=\"供应商名称\" error=\"请输入名称，大于两个字符\" required>\r\n                    <input nz-input formControlName=\"sname\" placeholder=\"请输入供应商名称\" />\r\n                </se>\r\n                <se label=\"联系人\" error=\"请输入联系人，大于两个字符\">\r\n                    <input nz-input formControlName=\"contact\" placeholder=\"请输入联系人\" />\r\n                </se>\r\n                <se label=\"联系方式\" error=\"请输入联系方式，大于两个字符\">\r\n                    <input nz-input formControlName=\"contact_info\" placeholder=\"请输入联系方式\" />\r\n                </se>\r\n                <se label=\"开票信息\" error=\"请输入开票信息，大于两个字符\">\r\n                    <input nz-input formControlName=\"invoice\" placeholder=\"请输入开票信息\" />\r\n                </se>\r\n                <se label=\"描述\">\r\n                    <textarea rows=\"4\" nz-input formControlName=\"comments\" placeholder=\"请输入描述\"></textarea>\r\n                </se>\r\n                <se>\r\n                    <button nz-button nzType=\"primary\" [disabled]=\"form.invalid\" type=\"submit\"\r\n                        [nzLoading]=\"submitting\">提交</button>\r\n                    <button nz-button class=\"ml-sm\" type=\"reset\">重置</button>\r\n                </se>\r\n            </form>\r\n        </nz-card>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/routes/supplier/list/supplier-list.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/routes/supplier/list/supplier-list.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div nz-row [nzGutter]=\"24\" class=\"pt-lg\">\r\n    <div nz-col nzXs=\"24\" nzSm=\"12\" nzMd=\"24\" class=\"mb-md\">\r\n        <nz-card [nzBordered]=\"false\" [nzTitle]=\"title\">\r\n            <form nz-form [nzLayout]=\"'inline'\" (ngSubmit)=\"getData()\" class=\"search__form\">\r\n                <div nz-row [nzGutter]=\"{ xs: 8, sm: 8, md: 8, lg: 24, xl: 48, xxl: 48 }\">\r\n                    <div nz-col nzMd=\"8\" nzSm=\"24\">\r\n                        <nz-form-item>\r\n                            <nz-form-label nzFor=\"no\">名称</nz-form-label>\r\n                            <nz-form-control>\r\n                                <input nz-input [(ngModel)]=\"q.sname\" name=\"sname\" placeholder=\"输入名称搜索\" id=\"sname\" />\r\n                            </nz-form-control>\r\n                        </nz-form-item>\r\n                    </div>\r\n\r\n                    <div nz-col [nzSpan]=\"expandForm ? 24 : 8\" [class.text-right]=\"expandForm\">\r\n                        <button nz-button type=\"submit\" [nzType]=\"'primary'\" [nzLoading]=\"loading\">查询</button>\r\n                        <button nz-button type=\"reset\" (click)=\"reset()\" class=\"mx-sm\">重置</button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n            <div class=\"mb-md\">\r\n                <button nz-button (click)=\"add()\" [nzType]=\"'primary'\">\r\n                    <i nz-icon nzType=\"plus\"></i>\r\n                    <span>新建</span>\r\n                </button>\r\n            </div>\r\n\r\n            <nz-table #nzTable [nzData]=\"data\" [nzTotal]=\"total\" [nzPageSize]=\"q.ps\" [nzLoading]=\"loading\"\r\n                (nzPageIndexChange)=\"pageChange($event)\" nzShowSizeChanger>\r\n                <thead nz-thead (nzSortChange)=\"sort($event)\" nzSingleSort>\r\n                    <tr>\r\n                        <th nz-th nzShowSort nzSortKey=\"sname\">\r\n                            <span>供应商名称</span>\r\n                        </th>\r\n                        <th nz-th nzShowSort nzSortKey=\"contact\">\r\n                            <span>联系人</span>\r\n                        </th>\r\n                        <th nz-th nzShowSort nzSortKey=\"contact_info\">\r\n                            <span>联系方式</span>\r\n                        </th>\r\n                        <th nz-th nzShowSort nzSortKey=\"invoice\">\r\n                            <span>开票信息</span>\r\n                        </th>\r\n                        <th nz-th nzShowSort nzSortKey=\"comments\">\r\n                            <span>备注</span>\r\n                        </th>\r\n                        <th nz-th>\r\n                            <span>操作</span>\r\n                        </th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody nz-tbody>\r\n                    <tr nz-tbody-tr *ngFor=\"let i of nzTable.data\">\r\n                        <td nz-td>{{i.sname}}</td>\r\n                        <td nz-td>{{i.contact}}</td>\r\n                        <td nz-td>{{i.contact_info}}</td>\r\n                        <td nz-td>{{i.invoice}}</td>\r\n                        <td nz-td>{{i.comments}}</td>\r\n\r\n                        <td nz-td>\r\n                            <a (click)=\"modify(i.id)\">修改</a>\r\n                            <span nz-table-divider></span>\r\n                            <nz-divider nzType=\"vertical\"></nz-divider>\r\n                            <a (click)=\"remove(i)\">删除</a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </nz-table>\r\n        </nz-card>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/routes/supplier/supplier.component.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/routes/supplier/supplier.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/routes/supplier/form/supplier-form.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/routes/supplier/form/supplier-form.component.ts ***!
  \*****************************************************************/
/*! exports provided: SupplierFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupplierFormComponent", function() { return SupplierFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _supplier_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../supplier.service */ "./src/app/routes/supplier/supplier.service.ts");






let SupplierFormComponent = class SupplierFormComponent {
    constructor(fb, msg, cdr, router, srv) {
        this.fb = fb;
        this.msg = msg;
        this.cdr = cdr;
        this.router = router;
        this.srv = srv;
        this.submitting = false;
        this.supplier = {};
    }
    ngOnInit() {
        if (this.srv.isUpdate)
            this.initUpdate();
        this.setTitle();
        this.form = this.fb.group({
            sname: [
                this.supplier.sname ? this.supplier.sname : null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(2)]),
            ],
            contact: [this.supplier.contact ? this.supplier.contact : null, []],
            contact_info: [this.supplier.contact_info ? this.supplier.contact_info : null, []],
            invoice: [this.supplier.invoice ? this.supplier.invoice : null, []],
            comments: [this.supplier.comments ? this.supplier.comments : null, []],
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
                this.router.navigateByUrl('/supplier/page');
                this.cdr.detectChanges();
            });
        }
        else {
            this.submitting = true;
            const obj = this.formmatFormValue();
            this.srv.update(this.supplier.id, obj).subscribe(resp => {
                if (resp['data']) {
                    this.submitting = false;
                    if (resp['data'])
                        this.msg.success(`保存成功！`);
                    this.router.navigateByUrl('/supplier/page');
                    this.cdr.detectChanges();
                }
            });
        }
    }
    setTitle() {
        if (this.srv.isUpdate) {
            this.title = '修改供应商';
        }
        else
            this.title = '创建供应商';
    }
    initUpdate() {
        this.setTitle();
        this.supplier = this.srv.supplier;
    }
    formmatFormValue() {
        let obj = this.form.value;
        // obj.date = getFormatDateStr(obj.date);
        return { supplier: obj };
    }
};
SupplierFormComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NzMessageService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _supplier_service__WEBPACK_IMPORTED_MODULE_5__["SupplierService"] }
];
SupplierFormComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        template: __webpack_require__(/*! raw-loader!./supplier-form.component.html */ "./node_modules/raw-loader/index.js!./src/app/routes/supplier/form/supplier-form.component.html"),
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
        ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NzMessageService"],
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _supplier_service__WEBPACK_IMPORTED_MODULE_5__["SupplierService"]])
], SupplierFormComponent);



/***/ }),

/***/ "./src/app/routes/supplier/list/supplier-list.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/routes/supplier/list/supplier-list.component.ts ***!
  \*****************************************************************/
/*! exports provided: SupplierListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupplierListComponent", function() { return SupplierListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _delon_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @delon/theme */ "./node_modules/@delon/theme/fesm2015/theme.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _supplier_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../supplier.service */ "./src/app/routes/supplier/supplier.service.ts");







let SupplierListComponent = class SupplierListComponent {
    constructor(http, msg, modalSrv, cdr, srv, router) {
        this.http = http;
        this.msg = msg;
        this.modalSrv = modalSrv;
        this.cdr = cdr;
        this.srv = srv;
        this.router = router;
        this.title = '供应商管理';
        this.total = 0;
        this.q = {
            pi: 1,
            ps: 10,
            sort_field: 'sname',
            sort_direction: 'desc',
            sname: null,
        };
        this.datas = [
            {
                "sname": "xycloud",
                "comments": "123"
            },
            {
                "sname": "masteel",
                "comments": "456"
            }
        ];
        this.data = [];
        this.loading = false;
        this.expandForm = false;
    }
    ngOnInit() {
        this.getData();
        // console.log(this.datas)
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
        this.router.navigateByUrl('/supplier/form');
    }
    modify(id) {
        this.srv.isUpdate = true;
        this.srv.getById(id).subscribe(resp => {
            this.srv.supplier = resp['data'];
            this.router.navigateByUrl('/supplier/form');
        });
    }
    remove(item) {
        this.modalSrv.create({
            nzTitle: '确认删除',
            nzContent: '确认要删除供应商：' + item.pname + ' 吗?',
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
SupplierListComponent.ctorParameters = () => [
    { type: _delon_theme__WEBPACK_IMPORTED_MODULE_4__["_HttpClient"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzModalService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
    { type: _supplier_service__WEBPACK_IMPORTED_MODULE_6__["SupplierService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
SupplierListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        template: __webpack_require__(/*! raw-loader!./supplier-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/routes/supplier/list/supplier-list.component.html"),
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_delon_theme__WEBPACK_IMPORTED_MODULE_4__["_HttpClient"],
        ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"],
        ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzModalService"],
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
        _supplier_service__WEBPACK_IMPORTED_MODULE_6__["SupplierService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], SupplierListComponent);



/***/ }),

/***/ "./src/app/routes/supplier/supplier-routing.module.ts":
/*!************************************************************!*\
  !*** ./src/app/routes/supplier/supplier-routing.module.ts ***!
  \************************************************************/
/*! exports provided: SupplierRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupplierRoutingModule", function() { return SupplierRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _supplier_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./supplier.component */ "./src/app/routes/supplier/supplier.component.ts");
/* harmony import */ var _list_supplier_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./list/supplier-list.component */ "./src/app/routes/supplier/list/supplier-list.component.ts");
/* harmony import */ var _form_supplier_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form/supplier-form.component */ "./src/app/routes/supplier/form/supplier-form.component.ts");






const routes = [
    {
        path: '',
        component: _supplier_component__WEBPACK_IMPORTED_MODULE_3__["SupplierComponent"],
        children: [
            { path: '', redirectTo: 'page', pathMatch: 'full' },
            { path: 'page', component: _list_supplier_list_component__WEBPACK_IMPORTED_MODULE_4__["SupplierListComponent"] },
            { path: 'form', component: _form_supplier_form_component__WEBPACK_IMPORTED_MODULE_5__["SupplierFormComponent"] },
        ],
    },
];
let SupplierRoutingModule = class SupplierRoutingModule {
};
SupplierRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], SupplierRoutingModule);



/***/ }),

/***/ "./src/app/routes/supplier/supplier.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/routes/supplier/supplier.component.ts ***!
  \*******************************************************/
/*! exports provided: SupplierComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupplierComponent", function() { return SupplierComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let SupplierComponent = class SupplierComponent {
    constructor() { }
};
SupplierComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        template: __webpack_require__(/*! raw-loader!./supplier.component.html */ "./node_modules/raw-loader/index.js!./src/app/routes/supplier/supplier.component.html"),
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], SupplierComponent);



/***/ }),

/***/ "./src/app/routes/supplier/supplier.module.ts":
/*!****************************************************!*\
  !*** ./src/app/routes/supplier/supplier.module.ts ***!
  \****************************************************/
/*! exports provided: SupplierModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupplierModule", function() { return SupplierModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared */ "./src/app/shared/index.ts");
/* harmony import */ var _supplier_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./supplier-routing.module */ "./src/app/routes/supplier/supplier-routing.module.ts");
/* harmony import */ var _supplier_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./supplier.component */ "./src/app/routes/supplier/supplier.component.ts");
/* harmony import */ var _list_supplier_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./list/supplier-list.component */ "./src/app/routes/supplier/list/supplier-list.component.ts");
/* harmony import */ var _form_supplier_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./form/supplier-form.component */ "./src/app/routes/supplier/form/supplier-form.component.ts");
/* harmony import */ var _supplier_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./supplier.service */ "./src/app/routes/supplier/supplier.service.ts");








const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];
let SupplierModule = class SupplierModule {
};
SupplierModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _shared__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
            _supplier_routing_module__WEBPACK_IMPORTED_MODULE_3__["SupplierRoutingModule"]
        ],
        declarations: [
            ...COMPONENTS,
            ...COMPONENTS_NOROUNT,
            _supplier_component__WEBPACK_IMPORTED_MODULE_4__["SupplierComponent"],
            _list_supplier_list_component__WEBPACK_IMPORTED_MODULE_5__["SupplierListComponent"],
            _form_supplier_form_component__WEBPACK_IMPORTED_MODULE_6__["SupplierFormComponent"]
        ],
        providers: [
            _supplier_service__WEBPACK_IMPORTED_MODULE_7__["SupplierService"],
        ],
        entryComponents: COMPONENTS_NOROUNT
    })
], SupplierModule);



/***/ }),

/***/ "./src/app/routes/supplier/supplier.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/routes/supplier/supplier.service.ts ***!
  \*****************************************************/
/*! exports provided: SupplierService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupplierService", function() { return SupplierService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_app_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/app-config */ "./src/app/shared/app-config.ts");
/* harmony import */ var _shared_utils_formmat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/utils/formmat */ "./src/app/shared/utils/formmat.ts");





let SupplierService = class SupplierService {
    constructor(http) {
        this.http = http;
        this.url = _shared_app_config__WEBPACK_IMPORTED_MODULE_3__["baseUrl"] + 'suppliers';
        this.supplier = null;
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
        console.log("新增客户");
        return this.http.post(this.url, obj);
    }
    update(id, obj) {
        return this.http.put(this.url + `/${id}`, obj);
    }
    delete(id) {
        return this.http.delete(this.url + `/${id}`);
    }
};
SupplierService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
SupplierService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], SupplierService);



/***/ })

}]);
//# sourceMappingURL=supplier-supplier-module-es2015.js.map