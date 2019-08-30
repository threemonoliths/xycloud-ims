import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UploadFile } from 'ng-zorro-antd';
import { getFormatDateStr, getDateByDateStr } from '../../../shared/utils/datehandler';
import { ContractService } from '../contract.service';

@Component({
  templateUrl: './contract-form.component.html',
  //styleUrls: ['./contract-form.component.less']
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ContractFormComponent implements OnInit {

  form: FormGroup;
  submitting = false;
  title: string;
  contract: any = {};

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private srv: ContractService,
  ) { }

  ngOnInit(): void {
    if (this.srv.isUpdate) this.initUpdate();
    this.setTitle();
    this.form = this.fb.group({
      cname: [
        this.contract.cname ? this.contract.cname : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      sign_date: [this.contract.sign_date ? getDateByDateStr(this.contract.sign_date) : null, [Validators.required]],
      comments: [this.contract.comments ? this.contract.comments : null, []],
    });
  }

  submit() {
    console.log('表格提交')
    if (!this.srv.isUpdate) {
      this.submitting = true;
      const obj = this.formmatFormValue();
      this.srv.add(obj).subscribe(resp => {
        this.submitting = false;
        if (resp['data']) this.msg.success(`保存成功！`);
        this.router.navigateByUrl('/contract/page');
        this.cdr.detectChanges();
      });
    } else {
      this.submitting = true;
      const obj = this.formmatFormValue();
      this.srv.update(this.contract.id, obj).subscribe(resp => {
        if (resp['data']) {
          this.submitting = false;
          if (resp['data']) this.msg.success(`保存成功！`);
          this.router.navigateByUrl('/contract/page');
          this.cdr.detectChanges();
        }
      });
    }
  }
  setTitle() {
    if (this.srv.isUpdate) {
      this.title = '修改项目';
    } else this.title = '创建项目';
  }

  initUpdate() {
    this.setTitle();
    this.contract = this.srv.contract;
  }

  formmatFormValue() {
    let obj = this.form.value;
    obj.sign_date = getFormatDateStr(obj.sign_date);
    return { contract: obj };
  }
}
