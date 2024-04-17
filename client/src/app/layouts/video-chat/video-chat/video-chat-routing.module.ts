import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoChatComponent } from '../video-chat.component';
import { CanEmployeeLogged } from '../../../auth/employee/employee-logged.guard';

const routes: Routes = [

  { path: '' , component: VideoChatComponent,  canActivate:  [CanEmployeeLogged] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoChatRoutingModule { }
