import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { getFormatDateStr, getDateByDateStr } from '../../../shared/utils/datehandler';
import { ProjectService } from '../project.service';

@Component({
  templateUrl: './project-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  title: string;
  project: any = {};

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private srv: ProjectService,
  ) { }

  ngOnInit(): void {
    if (this.srv.isUpdate) this.initUpdate();
    this.setTitle();
    this.form = this.fb.group({
      pname: [
        this.project.pname ? this.project.pname : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      date: [this.project.date ? getDateByDateStr(this.project.date) : null, [Validators.required]],
      comments: [this.project.comments ? this.project.comments : null, []],
    });
  }

  submit() {
    if (!this.srv.isUpdate) {
      this.submitting = true;
      const obj = this.formmatFormValue();
      this.srv.add(obj).subscribe(resp => {
        this.submitting = false;
        if (resp.data) this.msg.success(`保存成功！`);
        this.router.navigateByUrl('/project/page');
        this.cdr.detectChanges();
      });
    } else {
      this.submitting = true;
      const obj = this.formmatFormValue();
      this.srv.update(this.project.id, obj).subscribe(resp => {
        if (resp.data) {
          this.submitting = false;
          if (resp.data) this.msg.success(`保存成功！`);
          this.router.navigateByUrl('/project/page');
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
    this.project = this.srv.project;
  }

  formmatFormValue() {
    const obj = this.form.value;
    obj.date = getFormatDateStr(obj.date);
    return { project: obj };
  }

}
