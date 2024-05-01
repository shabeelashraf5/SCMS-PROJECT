import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login.component';
import { CanActivateLogin } from '../../../../auth/admin/admin-nologged.guard';

const routes: Routes = [

  {path: '' , component: AdminLoginComponent ,  canActivate: [CanActivateLogin]  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLoginRoutingModule { }
