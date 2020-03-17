import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';
import { ResourceService } from '../resource.service';
import { ClientService } from '../../client/client.service';
import { ContractService } from '../../contract/contract.service';
import { saveAs } from "file-saver";

@Component({
  templateUrl: './resource-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceListComponent implements OnInit {

  title = '资源管理';
  total = 0;
  q: any = {
    pi: 1,
    ps: 10,
    sort_field: 'name',
    sort_direction: 'desc',
    name: null,
    ip: null,
    client_id: null,
    contract_id: null
  };

  data: any[] = [];
  loading = false;
  isVisible = false;
  expandForm = false;

  client_data: any[] = [];
  contract_data: any[] = [];

  constructor(
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private srv: ResourceService,
    private router: Router,
    private clientService: ClientService,
    private contractService: ContractService,
  ) { }

  ngOnInit() {
    this.getData();
    this.getContractData();
    this.getClientData();
  }

  getData() {
    this.loading = true;
    this.srv
      .listOnePage(this.q)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(resp => {
        this.data = resp["data"];
        console.log("测试", this.data)
        this.cdr.detectChanges();
      });
  }

  add(tpl: TemplateRef<{}>) {
    this.srv.isUpdate = false;
    this.srv.formOperation = 'create';
    this.router.navigateByUrl('/resource/form');
  }

  modify(id) {
    this.srv.isUpdate = true;
    this.srv.formOperation = 'update';
    this.srv.getById(id).subscribe(resp => {
      this.srv.resource = resp["data"];
      this.srv.resource.resource_details = resp["data"].details;
      console.log("更改", this.srv.resource.contract.name)
      this.router.navigateByUrl('/resource/form');
    });
  }

  remove(item) {
    this.modalSrv.create({
      nzTitle: '确认删除',
      nzContent: '确认要删除此条信息：' + item.name + ' 吗?',
      nzOnOk: () => {
        this.loading = true;
        this.srv.delete(item.id).subscribe(resp => {
          if (resp["data"]) this.msg.success(`删除成功！`);
          this.reset();
        });
      },
    });
  }

  search() {
    console.log(this.q)
  }

  reset() {
    setTimeout(() => this.getData());
  }

  pageChange(pi: number) {
    this.q.pi = pi;
    this.reset();
  }

  sort(sort: { key: string; value: string }): void {
    this.q.sort_field = sort.key;
    this.q.sort_direction = sort.value;
    this.reset();
  }

  // 获取客户和合同下拉列表信息
  getClientData() {
    this.clientService
      .listAll()
      .pipe()
      .subscribe(resp => {
        this.client_data = resp["data"];
        // console.log('顾客类型', this.client_data);
        this.cdr.detectChanges();
      });
  }
  getContractData() {
    this.contractService
      .listAll()
      .pipe()
      .subscribe(resp => {
        this.contract_data = resp["data"];
        // console.log('项目类型', this.contract_data);
        this.cdr.detectChanges();
      });
  }

  // 导出excel
  excelout() {
    this.srv.export_excel(this.q)
      .subscribe(
        resp => {
          this.cdr.detectChanges();
          saveAs(resp, "资源台帐.xlsx");
          console.log("导出", resp)
        }
      );
    console.log("导出")
  }

}
