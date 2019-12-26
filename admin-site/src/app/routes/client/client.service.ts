import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { baseUrl } from '../../shared/app-config';
import { formmat } from '../../shared/utils/formmat';


@Injectable()
export class ClientService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'clients';

  client: any = null;
  isUpdate = false;

  listOnePage(q: any) {
    return this.http.get(this.url, { params: formmat(q) });
  }

  listAll() {
    return this.http.get(this.url)
  }

  getById(id) {
    return this.http.get(this.url + `/${id}`);
  }

  add(obj) {
    console.log("添加")
    return this.http.post(this.url, obj);
  }

  update(id, obj) {
    return this.http.put(this.url + `/${id}`, obj);
  }

  delete(id) {
    return this.http.delete(this.url + `/${id}`);
  }
}