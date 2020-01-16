import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

import { ContractService } from '../contract.service';

@Component({
  templateUrl: './contract-list.component.html',
  // styleUrls: ['./contract-list.component.less'],
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
    date1: "",
    date2: "",
    startDate: null,
    endDate: null,
    flag: 0
  };

  data: any[] = [];
  detailData: any[] = [];
  idExpand: any;
  loading = false;

  expandForm = false;
  flag = false;

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
          this.data = resp.data;
          this.cdr.detectChanges();
        }
      );
  }

  // getDetailData(id) {
  //   console.log(this.idExpand + "===" + id);
  //   this.idExpand = id;
  //   this.srv
  //     .getById(id)
  //     .then(result => { this.detailData = result.contract_details })
  // }

  add(tpl: TemplateRef<{}>) {
    // this.srv.isUpdate = false;
    this.srv.formOperation = 'create';
    this.router.navigateByUrl('/contract/form');
  }

  modify(id) {
    // this.srv.isUpdate = true;
    this.srv.formOperation = 'update';
    this.srv.getById(id).subscribe(resp => {
      this.srv.contract = resp.data;
      this.srv.contract.contract_details = resp.data.details;
      console.log(this.srv.contract)
      this.router.navigateByUrl('/contract/form');
    });
  }

  remove(item) {
    this.modalSrv.create({
      nzTitle: '确认删除',
      nzContent: '确认要删除合同：' + item.cname + ' 吗?',
      nzOnOk: () => {
        this.loading = true;
        this.srv.delete(item.id).subscribe(
          resp => {
            if (resp.data) this.msg.success(`删除成功！`);
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

  newArray = (len) => {
    const result = [];
    for (let i = 0; i < len; i++) {
      result.push(i);
    }
    return result;
  };
  _startValueChange = () => {
    if (this.q.startDate > this.q.endDate) {
      this.q.endDate = null;
    }
  };
  _endValueChange = () => {
    if (this.q.startDate > this.q.endDate) {
      this.q.startDate = null;
    }
  };
  _disabledStartDate = (startValue) => {
    if (!startValue || !this.q.endDate) {
      return false;
    }
    return startValue >= this.q.endDate;
  };
  _disabledEndDate = (endValue) => {
    if (!endValue || !this.q.startDate) {
      return false;
    }
    return endValue <= this.q.startDate;
  };
  get _isSameDay() {
    return this.q.startDate && this.q.endDate && moment(this.q.startDate).isSame(this.q.endDate, 'day')
  }

}
