import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdProductComponent } from '../ad-product.component';
import { CanAdminLogged } from '../../../../../auth/admin/admin-logged.guard';

const routes: Routes = [

  {path: '' , component: AdProductComponent, canActivate: [CanAdminLogged]    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdProductRoutingModule { }
