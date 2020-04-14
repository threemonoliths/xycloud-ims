import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ClientService } from '../client.service';
import { MessageRemindingService } from '../../../message-reminding.service';

@Component({
  templateUrl: './client-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  title: string;
  client: any = {};
  optionList1 = [{ id: 1, type: '客户' }, { id: 2, type: '供应商' }, { id: 3, type: '客商' }];
  optionList2 = [{ id: 1, type: '业务对接人' }, { id: 2, type: '合同对接人' }, { id: 3, type: '财务对接人' }];
  editIndex = -1;
  editObj = {};
  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private srv: ClientService,
    private wsSrv: MessageRemindingService,
  ) { }

  //#region get form fields
  get no() {
    return this.form.controls.no;
  }
  get name() {
    return this.form.controls.name;
  }
  get category() {
    return this.form.controls.category;
  }
  // get legal_representative() {
  //   return this.form.controls.legal_representative;
  // }
  get registered_address() {
    return this.form.controls.registered_address;
  }
  // get registered_capital() {
  //   return this.form.controls.registered_capital;
  // }
  // get business_scope() {
  //   return this.form.controls.business_scope;
  // }
  // get industry_involved() {
  //   return this.form.controls.industry_involved;
  // }
  get project() {
    return this.form.controls.project;
  }
  get registered_place() {
    return this.form.controls.registered_place;
  }
  get id_type() {
    return this.form.controls.id_type;
  }
  get certificate_no() {
    return this.form.controls.certificate_no;
  }
  get taxpayer_type() {
    return this.form.controls.taxpayer_type;
  }
  get invoice_title() {
    return this.form.controls.invoice_title;
  }
  get taxpayer_no() {
    return this.form.controls.taxpayer_no;
  }
  get address() {
    return this.form.controls.address;
  }
  get telephone() {
    return this.form.controls.telephone;
  }
  get bank_name() {
    return this.form.controls.bank_name;
  }
  get bank_account() {
    return this.form.controls.bank_account;
  }
  get receiving_bank_name() {
    return this.form.controls.receiving_bank_name;
  }
  get receiving_bank_account() {
    return this.form.controls.receiving_bank_account;
  }
  get remittance_bank_name() {
    return this.form.controls.remittance_bank_name;
  }
  get remittance_bank_account() {
    return this.form.controls.remittance_bank_account;
  }
  get comments() {
    return this.form.controls.comments;
  }
  get client_details() {
    return this.form.controls.client_details as FormArray;
  }

  ngOnInit(): void {
    this.setTitle();
    const op = this.srv.formOperation;
    if (op == 'create') this.getNoData();
    if (op == 'update') this.initUpdate();
    this.form = this.fb.group({
      no: [this.client.no ? this.client.no : '', [Validators.required, , Validators.maxLength(30), Validators.minLength(4),
      Validators.pattern('[\u4E00-\u9FA5-a-zA-Z0-9_]*$')]],
      name: [
        this.client.name ? this.client.name : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      category: [this.client.category ? this.client.category : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      // legal_representative: [this.client.legal_representative ? this.client.legal_representative : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      registered_address: [this.client.registered_address ? this.client.registered_address : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      // registered_capital: [this.client.registered_capital ? this.client.registered_capital : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      // business_scope: [this.client.business_scope ? this.client.business_scope : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      // industry_involved: [this.client.industry_involved ? this.client.industry_involved : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      project: [this.client.project ? this.client.project : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      registered_place: [this.client.registered_place ? this.client.registered_place : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      id_type: [this.client.id_type ? this.client.id_type : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      certificate_no: [this.client.certificate_no ? this.client.certificate_no : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      taxpayer_type: [this.client.taxpayer_type ? this.client.taxpayer_type : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      invoice_title: [this.client.invoice_title ? this.client.invoice_title : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      taxpayer_no: [this.client.taxpayer_no ? this.client.taxpayer_no : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      address: [this.client.address ? this.client.address : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      telephone: [this.client.telephone ? this.client.telephone : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      bank_name: [this.client.bank_name ? this.client.bank_name : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      bank_account: [this.client.bank_account ? this.client.bank_account : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      receiving_bank_name: [this.client.receiving_bank_name ? this.client.receiving_bank_name : null, [],],
      receiving_bank_account: [this.client.receiving_bank_account ? this.client.receiving_bank_account : null, [],],
      remittance_bank_name: [this.client.remittance_bank_name ? this.client.remittance_bank_name : null, [],],
      remittance_bank_account: [this.client.remittance_bank_account ? this.client.remittance_bank_account : null, [],],
      comments: [this.client.comments ? this.client.comments : null, Validators.compose([Validators.required, Validators.minLength(2)]),],

      client_details: this.fb.array([]),
    });
    if (op == 'update' || (op == 'audit' || op == 'show')) {
      this.client.client_details
        ? this.client.client_details.forEach(i => {
          const field = this.createDetail();
          field.patchValue(i);
          this.client_details.push(field);
        })
        : console.log('this client has no client_details.');
    }

  }

  // 新增明细
  createDetail(): FormGroup {
    return this.fb.group({
      contact: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      mail: [null],
      qq: [null,],
      wechat: [null,],
      position: [null,],
      character: [null],
      comments: [null,],
    });
  }

  add() {
    console.log(this.client_details.length);
    this.client_details.push(this.createDetail());
    this.edit(this.client_details.length - 1);
  }

  del(index: number) {
    this.client_details.removeAt(index);
  }

  edit(index: number) {
    if (this.editIndex !== -1 && this.editObj) {
      this.client_details.at(this.editIndex).patchValue(this.editObj);
    }
    this.editObj = { ...this.client_details.at(index).value };
    this.editIndex = index;
  }

  save(index: number) {
    this.client_details.at(index).markAsDirty();
    if (this.client_details.at(index).invalid) return;
    this.editIndex = -1;
  }

  cancel(index: number) {
    if (!this.client_details.at(index).value.key) {
      this.del(index);
    } else {
      this.client_details.at(index).patchValue(this.editObj);
    }
    this.editIndex = -1;
  }

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
          if (resp["data"]) this.msg.success(`保存成功！`);
          this.wsSrv.channel.push('new_msg', {
            body: localStorage.getItem('real_name') + ' 创建了 ' + resp["data"].cname,
          });
          this.router.navigateByUrl('/client/page');
          this.cdr.detectChanges();
        });
      }
      if (op == 'update') {
        this.submitting = true;
        const obj = this.formmatFormValue();
        this.srv.update(this.client.id, obj).subscribe(resp => {
          if (resp["data"]) {
            this.submitting = false;
            if (resp["data"]) this.msg.success(`保存成功！`);
            this.router.navigateByUrl('/client/page');
            this.cdr.detectChanges();
          }
        });
      }
    }
  }
  setTitle() {
    if (this.srv.isUpdate) {
      this.title = '修改客户';
    } else this.title = '创建客户';
  }

  initUpdate() {
    this.setTitle();
    this.client = this.srv.client;
  }

  formmatFormValue() {
    const obj = this.form.value;
    return { client: obj };
  }

  goBack() {
    this.router.navigateByUrl('/client/page');
  }

  getNoData() {
    this.srv.getNoData().subscribe(resp => { this.no.setValue(resp["no"]); console.log(resp) })
  }

}
