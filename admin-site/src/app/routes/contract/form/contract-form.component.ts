import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UploadFile } from 'ng-zorro-antd';
import { getFormatDateStr, getDateByDateStr } from '../../../shared/utils/datehandler';
import { ContractService } from '../contract.service';
import { ProjectService } from '../../project/project.service';
import { MessageRemindingService } from '../../../message-reminding.service';

@Component({
  templateUrl: './contract-form.component.html',
  // styleUrls: ['./contract-form.component.less']
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractFormComponent implements OnInit {
  // channel: any;

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private srv: ContractService,
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

  get contract_details() {
    return this.form.controls.contract_details as FormArray;
  }
  editIndex = -1;
  editObj = {};

  form: FormGroup;
  submitting = false;
  title: string;
  contract: any = {};
  options = []; // 接收select的数组

  submit_audit = false;
  submit_string = '提交';
  // breadcrumbItem = { label: "销售合同", routerLink: "/contract/form" }

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
    // this.channel = this.wsSrv.getChannel("reminding:contract");

    const op = this.srv.formOperation;
    if (op == 'create') this.initCreate();
    if (op == 'update') this.initUpdate();
    if (op == 'audit') this.initAudit();
    if (op == 'show') this.initShow();
    // if (this.srv.isUpdate) this.initUpdate();
    // this.setTitle();
    this.form = this.fb.group({
      cno: [
        this.contract.cno ? this.contract.cno : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      cname: [
        this.contract.cname ? this.contract.cname : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      project_id: [this.contract.project_id ? this.contract.project_id : null],
      party_a: [
        this.contract.party_a ? this.contract.party_a : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      party_b: [
        this.contract.party_b ? this.contract.party_b : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      sign_date: [this.contract.sign_date ? getDateByDateStr(this.contract.sign_date) : null, [Validators.required]],
      expiry_date: [
        this.contract.expiry_date ? getDateByDateStr(this.contract.expiry_date) : null,
        [Validators.required],
      ],
      amount: [this.contract.amount ? this.contract.amount : null, [Validators.required]],
      comments: [this.contract.comments ? this.contract.comments : null, []],

      contract_details: this.fb.array([]),
    });
    if (op == 'update' || (op == 'audit' || op == 'show')) {
      this.contract.contract_details
        ? this.contract.contract_details.forEach(i => {
          const field = this.createDetail();
          field.patchValue(i);
          this.contract_details.push(field);
        })
        : console.log('this contract has no contract_details.');
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
    console.log(this.contract_details.length);
    this.contract_details.push(this.createDetail());
    this.edit(this.contract_details.length - 1);
  }

  del(index: number) {
    this.contract_details.removeAt(index);
  }

  edit(index: number) {
    if (this.editIndex !== -1 && this.editObj) {
      this.contract_details.at(this.editIndex).patchValue(this.editObj);
    }
    this.editObj = { ...this.contract_details.at(index).value };
    this.editIndex = index;
  }

  save(index: number) {
    this.contract_details.value[index].invoice_date = getFormatDateStr(this.contract_details.value[index].invoice_date)
    this.contract_details.value[index].payment_date =
      (this.contract_details.value[index].payment_date ? getFormatDateStr(this.contract_details.value[index].payment_date) : null)
    this.contract_details.at(index).markAsDirty();
    console.log(this.contract_details.value[index].payment_date);
    if (this.contract_details.at(index).invalid) return;
    this.editIndex = -1;
  }

  cancel(index: number) {
    if (!this.contract_details.at(index).value.key) {
      this.del(index);
    } else {
      this.contract_details.at(index).patchValue(this.editObj);
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
          if (resp.data) this.msg.success(`保存成功！`);
          this.wsSrv.channel.push('new_msg', {
            body: localStorage.getItem('real_name') + ' 创建了 ' + resp.data.cname,
          });
          this.router.navigateByUrl('/contract/page');
          this.cdr.detectChanges();
        });
      }
      if (op == 'update') {
        this.submitting = true;
        const obj = this.formmatFormValue();
        this.srv.update(this.contract.id, obj).subscribe(resp => {
          if (resp.data) {
            this.submitting = false;
            if (resp.data) this.msg.success(`保存成功！`);
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
    // this.globalService.addBreadcrumbItem(this.breadcrumbItem);
  }

  initUpdate() {
    this.title = '修改采购合同';
    this.submit_string = '提交修改';
    // this.contract = this.contractForPurchaseService.updateContract;
    this.contract = this.srv.contract;
  }

  initAudit() {
    this.title = '审核合同';
    this.submit_audit = true;
    this.editable = false;
    this.submit_string = '审核通过';
    // this.contract = this.contractForPurchaseService.updateContract;
    this.contract = this.srv.contract;
  }

  initShow() {
    this.title = '查看合同';
    this.editable = false;
    // this.contract = this.contractForPurchaseService.updateContract;
    this.contract = this.srv.contract;
  }

  /* setTitle() {
    if (this.srv.isUpdate) {
      this.title = '修改合同';
    } else this.title = '创建合同';
  }*/

  formmatFormValue() {
    const obj = this.form.value;
    obj.sign_date = getFormatDateStr(obj.sign_date);
    return { contract: obj };
  }

  getProjectData() {
    this.projectService
      .listAll()
      .pipe()
      .subscribe(resp => {
        this.project_data = resp.data;
        this.cdr.detectChanges();
      });
    console.log('项目类型', this.project_data);
  }
}
