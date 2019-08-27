import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';

import { baseUrl } from '../../../shared/app-config';

// export function getTokenOptions() {
//   let headers = new HttpHeaders();
//   let jwt = 'Bearer ' + localStorage.getItem('currentToken');
//   headers.append('Authorization', jwt);
//   headers.append('Content-Type', 'application/json');
//   let options = { headers: headers };
//   return options;
// }

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: HttpClient, public aclSrv: ACLService, private menuSrv: MenuService) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(value): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers };
    return this.http.post(baseUrl + `login`, value, options)
      .pipe(
        map((response: Response) => {
          console.log(response)
          let error = response && response['error'];
          let token = response && response['jwt'];
          let username = response && response['user'] && response['user']['real_name'];
          if (!error && token && username) {
            localStorage.clear();
            localStorage.setItem('currentToken', token);
            localStorage.setItem('username', username);
            return true;
          } else {
            return false;
          }
        }));
  }
}

