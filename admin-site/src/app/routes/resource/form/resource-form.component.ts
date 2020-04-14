import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ResourceService } from '../resource.service';
import { ClientService } from '../../client/client.service';
import { ContractService } from '../../contract/contract.service';
import { MessageRemindingService } from '../../../message-reminding.service';
import { getFormatDateStr, getDateByDateStr } from '../../../shared/utils/datehandler';

@Component({
  templateUrl: './resource-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceFormComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  title: string;
  resource: any = {};

  editIndex = -1;
  editObj = {};
  client_data: any[] = [];
  contract_data: any[] = [];
  alphabet = ["A", "B", "C", "D", "E", "F", "G"];
  openingtype = ["自签", "股份维保", "集团维保", "待签定"];

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private srv: ResourceService,
    private clientService: ClientService,
    private contractService: ContractService,
    private wsSrv: MessageRemindingService,
  ) { }

  //#region get form fields
  get name() {
    return this.form.controls.name;
  }
  get server_name() {
    return this.form.controls.server_name;
  }
  get opening_type() {
    return this.form.controls.opening_type;
  }
  get class() {
    return this.form.controls.class;
  }
  get product_type() {
    return this.form.controls.product_type;
  }
  get cpu() {
    return this.form.controls.cpu;
  }
  get memory() {
    return this.form.controls.memory;
  }
  get storage() {
    return this.form.controls.storage;
  }
  get bandwidth() {
    return this.form.controls.bandwidth;
  }
  get storage_type() {
    return this.form.controls.storage_type;
  }
  get ip() {
    return this.form.controls.ip;
  }
  get client_id() {
    return this.form.controls.client_id;
  }
  get final_client() {
    return this.form.controls.final_client;
  }
  get applicant() {
    return this.form.controls.applicant;
  }
  get application_time() {
    return this.form.controls.application_time;
  }
  get opening_time() {
    return this.form.controls.opening_time;
  }
  get security_service() {
    return this.form.controls.security_service;
  }
  get backup_service() {
    return this.form.controls.backup_service;
  }
  get contract_id() {
    return this.form.controls.contract_id;
  }
  get resource_details() {
    return this.form.controls.resource_details as FormArray;
  }

  ngOnInit(): void {
    this.setTitle();
    this.getContractData();
    this.getClientData();
    const op = this.srv.formOperation;
    if (op == 'update') this.initUpdate();
    this.form = this.fb.group({
      name: [
        this.resource.name ? this.resource.name : null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      server_name: [this.resource.server_name ? this.resource.server_name : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      opening_type: [this.resource.opening_type ? this.resource.opening_type : null, [Validators.required]],
      class: [this.resource.class ? this.resource.class : null, [Validators.required]],
      product_type: [this.resource.product_type ? this.resource.product_type : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      cpu: [this.resource.cpu ? this.resource.cpu : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      memory: [this.resource.memory ? this.resource.memory : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      storage: [this.resource.storage ? this.resource.storage : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      bandwidth: [this.resource.bandwidth ? this.resource.bandwidth : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      storage_type: [this.resource.storage_type ? this.resource.storage_type : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      ip: [this.resource.ip ? this.resource.ip : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      final_client: [this.resource.final_client ? this.resource.final_client : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      applicant: [this.resource.applicant ? this.resource.applicant : null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      application_time: [this.resource.application_time ? getDateByDateStr(this.resource.application_time) : null, [Validators.required]],
      opening_time: [this.resource.opening_time ? getDateByDateStr(this.resource.opening_time) : null, [Validators.required]],
      security_service: [this.resource.security_service ? this.resource.security_service : null, []],
      backup_service: [this.resource.backup_service ? this.resource.backup_service : null, []],
      client_id: [this.resource.client_id ? this.resource.client_id : null, [Validators.required]],
      contract_id: [this.resource.contract_id ? this.resource.contract_id : null, [Validators.required]],

      resource_details: this.fb.array([]),
    });
    if (op == 'update' || (op == 'audit' || op == 'show')) {
      this.resource.resource_details
        ? this.resource.resource_details.forEach(i => {
          const field = this.createDetail();
          field.patchValue(i);
          this.resource_details.push(field);
        })
        : console.log('this resource has no resource_details.');
    }

  }

  // 新增明细
  createDetail(): FormGroup {
    return this.fb.group({
      application_date: [null, [Validators.required]],
      finish_date: [null, [Validators.required]],
      change: [null, [Validators.required]],
      original_configuration: [null,],
      target_configuration: [null,],
      comments: [null,],
    });
  }

  add() {
    console.log(this.resource_details.length);
    this.resource_details.push(this.createDetail());
    this.edit(this.resource_details.length - 1);
  }

  del(index: number) {
    this.resource_details.removeAt(index);
  }

  edit(index: number) {
    if (this.editIndex !== -1 && this.editObj) {
      this.resource_details.at(this.editIndex).patchValue(this.editObj);
    }
    this.editObj = { ...this.resource_details.at(index).value };
    this.editIndex = index;
  }

  save(index: number) {
    this.resource_details.at(index).markAsDirty();
    if (this.resource_details.at(index).invalid) return;
    this.editIndex = -1;
  }

  cancel(index: number) {
    if (!this.resource_details.at(index).value.key) {
      this.del(index);
    } else {
      this.resource_details.at(index).patchValue(this.editObj);
    }
    this.editIndex = -1;
  }

  submit() {
    console.log('表格提交');
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
    }
    if (this.form.invalid) {
      this.msg.info('ya! this.form.invalid!');
      return;
    }
    if (this.form.valid) {
      const op = this.srv.formOperation;
      if (op == 'create') {
        this.submitting = true;
        const obj = this.formmatFormValue();
        this.srv.add(obj).subscribe(resp => {
          this.submitting = false;
          if (resp["data"]) this.msg.success(`保存成功！`);
          this.wsSrv.channel.push('new_msg', {
            body: localStorage.getItem('real_name') + ' 创建了 ' + resp["data"].cname,
          });
          this.router.navigateByUrl('/resource/page');
          this.cdr.detectChanges();
        });
      }
      if (op == 'update') {
        this.submitting = true;
        const obj = this.formmatFormValue();
        this.srv.update(this.resource.id, obj).subscribe(resp => {
          if (resp["data"]) {
            this.submitting = false;
            if (resp["data"]) this.msg.success(`保存成功！`);
            this.router.navigateByUrl('/resource/page');
            this.cdr.detectChanges();
          }
        });
      }
    }
  }
  setTitle() {
    if (this.srv.isUpdate) {
      this.title = '修改资源';
    } else this.title = '创建资源';
  }

  initUpdate() {
    this.setTitle();
    this.resource = this.srv.resource;
  }

  formmatFormValue() {
    const obj = this.form.value;
    obj.application_time = getFormatDateStr(obj.application_time);
    obj.opening_time = getFormatDateStr(obj.opening_time);
    return { resource: obj };
  }

  goBack() {
    this.router.navigateByUrl('/resource/page');
  }

  // 获取客户和合同下拉列表信息
  getClientData() {
    this.clientService
      .listAll()
      .pipe()
      .subscribe(resp => {
        this.client_data = resp["data"];
        this.cdr.detectChanges();
      });
    console.log('项目类型', this.client_data);
  }
  getContractData() {
    this.contractService
      .listAll()
      .pipe()
      .subscribe(resp => {
        this.contract_data = resp["data"];
        this.cdr.detectChanges();
      });
    console.log('项目类型', this.contract_data);
  }

}
