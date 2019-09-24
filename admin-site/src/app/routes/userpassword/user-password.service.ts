import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { baseUrl } from '../../shared/app-config';

@Injectable()
export class UserPasswordService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'user/password';

  modifyPassword(obj) {
    return this.http.put(this.url, obj);
  }

}
