import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { baseUrl } from '../../shared/app-config';
import { getFormData, formmat } from '../../shared/utils/formmat';


@Injectable()
export class UserInfoService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'user/info';

  user: any = null;
  isUpdate = false;

  getUser() {
    return this.http.get(this.url);
  }

  update(id, obj) {
    return this.http.put(this.url, getFormData(obj));
  }

}
