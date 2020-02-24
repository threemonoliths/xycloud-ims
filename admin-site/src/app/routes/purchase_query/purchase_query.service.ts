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

}
