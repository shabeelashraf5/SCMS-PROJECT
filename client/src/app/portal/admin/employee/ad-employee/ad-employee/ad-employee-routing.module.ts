import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdEmployeeComponent } from '../ad-employee.component';
import { CanAdminLogged } from '../../../../../auth/admin/admin-logged.guard';

const routes: Routes = [

  {path: '' , component: AdEmployeeComponent,  canActivate: [CanAdminLogged]   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdEmployeeRoutingModule { }
