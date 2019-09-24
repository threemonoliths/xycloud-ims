import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
  selector: 'header-user',
  template: `
    <div
      class="alain-default__nav-item d-flex align-items-center px-sm"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <nz-avatar [nzSrc]="avatar" nzSize="small" class="mr-sm"></nz-avatar>
      {{ real_name }}
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div nz-menu-item (click)="selfinfo()">
          <i nz-icon nzType="user" class="mr-sm"></i>
          {{ 'menu.account.selfinfo' | translate }}
        </div>
        <div nz-menu-item (click)="password()">
          <i nz-icon nzType="lock" class="mr-sm"></i>
          修改密码
        </div>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ 'menu.account.logout' | translate }}
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {

  real_name: string = null;
  avatar: string = null;

  constructor(
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    this.real_name = localStorage.getItem("real_name");
    this.avatar = this.getUrl();
  }

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url!);
  }

  // modifypwd() {
  //   this.router.navigateByUrl('/user/modifypwd');
  // }

  selfinfo() {
    this.router.navigateByUrl('/user/info');
  }

  password() {
    this.router.navigateByUrl('/user/password');
  }

  getUrl() {
    return localStorage.getItem("avatar");
  }
}
