import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPortalComponent } from '../admin-portal.component';
import { CanAdminLogged } from '../../../../auth/admin/admin-logged.guard';

const routes: Routes = [

  {path: '' , component: AdminPortalComponent, canActivate: [CanAdminLogged] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPortalRoutingModule { }
