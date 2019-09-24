import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {

  avatar: string = null;
  position: string = null;
  username: string = null;

  constructor(public settings: SettingsService, private router: Router, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, ) {
    this.avatar = localStorage.getItem("avatar");
    this.position = localStorage.getItem("position");
    this.username = localStorage.getItem("real_name");
  }

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url!);
  }
}
