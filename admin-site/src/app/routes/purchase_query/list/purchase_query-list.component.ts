import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';
import { PurchaseQueryService } from '../purchase_query.service';
import * as moment from 'moment';

@Component({
  templateUrl: './purchase_query-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseQueryListComponent implements OnInit {

  title = '采购合同查询';
  total = 0;
  q: any = {
    pi: 1,
    ps: 10,
    sort_field: 'date',
    sort_direction: 'desc',
    date1: null,
    startDate: null,
    flag: 0
  };

  data: any[] = [];
  idExpand: any;
  loading = false;

  expandForm = false;
  flag = false;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private srv: PurchaseQueryService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    // this.loading = true;
    // this.srv
    //   .listOnePage(this.q)
    //   .pipe(tap(() => (this.loading = false)))
    //   .subscribe(
    //     resp => {
    //       this.data = resp['data'];
    //       this.cdr.detectChanges();
    //     }
    //   );
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

  search() {
    this.q.pi = 1;
    if (this.q.startDate == null) {
      this.flag = true;
    }
    else {
      this.flag = false;
      this.srv.formDate(this.q);
      this.getData()
    }
  }

  // newArray = (len) => {
  //   const result = [];
  //   for (let i = 0; i < len; i++) {
  //     result.push(i);
  //   }
  //   return result;
  // };
  // _startValueChange = () => {
  //   if (this.q.startDate > this.q.endDate) {
  //     this.q.endDate = null;
  //   }
  // };
  // _endValueChange = () => {
  //   if (this.q.startDate > this.q.endDate) {
  //     this.q.startDate = null;
  //   }
  // };
  // _disabledStartDate = (startValue) => {
  //   if (!startValue || !this.q.endDate) {
  //     return false;
  //   }
  //   return startValue >= this.q.endDate;
  // };
  // _disabledEndDate = (endValue) => {
  //   if (!endValue || !this.q.startDate) {
  //     return false;
  //   }
  //   return endValue <= this.q.startDate;
  // };
  // get _isSameDay() {
  //   return this.q.startDate && this.q.endDate && moment(this.q.startDate).isSame(this.q.endDate, 'day')
  // }
}
