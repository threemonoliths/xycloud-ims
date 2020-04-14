import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';
import { SalesQueryService } from '../sales_query.service';
import * as moment from 'moment';
import { getFormatDateStr } from '../../../shared/utils/datehandler';

@Component({
  templateUrl: './sales_query-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesQueryListComponent implements OnInit {

  title = '销售合同查询';
  total = 0;
  q: any = {
    pi: 1,
    ps: 10,
    sort_field: 'date',
    sort_direction: 'desc',
    date: null
  };

  data: any = {};
  idExpand: any;
  loading = false;
  flag = false;

  expandForm = false;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private srv: SalesQueryService,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.getData();
  }

  getData() {
    this.loading = true;
    this.srv
      .listReceivable(this.q)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(
        resp => {
          if (resp["error"]) this.msg.error(`无信息`);
          this.data.month = resp["month"];
          this.data.amount = resp["amount"];
          console.log("数据", this.data)
          this.cdr.detectChanges();
        }
      );
  }

  reset() {
    this.q.date = null,
      this.loading = false;
    this.data = {};
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

  search() {
    console.log(this.q.date)
    if (this.q.date == null) {

      this.loading = false
      this.reset();
    }
    else {
      this.q.date = getFormatDateStr(this.q.date);
      console.log(this.q.date)
      this.getData();
    }
  }

  pick(e) {
    this.flag = true;
    console.log("选择日期", this.q.date)
  }
}