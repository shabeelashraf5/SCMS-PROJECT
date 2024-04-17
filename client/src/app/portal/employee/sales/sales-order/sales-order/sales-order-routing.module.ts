import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesOrderComponent } from '../sales-order.component';
import { CanEmployeeLogged } from '../../../../../auth/employee/employee-logged.guard';

const routes: Routes = [

  { path: '' , component: SalesOrderComponent, canActivate: [CanEmployeeLogged] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOrderRoutingModule { }
