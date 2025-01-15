import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article.component';
import { CanAdminLogged } from '../../../auth/admin/admin-logged.guard';

const routes: Routes = [{ path: '', component: ArticleComponent, canActivate: [CanAdminLogged] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
