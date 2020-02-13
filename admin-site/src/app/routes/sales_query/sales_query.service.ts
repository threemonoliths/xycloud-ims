import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { getFormatDateStr, getDateByDateStr } from '../../shared/utils/datehandler';
import { baseUrl } from '../../shared/app-config';
import { setToken, setTokenAndParams } from '../../shared/utils/formmat';


@Injectable()
export class SalesQueryService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'contracts/receivable_yearly';

  sales_query: any = null;

  formOperation = 'create';
  // isUpdate = false;

  // listOnePage(q: any) {
  //   return this.http.get(this.url, setTokenAndParams(q));
  // }

  listReceivable(q: any) {
    return this.http.get(this.url, setTokenAndParams(q))
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
  //     q.date = year + "-" + "0" + month + "-01";
  //     q.end_time = year + "-" + "0" + month + "-" + day;
  //   }
  //   else {
  //     q.date = year + "-" + month + "-01";
  //     q.end_time = year + "-" + month + "-" + day;
  //   }
  //   console.log(q.date)
  //   console.log(q.end_time)
  // }

  // formDate(q) {
  //   const year = q.startDate.getFullYear();
  //   const month = q.startDate.getMonth() + 1;

  //   if (month < 10) {
  //     q.date = year + "-" + "0" + month + "-1";
  //   }
  //   else
  //     q.date = year + "-" + month + "-1";

  //   console.log(q.date)
  // }

}
