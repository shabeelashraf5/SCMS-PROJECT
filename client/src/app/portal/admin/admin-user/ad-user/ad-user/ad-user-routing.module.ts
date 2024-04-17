import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdUserComponent } from '../ad-user.component';
import { CanAdminLogged } from '../../../../../auth/admin/admin-logged.guard';

const routes: Routes = [

  {path: '' , component: AdUserComponent, canActivate: [CanAdminLogged]   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdUserRoutingModule { }
