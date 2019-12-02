import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { baseUrl } from '../../shared/app-config';
import { setToken, setTokenAndParams } from '../../shared/utils/formmat';


@Injectable()
export class PurchaseContractService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'purchase_contracts';
  project_url = baseUrl + 'projects';
  detail_url = baseUrl + 'purchase_contract_details';

  purchase_contract: any = null;
  //isUpdate = false;

  listOnePage(q: any) {
    return this.http.get(this.url, setTokenAndParams(q));
  }

  //获取合同明细页面
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

  formOperation = 'create';
}
