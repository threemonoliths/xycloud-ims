import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';

import { SupplierService } from '../supplier.service';

@Component({
  templateUrl: './supplier-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierListComponent implements OnInit {
  title = '供应商管理';
  total = 0;
  q: any = {
    pi: 1,
    ps: 10,
    sort_field: 'sname',
    sort_direction: 'desc',
    sname: null,
  };

  datas = [
    {
      sname: 'xycloud',
      comments: '123',
    },
    {
      sname: 'masteel',
      comments: '456',
    },
  ];

  data: any[] = [];
  loading = false;

  expandForm = false;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private srv: SupplierService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getData();
    // console.log(this.datas)
  }

  getData() {
    this.loading = true;
    this.srv
      .listOnePage(this.q)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(resp => {
        this.data = resp["data"];
        this.cdr.detectChanges();
      });
  }

  add(tpl: TemplateRef<{}>) {
    this.srv.isUpdate = false;
    this.router.navigateByUrl('/supplier/form');
  }

  modify(id) {
    this.srv.isUpdate = true;
    this.srv.getById(id).subscribe(resp => {
      this.srv.supplier = resp["data"];
      this.router.navigateByUrl('/supplier/form');
    });
  }

  remove(item) {
    this.modalSrv.create({
      nzTitle: '确认删除',
      nzContent: '确认要删除供应商：' + item.pname + ' 吗?',
      nzOnOk: () => {
        this.loading = true;
        this.srv.delete(item.id).subscribe(resp => {
          if (resp["data"]) this.msg.success(`删除成功！`);
          this.reset();
        });
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
