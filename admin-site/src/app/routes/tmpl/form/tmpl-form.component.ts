import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UploadFile } from 'ng-zorro-antd';
import { getFormatDateStr, getDateByDateStr } from '../../../shared/utils/datehandler';
import { TmplService } from '../tmpl.service';

@Component({
  templateUrl: './tmpl-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TmplFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private srv: TmplService,
  ) { }
  form: FormGroup;
  submitting = false;
  title: string;
  tmpl: any = {};

  showFile = true;

  fileList: UploadFile[] = []

  ngOnInit(): void {
    if (this.srv.isUpdate) this.initUpdate();
    this.setTitle();
    this.form = this.fb.group({
      name: [
        this.tmpl.name ? this.tmpl.name : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      comments: [this.tmpl.comments ? this.tmpl.comments : null, []],
    });
  }

  submit() {
    console.log("in submit $$$$$$$$$$$")
    if (!this.srv.isUpdate) {
      this.submitting = true;
      const obj = this.formmatFormValue();
      this.srv.add(obj).subscribe(resp => {
        this.submitting = false;
        if (resp.data) this.msg.success(`保存成功！`);
        this.router.navigateByUrl('/tmpl/page');
        this.cdr.detectChanges();
      });
    } else {
      this.submitting = true;
      const obj = this.formmatFormValue();
      this.srv.update(this.tmpl.id, obj).subscribe(resp => {
        if (resp.data) {
          this.submitting = false;
          if (resp.data) this.msg.success(`保存成功！`);
          this.router.navigateByUrl('/tmpl/page');
          this.cdr.detectChanges();
        }
      });
    }
  }

  setTitle() {
    if (this.srv.isUpdate) {
      this.title = '修改模板';
    } else this.title = '创建模板';
  }

  initUpdate() {
    this.setTitle();
    this.tmpl = this.srv.tmpl;
    this.showFile = true;
  }

  formmatFormValue() {
    const obj = this.form.value;
    if ((this.fileList) && (this.fileList.length > 0))
      obj.attachment = this.fileList[0]
    console.log(obj);
    return obj;
  }
  beforeUpload = (file: UploadFile): boolean => {
    console.log(file);
    this.showFile = false;
    this.fileList = [file];
    return false;
  };


}
