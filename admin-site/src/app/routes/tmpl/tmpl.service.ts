import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { baseUrl } from '../../shared/app-config';
import { getFormData, formmat } from '../../shared/utils/formmat';


@Injectable()
export class TmplService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'tmpls';

  tmpl: any = null;
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
    return this.http.post(this.url, getFormData(obj));
  }

  update(id, obj) {
    return this.http.put(this.url + `/${id}`, getFormData(obj));
  }

  delete(id) {
    return this.http.delete(this.url + `/${id}`);
  }

  download(url) {
    return this.http.get(url, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }

}
