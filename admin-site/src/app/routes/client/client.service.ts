import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { setToken, setTokenAndParams } from '../../shared/utils/formmat';
import { baseUrl } from '../../shared/app-config';
import { formmat } from '../../shared/utils/formmat';


@Injectable()
export class ClientService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'clients';

  client: any = null;
  isUpdate = false;
  formOperation = 'create';

  listOnePage(q: any) {
    return this.http.get(this.url, setTokenAndParams(q));
  }

  listAll() {
    return this.http.get(this.url);
  }

  getById(id) {
    return this.http.get(this.url + `/${id}`, setToken());
  }

  add(obj) {
    console.log("添加")
    return this.http.post(this.url, obj, setToken());
  }

  update(id, obj) {
    return this.http.put(this.url + `/${id}`, obj, setToken());
  }

  delete(id) {
    return this.http.delete(this.url + `/${id}`, setToken());
  }

  getNoData() {
    return this.http.get(baseUrl + `no`, setToken())
  }
}
