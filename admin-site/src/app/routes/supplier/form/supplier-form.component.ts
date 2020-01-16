import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { getFormatDateStr, getDateByDateStr } from '../../../shared/utils/datehandler';
import { SupplierService } from '../supplier.service';

@Component({
  templateUrl: './supplier-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierFormComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  title: string;
  supplier: any = {};

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private srv: SupplierService,
  ) { }

  ngOnInit(): void {
    if (this.srv.isUpdate) this.initUpdate();
    this.setTitle();
    this.form = this.fb.group({
      sname: [
        this.supplier.sname ? this.supplier.sname : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      contact: [this.supplier.contact ? this.supplier.contact : null, []],
      contact_info: [this.supplier.contact_info ? this.supplier.contact_info : null, []],
      invoice: [this.supplier.invoice ? this.supplier.invoice : null, []],
      comments: [this.supplier.comments ? this.supplier.comments : null, []],
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
        this.router.navigateByUrl('/supplier/page');
        this.cdr.detectChanges();
      });
    } else {
      this.submitting = true;
      const obj = this.formmatFormValue();
      this.srv.update(this.supplier.id, obj).subscribe(resp => {
        if (resp.data) {
          this.submitting = false;
          if (resp.data) this.msg.success(`保存成功！`);
          this.router.navigateByUrl('/supplier/page');
          this.cdr.detectChanges();
        }
      });
    }
  }

  setTitle() {
    if (this.srv.isUpdate) {
      this.title = '修改供应商';
    } else this.title = '创建供应商';
  }

  initUpdate() {
    this.setTitle();
    this.supplier = this.srv.supplier;
  }

  formmatFormValue() {
    const obj = this.form.value;
    // obj.date = getFormatDateStr(obj.date);
    return { supplier: obj };
  }

}
