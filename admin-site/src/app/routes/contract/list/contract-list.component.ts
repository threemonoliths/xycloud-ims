import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';

import { ContractService } from '../contract.service';

@Component({
  templateUrl: './contract-list.component.html',
  //styleUrls: ['./contract-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ContractListComponent implements OnInit {
  title = '合同管理';
  total = 0;
  q: any = {
    pi: 1,
    ps: 10,
    sort_field: 'sign_date',
    sort_direction: 'desc',
    cname: null,
  };

  data: any[] = [];
  loading = false;

  expandForm = false;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private srv: ContractService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.srv
      .listOnePage(this.q)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(
        resp => {
          this.data = resp['data'];
          this.cdr.detectChanges();
        }
      );
    console.log(this.data)
  }

  add(tpl: TemplateRef<{}>) {
    this.srv.isUpdate = false;
    this.router.navigateByUrl('/contract/form');
  }

  modify(id) {
    this.srv.isUpdate = true;
    this.srv.getById(id).subscribe(resp => {
      this.srv.contract = resp['data'];
      this.router.navigateByUrl('/contract/form');
    });
  }

  remove(item) {
    this.modalSrv.create({
      nzTitle: '确认删除',
      nzContent: '确认要删除项目：' + item.cname + ' 吗?',
      nzOnOk: () => {
        this.loading = true;
        this.srv.delete(item.id).subscribe(
          resp => {
            if (resp['data']) this.msg.success(`删除成功！`);
            this.reset();
          }
        );
      },
    });
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
}
