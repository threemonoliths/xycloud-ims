import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UploadFile } from 'ng-zorro-antd';
import { getFormatDateStr, getDateByDateStr } from '../../../shared/utils/datehandler';
import { PurchaseContractService } from '../purchase_contract.service';
import { ProjectService } from '../../project/project.service';
import { MessageRemindingService } from '../../../message-reminding.service';

@Component({
  templateUrl: './purchase_contract-form.component.html',
  // styleUrls: ['./purchase_contract-form.component.less']
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseContractFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private srv: PurchaseContractService,
    private projectService: ProjectService,
    private wsSrv: MessageRemindingService,
  ) { }

  //#region get form fields
  get cno() {
    return this.form.controls.cno;
  }
  get cname() {
    return this.form.controls.cname;
  }
  get project_id() {
    return this.form.controls.project_id;
  }
  get party_a() {
    return this.form.controls.party_a;
  }
  get party_b() {
    return this.form.controls.party_b;
  }
  get sign_date() {
    return this.form.controls.sign_date;
  }
  get expiry_date() {
    return this.form.controls.expiry_date;
  }
  get amount() {
    return this.form.controls.amount;
  }
  get comments() {
    return this.form.controls.comments;
  }

  get purchase_contract_details() {
    return this.form.controls.purchase_contract_details as FormArray;
  }
  editIndex = -1;
  editObj = {};

  form: FormGroup;
  submitting = false;
  title: string;
  purchase_contract: any = {};
  options = []; // 接收select的数组

  submit_audit = false;
  submit_string = '提交';

  editable = true;

  // 获取项目类型
  project_data: any[] = [];
  p: any = {
    name: 'project_name',
  };

  ngOnInit(): void {
    // 获取项目类型
    this.getProjectData();
    // 消息提醒服务
    // this.channel = this.wsSrv.getChannel("reminding:purchase_contract");

    const op = this.srv.formOperation;
    if (op == 'create') this.initCreate();
    if (op == 'update') this.initUpdate();
    if (op == 'audit') this.initAudit();
    if (op == 'show') this.initShow();
    // if (this.srv.isUpdate) this.initUpdate();
    // this.setTitle();
    this.form = this.fb.group({
      cno: [
        this.purchase_contract.cno ? this.purchase_contract.cno : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      cname: [
        this.purchase_contract.cname ? this.purchase_contract.cname : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      project_id: [this.purchase_contract.project_id ? this.purchase_contract.project_id : null],
      party_a: [
        this.purchase_contract.party_a ? this.purchase_contract.party_a : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      party_b: [
        this.purchase_contract.party_b ? this.purchase_contract.party_b : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      sign_date: [
        this.purchase_contract.sign_date ? getDateByDateStr(this.purchase_contract.sign_date) : null,
        [Validators.required],
      ],
      expiry_date: [
        this.purchase_contract.expiry_date ? getDateByDateStr(this.purchase_contract.expiry_date) : null,
        [Validators.required],
      ],
      amount: [this.purchase_contract.amount ? this.purchase_contract.amount : null, [Validators.required]],
      comments: [this.purchase_contract.comments ? this.purchase_contract.comments : null, []],

      purchase_contract_details: this.fb.array([]),
    });
    if (op == 'update' || (op == 'audit' || op == 'show')) {
      this.purchase_contract.purchase_contract_details
        ? this.purchase_contract.purchase_contract_details.forEach(i => {
          const field = this.createDetail();
          field.patchValue(i);
          this.purchase_contract_details.push(field);
        })
        : console.log('this purchase_contract has no purchase_contract_details.');
    }
  }

  // 新增明细
  createDetail(): FormGroup {
    return this.fb.group({
      issue_name: [null, [Validators.required]],
      invoice_amount: [null, [Validators.required]],
      actual_payment: [null, [Validators.required]],
      invoice_date: [null, [Validators.required]],
      payment_date: [null],
    });
  }

  //#endregion
  add() {
    this.purchase_contract_details.push(this.createDetail());
    this.edit(this.purchase_contract_details.length - 1);
  }

  del(index: number) {
    this.purchase_contract_details.removeAt(index);
  }

  edit(index: number) {
    if (this.editIndex !== -1 && this.editObj) {
      this.purchase_contract_details.at(this.editIndex).patchValue(this.editObj);
    }
    this.editObj = { ...this.purchase_contract_details.at(index).value };
    this.editIndex = index;
  }

  save(index: number) {
    this.purchase_contract_details.value[index].invoice_date = getFormatDateStr(this.purchase_contract_details.value[index].invoice_date)
    this.purchase_contract_details.value[index].payment_date = (this.purchase_contract_details.value[index].payment_date ?
      getFormatDateStr(this.purchase_contract_details.value[index].payment_date) : null)
    this.purchase_contract_details.at(index).markAsDirty();
    if (this.purchase_contract_details.at(index).invalid) return;
    this.editIndex = -1;
  }

  cancel(index: number) {
    if (!this.purchase_contract_details.at(index).value.key) {
      this.del(index);
    } else {
      this.purchase_contract_details.at(index).patchValue(this.editObj);
    }
    this.editIndex = -1;
  }

  // 提交表
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
      const op = this.srv.formOperation;
      if (op == 'create') {
        this.submitting = true;
        const obj = this.formmatFormValue();
        this.srv.add(obj).subscribe(resp => {
          this.submitting = false;
          if (resp['data']) this.msg.success(`保存成功！`);
          this.wsSrv.channel.push('new_msg', {
            body: localStorage.getItem('real_name') + ' 创建了 ' + resp['data'].cname,
          });
          this.router.navigateByUrl('/purchase_contract/page');
          this.cdr.detectChanges();
        });
      }
      if (op == 'update') {
        this.submitting = true;
        const obj = this.formmatFormValue();
        this.srv.update(this.purchase_contract.id, obj).subscribe(resp => {
          if (resp['data']) {
            this.submitting = false;
            if (resp['data']) this.msg.success(`保存成功！`);
            this.router.navigateByUrl('/purchase_contract/page');
            this.cdr.detectChanges();
          }
        });
      }
    }
  }
  goBack() {
    this.router.navigateByUrl('/purchase_contract/page');
  }
  initCreate() {
    this.title = '创建采购合同';
    this.submit_string = '提交';
    // this.breadcrumbItem = { label: this.title, routerLink: "/purchase_contract/form" };
    // this.globalService.addBreadcrumbItem(this.breadcrumbItem);
  }

  initUpdate() {
    this.title = '修改采购合同';
    this.submit_string = '提交修改';
    // this.purchase_contract = this.purchase_contractForPurchaseService.updatePurchaseContract;
    this.purchase_contract = this.srv.purchase_contract;
  }

  initAudit() {
    this.title = '审核合同';
    this.submit_audit = true;
    this.editable = false;
    this.submit_string = '审核通过';
    // this.purchase_contract = this.purchase_contractForPurchaseService.updatePurchaseContract;
    this.purchase_contract = this.srv.purchase_contract;
  }

  initShow() {
    this.title = '查看合同';
    this.editable = false;
    // this.purchase_contract = this.purchase_contractForPurchaseService.updatePurchaseContract;
    this.purchase_contract = this.srv.purchase_contract;
  }

  /* setTitle() {
    if (this.srv.isUpdate) {
      this.title = '修改合同';
    } else this.title = '创建合同';
  }*/

  formmatFormValue() {
    const obj = this.form.value;
    obj.sign_date = getFormatDateStr(obj.sign_date);
    return { purchase_contract: obj };
  }

  getProjectData() {
    this.projectService
      .listAll()
      .pipe()
      .subscribe(resp => {
        this.project_data = resp['data'];
        this.cdr.detectChanges();
      });
    console.log('项目类型', this.project_data);
  }
}
