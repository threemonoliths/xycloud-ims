import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { UploadFile } from 'ng-zorro-antd';
import { UserInfoService } from './user-info.service';

@Component({
  templateUrl: './user-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private srv: UserInfoService,
  ) { }
  form: FormGroup;
  submitting = false;
  title: string;
  user: any = {};

  avatarUrl: any = '';

  showFile = true;
  fileList: UploadFile[] = []

  ngOnInit(): void {
    this.setTitle();
    this.form = this.fb.group({
      real_name: [
        localStorage.getItem("real_name") ? localStorage.getItem("real_name") : null,
        [],
      ],
      mobile: [
        localStorage.getItem("mobile") ? localStorage.getItem("mobile") : null,
        [],
      ],
      position: [
        localStorage.getItem("position") ? localStorage.getItem("position") : null,
        [],
      ]
    });
  }

  submit() {
    this.submitting = true;
    // const obj = this.form.value;
    const obj = this.formmatFormValue();
    // if (this.file) obj.avatar = this.fileList[0];
    this.srv.update(this.user.id, obj).subscribe(resp => {
      if (resp["data"]) {
        this.submitting = false;
        if (resp["data"]) this.msg.success(`保存成功！`);
        this.router.navigateByUrl('/project/page');
        this.cdr.detectChanges();
      }
    })
  }

  setTitle() {
    this.title = '个人信息';
  }

  formmatFormValue() {
    const obj = this.form.value;
    if ((this.fileList) && (this.fileList.length > 0)) { obj.avatar = this.fileList[0] }
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
