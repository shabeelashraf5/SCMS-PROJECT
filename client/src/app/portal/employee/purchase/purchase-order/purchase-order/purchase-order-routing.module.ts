import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderComponent } from '../purchase-order.component';
import { CanEmployeeLogged } from '../../../../../auth/employee/employee-logged.guard';

const routes: Routes = [

  { path: '' , component: PurchaseOrderComponent, canActivate: [CanEmployeeLogged] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }
