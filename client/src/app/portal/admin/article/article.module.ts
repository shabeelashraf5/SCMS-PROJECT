import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ArticleRoutingModule
  ],
  exports: [ArticleComponent], 
})
export class ArticleModule { }
