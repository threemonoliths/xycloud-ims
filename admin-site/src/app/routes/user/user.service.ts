import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { baseUrl } from '../../shared/app-config';
import { getOptionWithParams, getTokenOptions, getFormData } from '../../shared/utils/formmat';



@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'users';

  user: any = null;
  isUpdate = false;

  listOnePage(q: any) {
    return this.http.get(this.url, getOptionWithParams(q));
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

  getAllPermissions() {
    return this.http.get(this.url + `/permissions/all`, getTokenOptions());
  }
}