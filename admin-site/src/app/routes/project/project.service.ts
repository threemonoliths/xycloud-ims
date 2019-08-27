import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { baseUrl } from '../../shared/app-config';
import { getOptionWithParams, getTokenOptions, getFormData } from '../../shared/utils/formmat';



@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'projects';

  project: any = null;
  isUpdate = false;

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Authorization', 'Basic ' +
      btoa('username:password'));
  }

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
}
