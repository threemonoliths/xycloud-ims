import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public aclSrv: ACLService, private menuSrv: MenuService) { }

    canActivate() {
        if (localStorage.getItem('currentToken')) {
            console.log("canActivate")
            return true;
        }
        console.log("can not activate")
        this.router.navigate(['/passport/login']);
        return false;
    }

}