import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdDashboardComponent } from './ad-dashboard.component';
import { CanAdminLogged } from '../../../../auth/admin/admin-logged.guard';

const routes: Routes = [

  {path: '' , component: AdDashboardComponent, canActivate: [CanAdminLogged]  }, 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdDashboardRoutingModule { }
