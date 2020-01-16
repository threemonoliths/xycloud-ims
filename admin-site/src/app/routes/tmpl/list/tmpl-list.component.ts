import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';
import { saveAs } from "file-saver";

import { TmplService } from '../tmpl.service';

@Component({
  templateUrl: './tmpl-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TmplListComponent implements OnInit {

  title = '模板管理';
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

  expandForm = false;
  downloadUrl = null;


  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private srv: TmplService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.downloadUrl = this.srv.url + "/attachment/";
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

  add(tpl: TemplateRef<{}>) {
    this.srv.isUpdate = false;
    this.router.navigateByUrl('/tmpl/form');
  }

  modify(id) {
    this.srv.isUpdate = true;
    this.srv.getById(id).subscribe(resp => {
      this.srv.tmpl = resp.data;
      this.router.navigateByUrl('/tmpl/form');
    });
  }

  remove(item) {
    this.modalSrv.create({
      nzTitle: '确认删除',
      nzContent: '确认要删除项目：' + item.name + ' 吗?',
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

  download(i) {
    const url = this.downloadUrl + i.id;
    this.srv.download(url).subscribe(
      data => {
        saveAs(data, i.file_name);
      }
    );
  }


}
