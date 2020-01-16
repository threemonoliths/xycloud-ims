import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { getFormatDateStr, getDateByDateStr } from '../../shared/utils/datehandler';
import { baseUrl } from '../../shared/app-config';
import { setToken, setTokenAndParams } from '../../shared/utils/formmat';


@Injectable()
export class PurchaseQueryService {
  constructor(private http: HttpClient) { }
  url = baseUrl + 'purchase_query';
  contract_url = baseUrl + 'purchase_contracts';

  purchase_query: any = null;

  formOperation = 'create';
  // isUpdate = false;

  listOnePage(q: any) {
    return this.http.get(this.url, setTokenAndParams(q));
  }

  // 获取合同明细页面
  listContractPage(q: any) {
    return this.http.get(this.contract_url, setTokenAndParams(q));
  }

  getById(id) {
    return this.http.get(this.url + `/${id}`, setToken());
  }

  getDate(v) {
    v.date = getFormatDateStr(v.date)
  }

  // InitformDate(q) {
  //   const date = new Date();
  //   let year = date.getFullYear();
  //   let month = date.getMonth() + 1;
  //   if (month == 1) {
  //     month = 12;
  //     year = year - 1;
  //   }
  //   else
  //     month = month - 1;
  //   const d = new Date(year, month, 0);
  //   const day = d.getDate();
  //   console.log(d)
  //   if (month < 10) {
  //     q.date1 = year + "-" + "0" + month + "-01";
  //     q.date2 = year + "-" + "0" + month + "-" + day;
  //   }
  //   else {
  //     q.date1 = year + "-" + month + "-01";
  //     q.date2 = year + "-" + month + "-" + day;
  //   }
  //   console.log(q.date1)
  //   console.log(q.date2)
  // }

  formDate(q) {
    const year = q.startDate.getFullYear();
    const month = q.startDate.getMonth() + 1;

    if (month < 10) {
      q.date1 = year + "-" + "0" + month + "-1";
      // q.startDate = year + "-" + "0" + month + "-" + day;
    }
    else
      q.date1 = year + "-" + month + "-1";
    // q.startDate = year + "-" + month + "-" + day;

    console.log(q.date1)
  }

}
