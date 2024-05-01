import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmDashboardComponent } from './em-dashboard.component';
import { CanEmployeeLogged } from '../../../../auth/employee/employee-logged.guard';

const routes: Routes = [

  { path: '' , component: EmDashboardComponent,  canActivate: [CanEmployeeLogged] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmDashboardRoutingModule { }
