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
      cname: [
        this.client.cname ? this.client.cname : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      contact: [this.client.contact ? this.client.contact : null, []],
      contact_info: [this.client.contact_info ? this.client.contact_info : null, []],
      invoice: [this.client.invoice ? this.client.invoice : null, []],
      comments: [this.client.comments ? this.client.comments : null, []],
    });
  }

  submit() {
    if (!this.srv.isUpdate) {
      console.log("新增客户")
      this.submitting = true;
      const obj = this.formmatFormValue();
      this.srv.add(obj).subscribe(resp => {
        this.submitting = false;
        if (resp.data) this.msg.success(`保存成功！`);
        this.router.navigateByUrl('/client/page');
        this.cdr.detectChanges();
      });
    } else {
      this.submitting = true;
      const obj = this.formmatFormValue();
      this.srv.update(this.client.id, obj).subscribe(resp => {
        if (resp.data) {
          this.submitting = false;
          if (resp.data) this.msg.success(`保存成功！`);
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
}
