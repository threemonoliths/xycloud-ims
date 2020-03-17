import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { setToken, setTokenAndParams, formmat } from '../../shared/utils/formmat';
import { baseUrl } from '../../shared/app-config';


@Injectable()
export class ResourceService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'resources';
  excel_url = baseUrl + 'resources/export';

  resource: any = null;
  resource_details: any = null;
  isUpdate = false;
  formOperation = 'create';

  listOnePage(q: any) {
    return this.http.get(this.url, setTokenAndParams(q));
  }

  listAll() {
    return this.http.get(this.url)
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

  export_excel(q: any) {
    console.log("导出")
    return this.http.get(this.excel_url, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json"),
      params: formmat(q)
    });
  }
}
