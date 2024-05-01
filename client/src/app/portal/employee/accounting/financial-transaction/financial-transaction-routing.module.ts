import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialTransactionComponent } from './financial-transaction.component';
import { CanEmployeeLogged } from '../../../../auth/employee/employee-logged.guard';

const routes: Routes = [

  { path: '' , component: FinancialTransactionComponent, canActivate: [CanEmployeeLogged] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialTransactionRoutingModule { }
