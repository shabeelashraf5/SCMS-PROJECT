import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CanEmployeeLogged } from '../../../../auth/employee/employee-logged.guard';

const routes: Routes = [

  { path: '' , component: CustomerComponent, canActivate: [CanEmployeeLogged] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
