import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile.component';
import { CanEmployeeLogged } from '../../../../../auth/employee/employee-logged.guard';

const routes: Routes = [

  { path: '' , component: ProfileComponent,  canActivate:  [CanEmployeeLogged] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmProfileRoutingModule { }
