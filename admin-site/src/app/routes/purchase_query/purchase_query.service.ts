import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { getFormatDateStr, getDateByDateStr } from '../../shared/utils/datehandler';
import { baseUrl } from '../../shared/app-config';
import { setToken, setTokenAndParams } from '../../shared/utils/formmat';


@Injectable()
export class PurchaseQueryService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'purchase_contracts/payable_yearly';

  purchase_query: any = null;

  formOperation = 'create';
  // isUpdate = false;

  listpayable(q: any) {
    return this.http.get(this.url + `/${q.date}`, setToken());
  }


  getDate(v) {
    v.date = getFormatDateStr(v.date)
  }

  // InitformDate(q) {
  //   const date = new Date();
  //   let year = date.getFullYear();
  //   let month = date.getMonth() + 1;
  //   if (month == 1) {
  //     month = 12;
  //     year = year - 1;
  //   }
  //   else
  //     month = month - 1;
  //   const d = new Date(year, month, 0);
  //   const day = d.getDate();
  //   console.log(d)
  //   if (month < 10) {
  //     q.start_time = year + "-" + "0" + month + "-01";
  //     q.end_time = year + "-" + "0" + month + "-" + day;
  //   }
  //   else {
  //     q.start_time = year + "-" + month + "-01";
  //     q.end_time = year + "-" + month + "-" + day;
  //   }
  //   console.log(q.start_time)
  //   console.log(q.end_time)
  // }

  // formDate(q) {
  //   const year = q.startDate.getFullYear();
  //   const month = q.startDate.getMonth() + 1;

  //   if (month < 10) {
  //     q.start_time = year + "-" + "0" + month + "-1";
  //   }
  //   else
  //     q.start_time = year + "-" + month + "-1";

  //   console.log(q.start_time)
  // }
}
