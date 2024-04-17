import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotationComponent } from '../quotation.component';
import { CanEmployeeLogged } from '../../../../../auth/employee/employee-logged.guard';

const routes: Routes = [

  { path: '' , component: QuotationComponent, canActivate: [CanEmployeeLogged] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationRoutingModule { }
