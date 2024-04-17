import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPoComponent } from '../add-po.component';
import { CanEmployeeLogged } from '../../../../../auth/employee/employee-logged.guard';

const routes: Routes = [

  { path: '' , component: AddPoComponent, canActivate: [CanEmployeeLogged] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPoRoutingModule { }
