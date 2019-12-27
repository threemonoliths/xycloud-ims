(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["contract-contract-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/routes/contract/contract.component.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/routes/contract/contract.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/routes/contract/form/contract-form.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/routes/contract/form/contract-form.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<page-header nzTitle=\"创建合同\">\r\n    <button nz-button class=\"ml-sm\" type=\"return\" (click)=\"goBack()\">返回</button>\r\n</page-header>\r\n<div nz-row [nzGutter]=\"24\" class=\"pt-lg\">\r\n    <div nz-col nzXs=\"24\" nzSm=\"12\" nzMd=\"24\" class=\"mb-md\">\r\n        <nz-card [nzBordered]=\"false\">\r\n            <form nz-form [formGroup]=\"form\" (ngSubmit)=\"submit()\" [nzLayout]=\"'vertical'\">\r\n                <nz-card [nzBordered]=\"false\" nzTitle=\"合同管理\">\r\n                    <nz-row nzGutter=\"16\">\r\n                        <nz-col nzLg=\"6\" nzMd=\"12\" nzSm=\"24\">\r\n                            <nz-form-item>\r\n                                <nz-form-label nzFor=\"name\">合同编号</nz-form-label>\r\n                                <nz-form-control nzErrorTip=\"请输入合同编号，大于两个字符\" required>\r\n                                    <input nz-input formControlName=\"cno\" placeholder=\"请输入合同编号\" />\r\n                                </nz-form-control>\r\n                            </nz-form-item>\r\n                        </nz-col>\r\n                        <nz-col [nzXl]=\"{ span: 6, offset: 2 }\" [nzLg]=\"{ span: 8 }\" [nzMd]=\"{ span: 12 }\" nzSm=\"24\">\r\n                            <nz-form-item>\r\n                                <nz-form-label>合同名称</nz-form-label>\r\n                                <nz-form-control nzErrorTip=\"请输入合同名称，大于两个字符\" required>\r\n                                    <input nz-input formControlName=\"cname\" placeholder=\"请输入合同名称\" />\r\n                                </nz-form-control>\r\n                            </nz-form-item>\r\n                        </nz-col>\r\n                        <nz-col [nzXl]=\"{ span: 8, offset: 2 }\" [nzLg]=\"{ span: 10 }\" [nzMd]=\"{ span: 24 }\" nzSm=\"24\">\r\n                            <nz-form-item>\r\n                                <nz-form-label>项目类型</nz-form-label>\r\n                                <nz-form-control nzErrorTip=\"请选择项目类型\" required>\r\n                                    <nz-select formControlName=\"project_id\" placeholder=\"请选择项目类型\"\r\n                                        [(ngModel)]=\"selectedOption\" [nzPlaceHolder]=\"myPlaceHolder\" nzAllowClear\r\n                                        [nzShowSearch]=\"true\" [nzNotFoundContent]=\"'无匹配'\">\r\n                                        <nz-option *ngFor=\"let option of project_data\" [nzLabel]=\"option.pname\"\r\n                                            [nzValue]=\"option.id\" [nzDisabled]=\"option.disabled\">\r\n                                        </nz-option>\r\n                                    </nz-select>\r\n                                </nz-form-control>\r\n                            </nz-form-item>\r\n                        </nz-col>\r\n                    </nz-row>\r\n                    <nz-row nzGutter=\"16\">\r\n                        <nz-col nzLg=\"6\" nzMd=\"12\" nzSm=\"24\">\r\n                            <nz-form-item>\r\n                                <nz-form-label>甲方</nz-form-label>\r\n                                <nz-form-control nzErrorTip=\"请输入甲方，大于两个字符\" required>\r\n                                    <input nz-input formControlName=\"party_a\" placeholder=\"请输入甲方\" />\r\n                                </nz-form-control>\r\n                            </nz-form-item>\r\n                        </nz-col>\r\n                        <nz-col [nzXl]=\"{ span: 6, offset: 2 }\" [nzLg]=\"{ span: 8 }\" [nzMd]=\"{ span: 12 }\" nzSm=\"24\">\r\n                            <nz-form-item>\r\n                                <nz-form-label>乙方</nz-form-label>\r\n                                <nz-form-control nzErrorTip=\"请输入乙方，大于两个字符\" required>\r\n                                    <input nz-input formControlName=\"party_b\" placeholder=\"请输入乙方\" />\r\n                                </nz-form-control>\r\n                            </nz-form-item>\r\n                        </nz-col>\r\n                        <nz-col [nzXl]=\"{ span: 8, offset: 2 }\" [nzLg]=\"{ span: 10 }\" [nzMd]=\"{ span: 24 }\" nzSm=\"24\">\r\n                            <nz-form-item>\r\n                                <nz-form-label>合同额</nz-form-label>\r\n                                <nz-form-control nzErrorTip=\"请输入合同额，大于两个字符\" required>\r\n                                    <input nz-input formControlName=\"amount\" placeholder=\"请输入合同额\" />\r\n                                </nz-form-control>\r\n                            </nz-form-item>\r\n                        </nz-col>\r\n                    </nz-row>\r\n                    <nz-row>\r\n                        <nz-col nzLg=\"6\" nzMd=\"12\" nzSm=\"24\">\r\n                            <nz-form-item>\r\n                                <nz-form-label>签订日期</nz-form-label>\r\n                                <nz-form-control nzErrorTip=\"请选择签订日期\" required>\r\n                                    <nz-date-picker formControlName=\"sign_date\"></nz-date-picker>\r\n                                </nz-form-control>\r\n                            </nz-form-item>\r\n                        </nz-col>\r\n                        <nz-col [nzXl]=\"{ span: 6, offset: 2 }\" [nzLg]=\"{ span: 8 }\" [nzMd]=\"{ span: 12 }\" nzSm=\"24\">\r\n                            <nz-form-item>\r\n                                <nz-form-label>终止日期</nz-form-label>\r\n                                <nz-form-control nzErrorTip=\"请选择终止日期\" required>\r\n                                    <nz-date-picker formControlName=\"expiry_date\"></nz-date-picker>\r\n                                </nz-form-control>\r\n                            </nz-form-item>\r\n                        </nz-col>\r\n                        <nz-col [nzXl]=\"{ span: 8, offset: 2 }\" [nzLg]=\"{ span: 10 }\" [nzMd]=\"{ span: 24 }\" nzSm=\"24\">\r\n                            <nz-form-item>\r\n                                <nz-form-label>描述</nz-form-label>\r\n                                <nz-form-control nzErrorTip=\"请输入描述，大于两个字符\" required>\r\n                                    <textarea rows=\"1\" nz-input formControlName=\"comments\"\r\n                                        placeholder=\"请输入描述\"></textarea>\r\n                                </nz-form-control>\r\n                            </nz-form-item>\r\n                        </nz-col>\r\n                    </nz-row>\r\n                </nz-card>\r\n                <!-- 合同子表 -->\r\n                <nz-card [nzBordered]=\"false\" nzTitle=\"合同明细子表\">\r\n                    <nz-table formArrayName=\"contract_details\" [nzData]=\"contract_details.value\"\r\n                        [nzShowPagination]=\"false\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th>笔次信息</th>\r\n                                <th>发票金额</th>\r\n                                <th>实付金额</th>\r\n                                <th>发票信息</th>\r\n                                <th>实付信息</th>\r\n                                <th>操作</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr *ngFor=\"let item of contract_details.controls; let i = index\" [formGroupName]=\"i\">\r\n                                <td>\r\n                                    <span *ngIf=\"editIndex !== i\">{{ contract_details.value[i].issue_name }}</span>\r\n                                    <span *ngIf=\"editIndex === i\" nz-form-control nzErrorTip=\"请输入笔次信息\">\r\n                                        <input nz-input formControlName=\"issue_name\" placeholder=\"请输入笔次信息\" />\r\n                                    </span>\r\n                                </td>\r\n                                <td>\r\n                                    <span *ngIf=\"editIndex !== i\">{{ contract_details.value[i].invoice_amount }}</span>\r\n                                    <span *ngIf=\"editIndex === i\" nz-form-control nzErrorTip=\"请输入发票金额\">\r\n                                        <input nz-input formControlName=\"invoice_amount\" placeholder=\"发票金额\" />\r\n                                    </span>\r\n                                </td>\r\n                                <td>\r\n                                    <span *ngIf=\"editIndex !== i\">{{ contract_details.value[i].actual_payment }}</span>\r\n                                    <span *ngIf=\"editIndex === i\" nz-form-control nzErrorTip=\"请输入实付金额\">\r\n                                        <input nz-input formControlName=\"actual_payment\" placeholder=\"请输入实付金额\" />\r\n                                    </span>\r\n                                </td>\r\n                                <td>\r\n                                    <span *ngIf=\"editIndex !== i\">{{ contract_details.value[i].invoice_date }}</span>\r\n                                    <span *ngIf=\"editIndex === i\" nz-form-control nzErrorTip=\"请选择发票日期\">\r\n                                        <nz-date-picker formControlName=\"invoice_date\"></nz-date-picker>\r\n                                    </span>\r\n                                </td>\r\n                                <td>\r\n                                    <span *ngIf=\"editIndex !== i\">{{ contract_details.value[i].payment_date }}</span>\r\n                                    <span *ngIf=\"editIndex === i\" nz-form-control nzErrorTip=\"请选择实付日期\">\r\n                                        <nz-date-picker formControlName=\"payment_date\"></nz-date-picker>\r\n                                    </span>\r\n                                </td>\r\n                                <td>\r\n                                    <span *ngIf=\"editIndex !== i\">\r\n                                        <a (click)=\"edit(i)\">编辑</a>\r\n                                        <nz-divider nzType=\"vertical\"></nz-divider>\r\n                                        <nz-popconfirm (nzOnConfirm)=\"del(i)\" [nzTitle]=\"'是否要删除此行？'\">\r\n                                            <a nz-popconfirm>删除</a>\r\n                                        </nz-popconfirm>\r\n                                    </span>\r\n                                    <span *ngIf=\"editIndex === i\">\r\n                                        <a (click)=\"save(i)\">保存</a>\r\n                                        <nz-divider nzType=\"vertical\"></nz-divider>\r\n                                        <nz-popconfirm (nzOnConfirm)=\"cancel(i)\" [nzTitle]=\"'是否要取消操作？'\">\r\n                                            <a nz-popconfirm>取消</a>\r\n                                        </nz-popconfirm>\r\n                                    </span>\r\n                                </td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </nz-table>\r\n                    <button *ngIf=\"editIndex === -1\" nz-button [nzType]=\"'dashed'\" (click)=\"add()\" nzBlock\r\n                        class=\"mt-md\">\r\n                        <i nz-icon nzType=\"plus\"></i>\r\n                        <span>新增明细</span>\r\n                    </button>\r\n                </nz-card>\r\n                <footer-toolbar errorCollect>\r\n                    <button nz-button class=\"ml-sm\" type=\"reset\">重置</button>\r\n                    <button nz-button type=\"submit\" nzType=\"primary\" [disabled]=\"form.invalid\"\r\n                        [nzLoading]=\"submitting\">提交</button>\r\n                </footer-toolbar>\r\n\r\n\r\n            </form>\r\n        </nz-card>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/routes/contract/list/contract-list.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/routes/contract/list/contract-list.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div nz-row [nzGutter]=\"24\" class=\"pt-lg\">\r\n    <div nz-col nzXs=\"24\" nzSm=\"12\" nzMd=\"24\" class=\"mb-md\">\r\n        <nz-card [nzBordered]=\"false\" [nzTitle]=\"title\">\r\n            <form nz-form [nzLayout]=\"'inline'\" (ngSubmit)=\"getData()\" class=\"search__form\">\r\n                <div nz-row [nzGutter]=\"{ xs: 8, sm: 8, md: 8, lg: 24, xl: 48, xxl: 48 }\">\r\n                    <div nz-col nzMd=\"8\" nzSm=\"24\">\r\n                        <nz-form-item>\r\n                            <nz-form-label nzFor=\"no\">名称</nz-form-label>\r\n                            <nz-form-control>\r\n                                <input nz-input [(ngModel)]=\"q.cname\" name=\"cname\" placeholder=\"输入名称搜索\" id=\"cname\" />\r\n                            </nz-form-control>\r\n                        </nz-form-item>\r\n                    </div>\r\n\r\n                    <div nz-col [nzSpan]=\"expandForm ? 24 : 8\" [class.text-right]=\"expandForm\">\r\n                        <button nz-button type=\"submit\" [nzType]=\"'primary'\" [nzLoading]=\"loading\">查询</button>\r\n                        <button nz-button type=\"reset\" (click)=\"reset()\" class=\"mx-sm\">重置</button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n            <div class=\"mb-md\">\r\n                <button nz-button (click)=\"add()\" [nzType]=\"'primary'\">\r\n                    <i nz-icon nzType=\"plus\"></i>\r\n                    <span>新建</span>\r\n                </button>\r\n            </div>\r\n\r\n            <nz-table #nzTable [nzData]=\"data\" [nzTotal]=\"total\" [nzPageSize]=\"q.ps\" [nzLoading]=\"loading\"\r\n                (nzPageIndexChange)=\"pageChange($event)\" nzShowSizeChanger>\r\n                <thead nz-thead (nzSortChange)=\"sort($event)\" nzSingleSort>\r\n                    <tr>\r\n                        <th nz-th nzShowSort nzSortKey=\"cno\">\r\n                            <span>编号</span>\r\n                        </th>\r\n                        <th nz-th nzShowSort nzSortKey=\"cname\">\r\n                            <span>名称</span>\r\n                        </th>\r\n                        <th nz-th nzShowSort nzSortKey=\"party_a\">\r\n                            <span>甲方</span>\r\n                        </th>\r\n                        <th nz-th nzShowSort nzSortKey=\"party_b\">\r\n                            <span>乙方</span>\r\n                        </th>\r\n                        <th nz-th nzShowSort nzSortKey=\"sign_date\">\r\n                            <span>签订日期</span>\r\n                        </th>\r\n                        <th nz-th nzShowSort nzSortKey=\"expiry_date\">\r\n                            <span>终止日期</span>\r\n                        </th>\r\n                        <th nz-th nzShowSort nzSortKey=\"amount\">\r\n                            <span>合同额</span>\r\n                        </th>\r\n                        <th nz-th nzShowSort nzSortKey=\"comments\">\r\n                            <span>描述</span>\r\n                        </th>\r\n                        <th nz-th nzShowSort nzSortKey=\"project_id\">\r\n                            <span>项目类型</span>\r\n                        </th>\r\n\r\n                        <th nz-th>\r\n                            <span>操作</span>\r\n                        </th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody nz-tbody>\r\n                    <tr nz-tbody-tr *ngFor=\"let i of nzTable.data\">\r\n                        <td nz-td>{{i.cno}}</td>\r\n                        <td nz-td>{{i.cname}}</td>\r\n                        <td nz-td>{{i.party_a}}</td>\r\n                        <td nz-td>{{i.party_b}}</td>\r\n                        <td nz-td>{{i.sign_date}}</td>\r\n                        <td nz-td>{{i.expiry_date}}</td>\r\n                        <td nz-td>{{i.amount}}</td>\r\n                        <td nz-td>{{i.comments}}</td>\r\n                        <td nz-td>{{i.project_id}}</td>\r\n                        <td nz-td>\r\n                            <a (click)=\"modify(i.id)\">修改</a>\r\n                            <span nz-table-divider></span>\r\n                            <nz-divider nzType=\"vertical\"></nz-divider>\r\n                            <a (click)=\"remove(i)\">删除</a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </nz-table>\r\n        </nz-card>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/routes/contract/contract-routing.module.ts":
/*!************************************************************!*\
  !*** ./src/app/routes/contract/contract-routing.module.ts ***!
  \************************************************************/
/*! exports provided: ContractRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractRoutingModule", function() { return ContractRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _contract_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contract.component */ "./src/app/routes/contract/contract.component.ts");
/* harmony import */ var _form_contract_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form/contract-form.component */ "./src/app/routes/contract/form/contract-form.component.ts");
/* harmony import */ var _list_contract_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./list/contract-list.component */ "./src/app/routes/contract/list/contract-list.component.ts");






const routes = [
    {
        path: '',
        component: _contract_component__WEBPACK_IMPORTED_MODULE_3__["ContractComponent"],
        children: [
            { path: '', redirectTo: 'page', pathMatch: 'full' },
            { path: 'page', component: _list_contract_list_component__WEBPACK_IMPORTED_MODULE_5__["ContractListComponent"] },
            { path: 'form', component: _form_contract_form_component__WEBPACK_IMPORTED_MODULE_4__["ContractFormComponent"] },
        ],
    },
];
let ContractRoutingModule = class ContractRoutingModule {
};
ContractRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], ContractRoutingModule);



/***/ }),

/***/ "./src/app/routes/contract/contract.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/routes/contract/contract.component.ts ***!
  \*******************************************************/
/*! exports provided: ContractComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractComponent", function() { return ContractComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ContractComponent = class ContractComponent {
    constructor() { }
};
ContractComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        template: __webpack_require__(/*! raw-loader!./contract.component.html */ "./node_modules/raw-loader/index.js!./src/app/routes/contract/contract.component.html"),
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ContractComponent);



/***/ }),

/***/ "./src/app/routes/contract/contract.module.ts":
/*!****************************************************!*\
  !*** ./src/app/routes/contract/contract.module.ts ***!
  \****************************************************/
/*! exports provided: ContractModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractModule", function() { return ContractModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _contract_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contract-routing.module */ "./src/app/routes/contract/contract-routing.module.ts");
/* harmony import */ var _contract_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contract.component */ "./src/app/routes/contract/contract.component.ts");
/* harmony import */ var _form_contract_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form/contract-form.component */ "./src/app/routes/contract/form/contract-form.component.ts");
/* harmony import */ var _list_contract_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./list/contract-list.component */ "./src/app/routes/contract/list/contract-list.component.ts");
/* harmony import */ var _contract_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./contract.service */ "./src/app/routes/contract/contract.service.ts");
/* harmony import */ var _project_project_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../project/project.service */ "./src/app/routes/project/project.service.ts");









const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];
let ContractModule = class ContractModule {
};
ContractModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
            _contract_routing_module__WEBPACK_IMPORTED_MODULE_3__["ContractRoutingModule"]
        ],
        declarations: [
            ...COMPONENTS,
            ...COMPONENTS_NOROUNT,
            _contract_component__WEBPACK_IMPORTED_MODULE_4__["ContractComponent"],
            _form_contract_form_component__WEBPACK_IMPORTED_MODULE_5__["ContractFormComponent"],
            _list_contract_list_component__WEBPACK_IMPORTED_MODULE_6__["ContractListComponent"]
        ],
        providers: [
            _contract_service__WEBPACK_IMPORTED_MODULE_7__["ContractService"],
            _project_project_service__WEBPACK_IMPORTED_MODULE_8__["ProjectService"],
        ],
        entryComponents: COMPONENTS_NOROUNT
    })
], ContractModule);



/***/ }),

/***/ "./src/app/routes/contract/contract.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/routes/contract/contract.service.ts ***!
  \*****************************************************/
/*! exports provided: ContractService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractService", function() { return ContractService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _shared_app_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/app-config */ "./src/app/shared/app-config.ts");
/* harmony import */ var _shared_utils_formmat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/utils/formmat */ "./src/app/shared/utils/formmat.ts");





let ContractService = class ContractService {
    constructor(http) {
        this.http = http;
        this.url = _shared_app_config__WEBPACK_IMPORTED_MODULE_3__["baseUrl"] + 'contracts';
        this.project_url = _shared_app_config__WEBPACK_IMPORTED_MODULE_3__["baseUrl"] + 'projects';
        this.detail_url = _shared_app_config__WEBPACK_IMPORTED_MODULE_3__["baseUrl"] + 'contract_details';
        this.contract = null;
        this.formOperation = 'create';
    }
    //isUpdate = false;
    listOnePage(q) {
        return this.http.get(this.url, Object(_shared_utils_formmat__WEBPACK_IMPORTED_MODULE_4__["setTokenAndParams"])(q));
    }
    //获取合同明细页面
    listDetailPage(q) {
        return this.http.get(this.detail_url, Object(_shared_utils_formmat__WEBPACK_IMPORTED_MODULE_4__["setTokenAndParams"])(q));
    }
    getById(id) {
        return this.http.get(this.url + `/${id}`, Object(_shared_utils_formmat__WEBPACK_IMPORTED_MODULE_4__["setToken"])());
    }
    add(obj) {
        return this.http.post(this.url, obj, Object(_shared_utils_formmat__WEBPACK_IMPORTED_MODULE_4__["setToken"])());
    }
    update(id, obj) {
        return this.http.put(this.url + `/${id}`, obj, Object(_shared_utils_formmat__WEBPACK_IMPORTED_MODULE_4__["setToken"])());
    }
    delete(id) {
        return this.http.delete(this.url + `/${id}`, Object(_shared_utils_formmat__WEBPACK_IMPORTED_MODULE_4__["setToken"])());
    }
};
ContractService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
ContractService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], ContractService);



