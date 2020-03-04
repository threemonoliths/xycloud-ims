import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';
import { ResourceService } from '../resource.service';

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
  };

  data: any[] = [];
  loading = false;
  isVisible = false;
  expandForm = false;

  constructor(
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private srv: ResourceService,
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
      .subscribe(resp => {
        this.data = resp["data"];
        console.log(this.data, resp)
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
