import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';
import { UploadFile } from 'ng-zorro-antd';
import * as moment from 'moment';
import { saveAs } from "file-saver";
import { PurchaseContractService } from '../purchase_contract.service';
import { ProjectService } from '../../project/project.service';

@Component({
  templateUrl: './purchase_contract-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PurchaseContractListComponent implements OnInit {
  title = '合同管理';
  total = 0;
  q: any = {
    pi: 1,
    ps: 10,
    sort_field: 'sign_date',
    sort_direction: 'desc',
    cname: null,
    start_time: "",
    end_time: "",
    startDate: null,
    endDate: null,
    flag: 0,
    status: "",
    project_id: null
  };

  data: any[] = [];
  detailData: any[] = [];
  project_data: any[] = [];
  idExpand: any;
  loading = false;

  expandForm = false;
  flag = false;
  uploading = false;
  fileList: UploadFile[] = [];
  optionList = [
    { lable: '进行中', value: 0 },
    { lable: '已完成', value: 1 },
    { lable: '已终止', value: 2 }
  ];
  isVisible = false;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private srv: PurchaseContractService,
    private projectService: ProjectService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getData();
    this.getProjectData()
  }

  getData() {
    this.loading = true;
    this.srv
      .listOnePage(this.q)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(
        resp => {
          this.data = resp["data"];
          this.excuted_cal()
          this.cdr.detectChanges();
        }
      );
  }

  // 获取项目信息
  getProjectData() {
    this.projectService
      .listAll()
      .pipe()
      .subscribe(resp => {
        this.project_data = resp["data"];
        this.cdr.detectChanges();
      });
  }

  add(tpl: TemplateRef<{}>) {
    // this.srv.isUpdate = false;
    this.srv.formOperation = 'create';
    this.router.navigateByUrl('/purchase_contract/form');
  }

  modify(id) {
    // this.srv.isUpdate = true;
    this.srv.formOperation = 'update';
    this.srv.getById(id).subscribe(resp => {
      this.srv.purchase_contract = resp["data"];
      this.srv.purchase_contract.purchase_contract_details = resp["data"].details;
      console.log(this.srv.purchase_contract)
      this.router.navigateByUrl('/purchase_contract/form');
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
            if (resp["data"]) this.msg.success(`删除成功！`);
            this.reset();
          }
        );
      },
    });
  }

  reset() {
    this.q.startDate = null;
    this.q.endDate = null;
    this.q.start_time = "";
    this.q.end_time = "";
    this.fileList = [];
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

  //已执行金额
  excuted_cal() {
    this.data.forEach(i => {
      var excuted = 0;
      var next_amount = 0;
      var next_date = "暂无记录";
      // var status = "进行中";
      for (let j = 0; j < i.details.length; j++) {
        excuted += parseFloat(i.details[j].actual_payment)
        if (!i.details[j].actual_payment && !next_amount) {
          next_amount = i.details[j].invoice_amount;
          next_date = i.details[j].invoice_date;
        }
      }
      // if (excuted >= i.amount) {
      //   status = "已完成"
      // }
      i.excuted = excuted;
      i.next_amount = next_amount;
      i.next_date = next_date;
      // i.status = status;
      console.log(excuted, next_amount, next_date)
    })
  }

  // 导入
  beforeUpload = (file: UploadFile): boolean => {
    console.log("文件名", file);
    this.fileList = [file];
    return false;
  };
  formmatFormValue() {
    const obj: any = {};
    if ((this.fileList) && (this.fileList.length > 0))
      obj.attachment = this.fileList[0]
    console.log(obj);
    return obj;
  }
  excelin() {
    const obj = this.formmatFormValue()
    this.srv.import_excel(obj).subscribe(resp => {
      if (resp["error"]) this.msg.error(`导入失败请上传xlsx文件！`);
      this.cdr.detectChanges();
      this.getData()
      this.fileList = [];
    });
  }
  // 导出excel
  excelout() {
    this.q.startDate = null,
      this.q.endDate = null,
      this.q.start_time = "",
      this.q.end_time = "",
      this.srv.export_excel(this.q)
        .subscribe(
          resp => {
            this.cdr.detectChanges();
            saveAs(resp, "采购合同.xlsx");
          }
        );
    console.log("导出")
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
