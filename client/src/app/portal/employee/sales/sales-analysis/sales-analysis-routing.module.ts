import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesAnalysisComponent } from './sales-analysis.component';
import { CanEmployeeLogged } from '../../../../auth/employee/employee-logged.guard';

const routes: Routes = [

  { path: '' , component: SalesAnalysisComponent, canActivate: [CanEmployeeLogged] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesAnalysisRoutingModule { }
