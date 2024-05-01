import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceDetailsComponent } from './invoice-details.component';
import { CanEmployeeLogged } from '../../../../auth/employee/employee-logged.guard';

const routes: Routes = [

  { path: '' , component: InvoiceDetailsComponent, canActivate: [CanEmployeeLogged] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceDetailsRoutingModule { }
