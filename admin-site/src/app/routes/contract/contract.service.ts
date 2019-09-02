import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { baseUrl } from '../../shared/app-config';
import { getOptionWithParams, getTokenOptions, getFormData } from '../../shared/utils/formmat';


@Injectable()
export class ContractService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'contracts';
  project_url = baseUrl + 'projects';
  detail_url = baseUrl + 'contract_details';

  contract: any = null;
  //isUpdate = false;

  listOnePage(q: any) {
    return this.http.get(this.url, getOptionWithParams(q));
  }

  //获取合同明细页面
  listDetailPage(q: any) {
    return this.http.get(this.detail_url, getOptionWithParams(q));
  }

  getById(id) {
    return this.http.get(this.url + `/${id}`, getTokenOptions());
  }

  add(obj) {
    return this.http.post(this.url, obj, getTokenOptions());
  }

  update(id, obj) {
    return this.http.put(this.url + `/${id}`, obj, getTokenOptions());
  }

  delete(id) {
    return this.http.delete(this.url + `/${id}`, getTokenOptions());
  }

  formOperation = 'create';
}
