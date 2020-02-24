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

}
