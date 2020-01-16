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
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(value): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const options = { headers };
    return this.http.post(baseUrl + `login`, value, options)
      .pipe(
        map((response: Response) => {
          console.log(response)
          const error = response && response.error;
          const token = response && response.jwt;
          const username = response && response.user && response.user.real_name;
          const position = response && response.user && response.user.position;
          const avatar = response && response.user && response.user.avatar;
          const mobile = response && response.user && response.user.mobile;
          if (!error && token) {
            localStorage.clear();
            localStorage.setItem('currentToken', token);
            if (username) localStorage.setItem('real_name', username);
            if (avatar) localStorage.setItem('avatar', avatar);
            if (position) localStorage.setItem('position', position);
            if (mobile) localStorage.setItem('mobile', mobile);
            return true;
          } else {
            return false;
          }
        }));
  }
}

