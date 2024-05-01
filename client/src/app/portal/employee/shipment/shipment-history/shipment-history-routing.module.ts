import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentHistoryComponent } from './shipment-history.component';
import { CanEmployeeLogged } from '../../../../auth/employee/employee-logged.guard';

const routes: Routes = [

  { path: '' , component: ShipmentHistoryComponent, canActivate: [CanEmployeeLogged] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentHistoryRoutingModule { }
