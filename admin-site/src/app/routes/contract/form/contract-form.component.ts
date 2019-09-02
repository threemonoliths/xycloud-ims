import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UploadFile } from 'ng-zorro-antd';
import { getFormatDateStr, getDateByDateStr } from '../../../shared/utils/datehandler';
import { ContractService } from '../contract.service';
import { ProjectService } from '../../project/project.service';

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
  options = [];  //接收select的数组

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private srv: ContractService,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.getProjectData();
    if (this.srv.isUpdate) this.initUpdate();
    this.setTitle();
    this.form = this.fb.group({
      cno: [
        this.contract.cno ? this.contract.cno : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      cname: [
        this.contract.cname ? this.contract.cname : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      project_id: [this.contract.project_id ? this.contract.project_id : null],
      party_a: [
        this.contract.party_a ? this.contract.party_a : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      party_b: [
        this.contract.party_b ? this.contract.party_b : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      sign_date: [this.contract.sign_date ? getDateByDateStr(this.contract.sign_date) : null, [Validators.required]],
      expiry_date: [this.contract.expiry_date ? getDateByDateStr(this.contract.expiry_date) : null, [Validators.required]],
      amount: [this.contract.amount ? this.contract.amount : null, [Validators.required]],
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

  //获取项目类型
  project_data: any[] = [];
  p: any =
    {
      name: "project_name",
    };


  getProjectData() {
    this.projectService.listAll().pipe()
      .subscribe(
        resp => {
          this.project_data = resp['data'];
          this.cdr.detectChanges();
        })
    console.log('项目类型', this.project_data)
  }
}
