import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';
import { ClientService } from '../client.service';

@Component({
  templateUrl: './client-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent implements OnInit {

  title = '客商管理';
  total = 0;
  q: any = {
    pi: 1,
    ps: 10,
    sort_field: 'name',
    sort_direction: 'desc',
    name: null,
  };

  data: any[] = [];
  loading = false;
  isVisible = false;
  expandForm = false;
  optionList = ['已完成', '进行中'];

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private srv: ClientService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getData();
    console.log(this.data)
  }

  getData() {
    this.loading = true;
    this.srv
      .listOnePage(this.q)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(
        resp => {
          this.data = resp["data"];
          console.log(this.data, resp)
          this.cdr.detectChanges();
        }
      );
  }

  add(tpl: TemplateRef<{}>) {
    this.srv.isUpdate = false;
    this.srv.formOperation = 'create';
    this.router.navigateByUrl('/client/form');
  }

  modify(id) {
    this.srv.isUpdate = true;
    this.srv.formOperation = 'update';
    this.srv.getById(id).subscribe(resp => {
      this.srv.client = resp["data"];
      this.srv.client.client_details = resp["data"].details;
      this.router.navigateByUrl('/client/form');
    });
  }

  remove(item) {
    this.modalSrv.create({
      nzTitle: '确认删除',
      nzContent: '确认要删除客户：' + item.pname + ' 吗?',
      nzOnOk: () => {
        this.loading = true;
        this.srv.delete(item.id).subscribe(
          resp => {
            if (resp["data"]) this.msg.success(`删除成功！`);
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

  showCard() {
    this.data.forEach(i => {
      i.isVisible = false
    })
  }

  showModal(i) {
    i.isVisible = true;
    console.log(i, i.isVisible);
  }

  handleOk(i) {
    i.isVisible = false;
  }
  handleCancel(i) {
    i.isVisible = false;
  }
}
