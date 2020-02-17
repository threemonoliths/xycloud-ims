import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { getFormatDateStr, getDateByDateStr } from '../../../shared/utils/datehandler';
import { ClientService } from '../client.service';

@Component({
  templateUrl: './client-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  title: string;
  client: any = {};
  optionList = ['客户', '供应商', '客商'];

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private srv: ClientService,
  ) { }

  ngOnInit(): void {
    if (this.srv.isUpdate) this.initUpdate();
    this.setTitle();
    this.form = this.fb.group({
      no: [this.client.no ? this.client.no : null, [],],
      name: [
        this.client.name ? this.client.name : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      category: [this.client.category ? this.client.category : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      legal_representative: [this.client.legal_representative ? this.client.legal_representative : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      registered_address: [this.client.registered_address ? this.client.registered_address : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      registered_capital: [this.client.registered_capital ? this.client.registered_capital : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      business_scope: [this.client.business_scope ? this.client.business_scope : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      industry_involved: [this.client.industry_involved ? this.client.industry_involved : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      project: [this.client.project ? this.client.project : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      registered_place: [this.client.registered_place ? this.client.registered_place : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      id_type: [this.client.id_type ? this.client.id_type : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      certificate_no: [this.client.certificate_no ? this.client.certificate_no : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      organization_no: [this.client.organization_no ? this.client.organization_no : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      business_license_no: [this.client.business_license_no ? this.client.business_license_no : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      tax_no: [this.client.tax_no ? this.client.tax_no : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      taxpayer_type: [this.client.taxpayer_type ? this.client.taxpayer_type : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      invoice_title: [this.client.invoice_title ? this.client.invoice_title : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      taxpayer_no: [this.client.taxpayer_no ? this.client.taxpayer_no : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      address: [this.client.address ? this.client.address : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      telephone: [this.client.telephone ? this.client.telephone : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      bank_name: [this.client.bank_name ? this.client.bank_name : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      bank_account: [this.client.bank_account ? this.client.bank_account : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      receiving_bank_name: [this.client.receiving_bank_name ? this.client.receiving_bank_name : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      receiving_bank_account: [this.client.receiving_bank_account ? this.client.receiving_bank_account : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      remittance_bank_name: [this.client.remittance_bank_name ? this.client.remittance_bank_name : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      remittance_bank_account: [this.client.remittance_bank_account ? this.client.remittance_bank_account : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      contact1: [this.client.contact1 ? this.client.contact1 : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      mobile1: [this.client.mobile1 ? this.client.mobile1 : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      mail1: [this.client.mail1 ? this.client.mail1 : null, [],],
      contact2: [this.client.contact2 ? this.client.contact2 : null, [],],
      mobile2: [this.client.mobile2 ? this.client.mobile2 : null, [],],
      mail2: [this.client.mail2 ? this.client.mail2 : null, [],],
      contact3: [this.client.contact3 ? this.client.contact3 : null, [],],
      mobile3: [this.client.mobile3 ? this.client.mobile3 : null, [],],
      mail3: [this.client.mail3 ? this.client.mail3 : null, [],],
      comments: [this.client.comments ? this.client.comments : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
    });
  }

  submit() {
    if (!this.srv.isUpdate) {
      console.log("新增客户")
      this.submitting = true;
      const obj = this.formmatFormValue();
      this.srv.add(obj).subscribe(resp => {
        this.submitting = false;
        if (resp["data"]) this.msg.success(`保存成功！`);
        this.router.navigateByUrl('/client/page');
        this.cdr.detectChanges();
      });
    } else {
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
    // obj.date = getFormatDateStr(obj.date);
    return { client: obj };
  }

  goBack() {
    this.router.navigateByUrl('/client/page');
  }
}
