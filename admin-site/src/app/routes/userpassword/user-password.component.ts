import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { UploadFile } from 'ng-zorro-antd';
import { UserPasswordService } from './user-password.service';

@Component({
  templateUrl: './user-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPasswordComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  title: string;
  user: any = {};

  avatarUrl: any = '';

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private srv: UserPasswordService,
  ) { }

  ngOnInit(): void {
    this.setTitle();
    this.form = this.fb.group({
      password: [
        null,
        [Validators.required, Validators.minLength(6)],
      ],
      newPassword: [
        null,
        [Validators.required, Validators.minLength(6)],
      ],
      verifyNewPassword: [
        null,
        [Validators.required, Validators.minLength(6), this.confirmationValidator],
      ]
    });
  }

  submit() {
    this.submitting = true;
    // const obj = this.form.value;
    const obj = this.formmatFormValue();
    // if (this.file) obj.avatar = this.fileList[0];
    this.srv.modifyPassword(obj).subscribe(resp => {
      if (resp['data']) {
        this.submitting = false;
        if (resp['data']) this.msg.success(`密码已修改！`);
        this.router.navigateByUrl('/project/page');
        this.cdr.detectChanges();
      }
    })
  }

  setTitle() {
    this.title = '修改密码';
  }

  formmatFormValue() {
    let obj: any = new Object();
    obj.password = this.form.controls["password"].value;
    obj.new_password = this.form.controls["newPassword"].value;
    return obj;
  }

  //确认密码验证
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls['newPassword'].value) {
      return { confirm: true, error: true };
    }
  }

}