/***/ }),

/***/ "./src/app/routes/contract/form/contract-form.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/routes/contract/form/contract-form.component.ts ***!
  \*****************************************************************/
/*! exports provided: ContractFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractFormComponent", function() { return ContractFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _shared_utils_datehandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/utils/datehandler */ "./src/app/shared/utils/datehandler.ts");
/* harmony import */ var _contract_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../contract.service */ "./src/app/routes/contract/contract.service.ts");
/* harmony import */ var _project_project_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../project/project.service */ "./src/app/routes/project/project.service.ts");
/* harmony import */ var _message_reminding_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../message-reminding.service */ "./src/app/message-reminding.service.ts");









let ContractFormComponent = class ContractFormComponent {
    // channel: any;
    constructor(fb, msg, cdr, router, srv, projectService, wsSrv) {
        this.fb = fb;
        this.msg = msg;
        this.cdr = cdr;
        this.router = router;
        this.srv = srv;
        this.projectService = projectService;
        this.wsSrv = wsSrv;
        this.editIndex = -1;
        this.editObj = {};
        this.submitting = false;
        this.contract = {};
        this.options = []; //接收select的数组
        this.submit_audit = false;
        this.submit_string = '提交';
        // breadcrumbItem = { label: "合同管理", routerLink: "/contract/form" }
        this.editable = true;
        //获取项目类型
        this.project_data = [];
        this.p = {
            name: "project_name",
        };
    }
    ngOnInit() {
        //获取项目类型
        this.getProjectData();
        //消息提醒服务
        // this.channel = this.wsSrv.getChannel("reminding:contract");
        let op = this.srv.formOperation;
        if (op == 'create')
            this.initCreate();
        if (op == 'update')
            this.initUpdate();
        if (op == 'audit')
            this.initAudit();
        if (op == 'show')
            this.initShow();
        //if (this.srv.isUpdate) this.initUpdate();
        //this.setTitle();
        this.form = this.fb.group({
            cno: [
                this.contract.cno ? this.contract.cno : null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(2)]),
            ],
            cname: [
                this.contract.cname ? this.contract.cname : null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(2)]),
            ],
            project_id: [this.contract.project_id ? this.contract.project_id : null],
            party_a: [
                this.contract.party_a ? this.contract.party_a : null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(2)]),
            ],
            party_b: [
                this.contract.party_b ? this.contract.party_b : null,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(2)]),
            ],
            sign_date: [this.contract.sign_date ? Object(_shared_utils_datehandler__WEBPACK_IMPORTED_MODULE_5__["getDateByDateStr"])(this.contract.sign_date) : null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            expiry_date: [this.contract.expiry_date ? Object(_shared_utils_datehandler__WEBPACK_IMPORTED_MODULE_5__["getDateByDateStr"])(this.contract.expiry_date) : null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            amount: [this.contract.amount ? this.contract.amount : null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            comments: [this.contract.comments ? this.contract.comments : null, []],
            contract_details: this.fb.array([])
        });
        if ((op == 'update') || (op == 'audit' || (op == 'show'))) {
            this.contract.contract_details ? this.contract.contract_details.forEach(i => {
                const field = this.createDetail();
                field.patchValue(i);
                this.contract_details.push(field);
            }) : console.log("this contract has no contract_details.");
        }
    }
    //新增明细
    createDetail() {
        return this.fb.group({
            issue_name: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            invoice_amount: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            actual_payment: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            invoice_date: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            payment_date: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
        });
    }
    //#region get form fields
    get cno() { return this.form.controls.cno; }
    get cname() { return this.form.controls.cname; }
    get project_id() { return this.form.controls.project_id; }
    get party_a() { return this.form.controls.party_a; }
    get party_b() { return this.form.controls.party_b; }
    get sign_date() { return this.form.controls.sign_date; }
    get expiry_date() { return this.form.controls.expiry_date; }
    get amount() { return this.form.controls.amount; }
    get comments() { return this.form.controls.comments; }
    get contract_details() { return this.form.controls.contract_details; }
    //#endregion
    add() {
        this.contract_details.push(this.createDetail());
        this.edit(this.contract_details.length - 1);
    }
    del(index) {
        this.contract_details.removeAt(index);
    }
    edit(index) {
        if (this.editIndex !== -1 && this.editObj) {
            this.contract_details.at(this.editIndex).patchValue(this.editObj);
        }
        this.editObj = Object.assign({}, this.contract_details.at(index).value);
        this.editIndex = index;
    }
    save(index) {
        this.contract_details.at(index).markAsDirty();
        if (this.contract_details.at(index).invalid)
            return;
        this.editIndex = -1;
    }
    cancel(index) {
        if (!this.contract_details.at(index).value.key) {
            this.del(index);
        }
        else {
            this.contract_details.at(index).patchValue(this.editObj);
        }
        this.editIndex = -1;
    }
    //提交表
    submit() {
        console.log('表格提交');
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.invalid) {
            this.msg.info('ya! this.form.invalid!');
            return;
        }
        if (this.form.valid) {
            let op = this.srv.formOperation;
            if (op == 'create') {
                this.submitting = true;
                const obj = this.formmatFormValue();
                this.srv.add(obj).subscribe(resp => {
                    this.submitting = false;
                    if (resp['data'])
                        this.msg.success(`保存成功！`);
                    this.wsSrv.channel.push("new_msg", { body: localStorage.getItem("real_name") + " 创建了 " + resp['data']['cname'] });
                    this.router.navigateByUrl('/contract/page');
                    this.cdr.detectChanges();
                });
            }
            if (op == 'update') {
                this.submitting = true;
                const obj = this.formmatFormValue();
                this.srv.update(this.contract.id, obj).subscribe(resp => {
                    if (resp['data']) {
                        this.submitting = false;
                        if (resp['data'])
                            this.msg.success(`保存成功！`);
                        this.router.navigateByUrl('/contract/page');
                        this.cdr.detectChanges();
                    }
                });
            }
        }
    }
    goBack() {
        this.router.navigateByUrl('/contract/page');
    }
    initCreate() {
        this.title = '创建采购合同';
        this.submit_string = '提交';
        // this.breadcrumbItem = { label: this.title, routerLink: "/contract/form" };
        //this.globalService.addBreadcrumbItem(this.breadcrumbItem);
    }
    initUpdate() {
        this.title = '修改采购合同';
        this.submit_string = '提交修改';
        //this.contract = this.contractForPurchaseService.updateContract;
        this.contract = this.srv.contract;
    }
    initAudit() {
        this.title = '审核合同';
        this.submit_audit = true;
        this.editable = false;
        this.submit_string = '审核通过';
        //this.contract = this.contractForPurchaseService.updateContract;
        this.contract = this.srv.contract;
    }
    initShow() {
        this.title = '查看合同';
        this.editable = false;
        //this.contract = this.contractForPurchaseService.updateContract;
        this.contract = this.srv.contract;
    }
    /* setTitle() {
      if (this.srv.isUpdate) {
        this.title = '修改合同';
      } else this.title = '创建合同';
    }*/
    formmatFormValue() {
        let obj = this.form.value;
        obj.sign_date = Object(_shared_utils_datehandler__WEBPACK_IMPORTED_MODULE_5__["getFormatDateStr"])(obj.sign_date);
        return { contract: obj };
    }
    getProjectData() {
        this.projectService.listAll().pipe()
            .subscribe(resp => {
            this.project_data = resp['data'];
            this.cdr.detectChanges();
        });
        console.log('项目类型', this.project_data);
    }
};
ContractFormComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NzMessageService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _contract_service__WEBPACK_IMPORTED_MODULE_6__["ContractService"] },
    { type: _project_project_service__WEBPACK_IMPORTED_MODULE_7__["ProjectService"] },
    { type: _message_reminding_service__WEBPACK_IMPORTED_MODULE_8__["MessageRemindingService"] }
];
ContractFormComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        template: __webpack_require__(/*! raw-loader!./contract-form.component.html */ "./node_modules/raw-loader/index.js!./src/app/routes/contract/form/contract-form.component.html"),
        //styleUrls: ['./contract-form.component.less']
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
        ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NzMessageService"],
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _contract_service__WEBPACK_IMPORTED_MODULE_6__["ContractService"],
        _project_project_service__WEBPACK_IMPORTED_MODULE_7__["ProjectService"],
        _message_reminding_service__WEBPACK_IMPORTED_MODULE_8__["MessageRemindingService"]])
], ContractFormComponent);



