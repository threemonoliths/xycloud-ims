import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { getFormatDateStr, getDateByDateStr } from '../../shared/utils/datehandler';
import { baseUrl } from '../../shared/app-config';
import { setToken, setTokenAndParams, formmat } from '../../shared/utils/formmat';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Injectable()
export class ContractService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'contracts';
  project_url = baseUrl + 'projects';
  detail_url = baseUrl + 'contract_details';
  excel_url = baseUrl + 'contracts/export';

  contract: any = null;
  formOperation = 'create';
  // isUpdate = false;

  listOnePage(q: any) {
    return this.http.get(this.url, setTokenAndParams(q));
  }

  listAll() {
    return this.http.get(this.url)
  }

  // 获取合同明细页面
  listDetailPage(q: any) {
    return this.http.get(this.detail_url, setTokenAndParams(q));
  }

  getById(id) {
    return this.http.get(this.url + `/${id}`, setToken());
  }

  add(obj) {
    return this.http.post(this.url, obj, setToken());
  }

  update(id, obj) {
    return this.http.put(this.url + `/${id}`, obj, setToken());
  }

  delete(id) {
    return this.http.delete(this.url + `/${id}`, setToken());
  }

  getDate(v) {
    v.date = getFormatDateStr(v.date)
  }

  export_excel(q: any) {
    console.log("导出")
    return this.http.get(this.excel_url, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json"),
      params: formmat(q)
    });
  }



  formDate(q) {
    const year = q.startDate.getFullYear();
    const month = q.startDate.getMonth() + 1;
    const day = (q.startDate.getDate()) < 10 ? '0' + (q.startDate.getDate()) : (q.startDate.getDate());

    const year2 = q.endDate.getFullYear();
    const month2 = q.endDate.getMonth() + 1;
    const day2 = (q.endDate.getDate()) < 10 ? '0' + (q.endDate.getDate()) : (q.endDate.getDate());

    if (month < 10) {
      q.start_time = year + "-" + "0" + month + "-" + day;
    }
    else
      q.start_time = year + "-" + month + "-" + day;

    if (month2 < 10) {
      q.end_time = year2 + "-" + "0" + month2 + "-" + day2;
    }
    else
      q.end_time = year2 + "-" + month2 + "-" + day2;

    console.log(q.start_time, q.end_time)
  }
}
