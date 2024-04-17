import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLoginComponent } from '../employee-login.component';
import { CanActivateEmLogin } from '../../../../../auth/employee/employee-nologged.guard';

const routes: Routes = [

  {path: '' , component: EmployeeLoginComponent,  canActivate: [CanActivateEmLogin]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeLoginRoutingModule { }
