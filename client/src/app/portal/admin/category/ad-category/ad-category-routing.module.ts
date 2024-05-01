import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdCategoryComponent } from './ad-category.component';
import { CanAdminLogged } from '../../../../auth/admin/admin-logged.guard';

const routes: Routes = [

  {path: '' , component: AdCategoryComponent,  canActivate: [CanAdminLogged]  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdCategoryRoutingModule { }
