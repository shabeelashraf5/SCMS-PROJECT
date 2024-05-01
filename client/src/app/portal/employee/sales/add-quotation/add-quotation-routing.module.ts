import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuotationComponent } from './add-quotation.component';
import { CanEmployeeLogged } from '../../../../auth/employee/employee-logged.guard';

const routes: Routes = [

  { path: '' , component: AddQuotationComponent, canActivate: [CanEmployeeLogged] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddQuotationRoutingModule { }
