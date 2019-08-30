import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UploadFile } from 'ng-zorro-antd';
import { getFormatDateStr, getDateByDateStr } from '../../../shared/utils/datehandler';
import { UserService } from '../user.service';

@Component({
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  title: string;
  user: any = {};

  // 可用权限列表
  list: any[] = [];

  // 已选择权限列表
  selected: any[] = [];

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private srv: UserService,
  ) { }

  ngOnInit(): void {
    this.getAllPerms();
    if (this.srv.isUpdate) this.initUpdate();
    this.setTitle();
    this.form = this.fb.group({
      name: [
        this.user.name ? this.user.name : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      real_name: [
        this.user.real_name ? this.user.real_name : null,
        [],
      ],
      mobile: [
        this.user.mobile ? this.user.mobile : null,
        [],
      ],
      position: [
        this.user.position ? this.user.position : null,
        [],
      ],
      is_admin: [
        this.user.is_admin ? this.user.is_admin : false,
        [],
      ]
    });
  }

  submit() {
    if (!this.srv.isUpdate) {
      this.submitting = true;
      const obj = this.formmatFormValue();
      this.srv.add(obj).subscribe(resp => {
        this.submitting = false;
        if (resp['data']) this.msg.success(`保存成功！`);
        this.router.navigateByUrl('/user/page');
        this.cdr.detectChanges();
      });
    } else {
      this.submitting = true;
      const obj = this.formmatFormValue();
      this.srv.update(this.user.id, obj).subscribe(resp => {
        if (resp['data']) {
          this.submitting = false;
          if (resp['data']) this.msg.success(`保存成功！`);
          this.router.navigateByUrl('/user/page');
          this.cdr.detectChanges();
        }
      });
    }
  }

  setTitle() {
    if (this.srv.isUpdate) {
      this.title = '修改用户';
    } else this.title = '创建用户';
  }

  initUpdate() {
    this.setTitle();
    this.user = this.srv.user;
    console.log(this.user);
  }

  formmatFormValue() {
    let obj = this.form.value;
    obj.perms_number = this.formmatPerms();
    return { user: obj };
  }

  getAllPerms() {
    this.srv.getAllPermissions().subscribe(resp => {
      if (this.srv.isUpdate) {
        let permsAll = this.convertPermsToTransferItems(resp["all_perms"], "left");
        let permsRight = this.convertPermsToTransferItems(this.user.perms_number, "right");
        let permsLeft = permsAll.filter(el => !this.user.perms_number.includes(el.title));
        this.list = permsRight.concat(permsLeft);
        this.selected = permsRight;
      } else {
        this.list = this.convertPermsToTransferItems(resp["all_perms"], "left");
      }
      this.cdr.detectChanges();
    })
  }

  select(ret: {}): void {

  }

  change(ret: {}): void {
    let arr = []
    if ((ret["from"] == "left") && (ret["to"] == "right")) {
      arr = this.selected.concat(ret["list"])
    }
    if ((ret["from"] == "right") && (ret["to"] == "left")) {
      arr = this.selected.filter(el => !ret["list"].includes(el))
    }
    this.selected = arr;
  }

  formmatPerms() {
    let destList = []
    let srcList = this.selected
    srcList.map(function (v, k) { destList.push(srcList[k].title); })
    return destList;
  }

  convertPermsToTransferItems(perms: any[], direction: string) {
    let destList = []
    perms.map(function (v, k) { destList.push({ key: v, title: v, direction: direction, disabled: false }); })
    return destList
  }

}
