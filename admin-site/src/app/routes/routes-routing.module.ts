import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardV1Component } from './dashboard/v1/v1.component';

// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { UserLockComponent } from './passport/lock/lock.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    // canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard/v1', pathMatch: 'full' },
      { path: 'dashboard', redirectTo: 'dashboard/v1', pathMatch: 'full' },
      { path: 'dashboard/v1', component: DashboardV1Component },

      // Exception
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
      // project
      { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
      // contract
      { path: 'contract', loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule) },
      { path: 'purchase_contract', loadChildren: () => import('./purchase_contract/purchase_contract.module').then(m => m.PurchaseContractModule) },
      // user
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
      // user self info
      { path: 'user/info', loadChildren: () => import('./userinfo/user-info.module').then(m => m.UserInfoModule) },
      // user password
      { path: 'user/password', loadChildren: () => import('./userpassword/user-password.module').then(m => m.UserPasswordModule) },
      // tmpl
      { path: 'tmpl', loadChildren: () => import('./tmpl/tmpl.module').then(m => m.TmplModule) },
      // client
      { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
      // supplier
      { path: 'supplier', loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule) },
      // sales_query
      { path: 'sales_query', loadChildren: () => import('./sales_query/sales_query.module').then(m => m.SalesQueryModule) },
      // purchase_query
      { path: 'purchase_query', loadChildren: () => import('./purchase_query/purchase_query.module').then(m => m.PurchaseQueryModule) },
    ],

  },
  // 全屏布局

  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
        data: { title: '登录', titleI18n: 'app.login.login' },
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: { title: '注册', titleI18n: 'app.register.register' },
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: '注册结果', titleI18n: 'app.register.register' },
      },
      {
        path: 'lock',
        component: UserLockComponent,
        data: { title: '锁屏', titleI18n: 'app.lock' },
      },
    ],
  },
  // 单页不包裹Layout

  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
