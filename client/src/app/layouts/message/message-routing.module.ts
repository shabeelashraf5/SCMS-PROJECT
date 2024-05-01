import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message.component';
import { CanEmployeeLogged } from '../../auth/employee/employee-logged.guard';

const routes: Routes = [

  { path: '', component: MessageComponent,  canActivate:  [CanEmployeeLogged] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
