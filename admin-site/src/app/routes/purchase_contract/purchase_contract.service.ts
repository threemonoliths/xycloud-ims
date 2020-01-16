import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { getFormatDateStr, getDateByDateStr } from '../../shared/utils/datehandler';
import { baseUrl } from '../../shared/app-config';
import { setToken, setTokenAndParams } from '../../shared/utils/formmat';


@Injectable()
export class PurchaseContractService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'purchase_contracts';
  project_url = baseUrl + 'projects';
  detail_url = baseUrl + 'purchase_contract_details';

  purchase_contract: any = null;

  formOperation = 'create';
  // isUpdate = false;

  listOnePage(q: any) {
    return this.http.get(this.url, setTokenAndParams(q));
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

  InitformDate(q) {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month == 1) {
      month = 12;
      year = year - 1;
    }
    else
      month = month - 1;
    const d = new Date(year, month, 0);
    const day = d.getDate();
    console.log(d)
    if (month < 10) {
      q.date1 = year + "-" + "0" + month + "-01";
      q.date2 = year + "-" + "0" + month + "-" + day;
    }
    else {
      q.date1 = year + "-" + month + "-01";
      q.date2 = year + "-" + month + "-" + day;
    }
    console.log(q.date1)
    console.log(q.date2)
  }

  formDate(q) {
    const year = q.startDate.getFullYear();
    const month = q.startDate.getMonth() + 1;
    const day = (q.startDate.getDate()) < 10 ? '0' + (q.startDate.getDate()) : (q.startDate.getDate());

    const year2 = q.endDate.getFullYear();
    const month2 = q.endDate.getMonth() + 1;
    const day2 = (q.endDate.getDate()) < 10 ? '0' + (q.endDate.getDate()) : (q.endDate.getDate());

    if (month < 10) {
      q.date1 = year + "-" + "0" + month + "-" + day;
      // q.startDate = year + "-" + "0" + month + "-" + day;
    }
    else
      q.date1 = year + "-" + month + "-" + day;
    // q.startDate = year + "-" + month + "-" + day;

    if (month2 < 10) {
      q.date2 = year2 + "-" + "0" + month2 + "-" + day2;
      // q.endDate = year2 + "-" + "0" + month2 + "-" + day2;
    }
    else
      q.date2 = year2 + "-" + month2 + "-" + day2;
    // q.endDate = year2 + "-" + month2 + "-" + day2;

    console.log(q.date1, q.date2)
  }

}