/***/ }),

/***/ "./src/app/routes/contract/list/contract-list.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/routes/contract/list/contract-list.component.ts ***!
  \*****************************************************************/
/*! exports provided: ContractListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractListComponent", function() { return ContractListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _delon_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @delon/theme */ "./node_modules/@delon/theme/fesm2015/theme.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _contract_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../contract.service */ "./src/app/routes/contract/contract.service.ts");







let ContractListComponent = class ContractListComponent {
    constructor(http, msg, modalSrv, cdr, srv, router) {
        this.http = http;
        this.msg = msg;
        this.modalSrv = modalSrv;
        this.cdr = cdr;
        this.srv = srv;
        this.router = router;
        this.title = '合同管理';
        this.total = 0;
        this.q = {
            pi: 1,
            ps: 10,
            sort_field: 'sign_date',
            sort_direction: 'desc',
            cname: null,
        };
        this.data = [];
        this.detailData = [];
        this.loading = false;
        this.expandForm = false;
    }
    ngOnInit() {
        this.getData();
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
    // getDetailData(id) {
    //   console.log(this.idExpand + "===" + id);
    //   this.idExpand = id;
    //   this.srv
    //     .getById(id)
    //     .then(result => { this.detailData = result.contract_details })
    // }
    add(tpl) {
        //this.srv.isUpdate = false;
        this.srv.formOperation = 'create';
        this.router.navigateByUrl('/contract/form');
    }
    modify(id) {
        //this.srv.isUpdate = true;
        this.srv.formOperation = 'update';
        this.srv.getById(id).subscribe(resp => {
            this.srv.contract = resp['data'];
            this.srv.contract.contract_details = resp['data'].details;
            console.log(this.srv.contract);
            this.router.navigateByUrl('/contract/form');
        });
    }
    remove(item) {
        this.modalSrv.create({
            nzTitle: '确认删除',
            nzContent: '确认要删除合同：' + item.cname + ' 吗?',
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
ContractListComponent.ctorParameters = () => [
    { type: _delon_theme__WEBPACK_IMPORTED_MODULE_4__["_HttpClient"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"] },
    { type: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzModalService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
    { type: _contract_service__WEBPACK_IMPORTED_MODULE_6__["ContractService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
ContractListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        template: __webpack_require__(/*! raw-loader!./contract-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/routes/contract/list/contract-list.component.html"),
        //styleUrls: ['./contract-list.component.less'],
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_delon_theme__WEBPACK_IMPORTED_MODULE_4__["_HttpClient"],
        ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"],
        ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzModalService"],
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
        _contract_service__WEBPACK_IMPORTED_MODULE_6__["ContractService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], ContractListComponent);



/***/ })

}]);
//# sourceMappingURL=contract-contract-module-es2015.js.map